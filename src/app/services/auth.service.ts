import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../data-sources/supabase.client';
import { User, AuthError, AuthResponse, Provider } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

interface UserProfile {
  id: string;
  membership: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  private _profile = signal<UserProfile | null>(null);
  private _loading = signal<boolean>(false);

  // Public readonly signals
  user = this._user.asReadonly();
  profile = this._profile.asReadonly();
  loading = this._loading.asReadonly();

  // Emits true when user state is resolved
  userResolved$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.initAuth();
  }

  private async initAuth() {
    console.log('🚀 AuthService: Initializing authentication...')
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('📋 AuthService: Initial session:', session)
      console.log('👤 AuthService: Initial user:', session?.user)

      this._user.set(session?.user ?? null);
      console.log('✅ AuthService: User signal set to:', this._user())

      if (session?.user) {
        await this.loadUserProfile(session.user.id);
      }
      this.userResolved$.next(true); // <-- Mark as resolved after initial load

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔄 AuthService: Auth state change detected!')
        console.log('📝 AuthService: Event:', event)
        console.log('👤 AuthService: New session user:', session?.user)

        this._user.set(session?.user ?? null);
        console.log('✅ AuthService: User signal updated to:', this._user())

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🎉 AuthService: User signed in, loading profile...')
          await this.upsertProfileFromOAuth(session.user);
          await this.loadUserProfile(session.user.id);
          this.router.navigate(['/']);
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 AuthService: User signed out, clearing profile...')
          this._profile.set(null);
          this.router.navigate(['/auth/signin']);
        }
        this.userResolved$.next(true); // <-- Mark as resolved after state change
      });
    } catch (e) {
      this.userResolved$.next(true); // <-- Mark as resolved even on error
    }
  }

  private async loadUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      this._profile.set(data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  // Helper methods for membership checks
  hasPremiumAccess(): boolean {
    const membership = this._profile()?.membership;
    return membership === 'premium' || membership === 'standard';
  }

  hasStandardAccess(): boolean {
    const membership = this._profile()?.membership;
    return membership === 'standard' || membership === 'premium';
  }

  hasFreeMembership(): boolean {
    const membership = this._profile()?.membership;
    return membership === 'free' || !membership;
  }

  getMembershipLevel(): string {
    return this._profile()?.membership || 'free';
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      this._loading.set(true);

      const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await this.loadUserProfile(data.user.id);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      this._loading.set(false);
    }
  }

  async signUp(email: string, password: string, displayName?: string): Promise<{ success: boolean; error?: string }> {
    try {
      this._loading.set(true);

      // Prepare signup data with user metadata
      const signUpData: any = {
        email,
        password,
      };

      // Add display name to user metadata if provided
      if (displayName) {
        signUpData.options = {
          data: {
            display_name: displayName,
            full_name: displayName
          }
        };
      }

      const { data, error }: AuthResponse = await supabase.auth.signUp(signUpData);

      if (error) {
        return { success: false, error: error.message };
      }

      // Save user to profiles table if user exists
      if (data.user) {
        const profileData: any = {
          id: data.user.id,
          email: data.user.email
        };

        // Add display_name if provided
        if (displayName) {
          profileData.display_name = displayName;
        }

        const { error: upsertError } = await supabase.from('profiles').upsert(profileData);
        if (upsertError) {
          return { success: false, error: upsertError.message };
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      this._loading.set(false);
    }
  }

  async signInWithOAuth(options: { provider: Provider; options?: any }): Promise<{ error?: any }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth(options);
      // After redirect, onAuthStateChange will fire and we can update the profile there
      return { error };
    } catch (error) {
      return { error };
    }
  }

  // Call this after OAuth sign-in to upsert display name from provider metadata
  async upsertProfileFromOAuth(user: User) {
    const displayName = user.user_metadata?.['full_name'] || user.user_metadata?.['name'] || user.email;
    // Fetch current profile
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', user.id)
      .single();
    // Only update if displayName is non-empty and different from current
    if (displayName && (!existingProfile || existingProfile.display_name !== displayName)) {
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        display_name: displayName,
      });
    }
  }

  async signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        // Handle specific OAuth provider errors
        if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
          return { success: false, error: 'Google sign-in is not available at the moment. Please use email/password authentication.' };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Google sign-in is currently unavailable. Please try email/password authentication.' };
    }
  }

  async signInWithFacebook(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred during Facebook sign-in.' };
    }
  }

  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  isAuthenticated(): boolean {
    return this._user() !== null;
  }
}
