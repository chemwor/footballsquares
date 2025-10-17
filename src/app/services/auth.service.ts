import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../data-sources/supabase.client';
import { User, AuthError, AuthResponse, Provider } from '@supabase/supabase-js';

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

  constructor(private router: Router) {
    this.initAuth();
  }

  private async initAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      this._user.set(session?.user ?? null);

      if (session?.user) {
        await this.loadUserProfile(session.user.id);
      }

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        this._user.set(session?.user ?? null);

        if (event === 'SIGNED_IN' && session?.user) {
          await this.loadUserProfile(session.user.id);
          this.router.navigate(['/']);
        } else if (event === 'SIGNED_OUT') {
          this._profile.set(null);
          this.router.navigate(['/auth/signin']);
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
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

  async signUp(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      this._loading.set(true);

      const { data, error }: AuthResponse = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
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
      return { error };
    } catch (error) {
      return { error };
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
