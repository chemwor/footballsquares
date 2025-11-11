import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from '../../data-sources/supabase.client';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'sq-request-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Main Request Modal -->
    <div *ngIf="open && !showSignupPrompt && !showInviteConfirmation" class="modal-backdrop debug-modal" (click)="onBackdrop($event)" tabindex="-1">
      <div class="modal" role="dialog" aria-modal="true" (keydown.escape)="close()"
        (click)="$event.stopPropagation()">
        <h2>
          Request Square
          <span *ngIf="shouldShowCoordinates()"> [{{row}},{{col}}]</span>
        </h2>
        <form (submit)="submit($event)" #form="ngForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="name"
              required
              #nameInput="ngModel"
              #nameField
              placeholder="Your name"
            />
            <div class="error" *ngIf="nameInput.invalid && nameInput.touched">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              #emailInput="ngModel"
              placeholder="your@email.com"
            />
            <div class="error" *ngIf="emailInput.invalid && emailInput.touched">
              Valid email is required
            </div>
          </div>

          <!-- Friend's email for growth mode -->
          <div class="form-group" *ngIf="isGrowthMode()">
            <label for="friendEmail">Friend's Email</label>
            <input
              type="email"
              id="friendEmail"
              name="friendEmail"
              [(ngModel)]="friendEmail"
              email
              #friendEmailInput="ngModel"
              placeholder="friend@example.com"
            />
            <div class="hint">When your friend signs up using this invite, you'll be automatically approved for this square.</div>
            <div class="error" *ngIf="friendEmailInput.invalid && friendEmailInput.touched">
              Must be a valid email if provided
            </div>
          </div>

          <!-- Validation error message -->
          <div class="validation-error" *ngIf="validationError">
            {{ validationError }}
          </div>

          <div class="actions">
            <button type="button" (click)="close()">Cancel</button>
            <button
              type="submit"
              [disabled]="form.invalid || isValidating"
              class="primary"
            >
              <span *ngIf="isValidating">Validating...</span>
              <span *ngIf="!isValidating">Request Square</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Growth Mode Signup Prompt - Requires Account -->
    <div *ngIf="showSignupPrompt && isGrowthMode()" class="modal-backdrop debug-modal" (click)="onSignupBackdrop($event)" tabindex="-1">
      <div class="modal signup-modal" role="dialog" aria-modal="true" (keydown.escape)="declineSignup()"
        (click)="$event.stopPropagation()">
        <h2>🎯 Invite Play - Account Required</h2>
        <div class="signup-content">
          <p>Invite Play squares require an account to claim. Please sign in or create a free account to continue.</p>

          <div class="benefits">
            <h3>Invite Play benefits:</h3>
            <ul>
              <li>✓ Earn rewards when friends join</li>
              <li>✓ Track your referral progress</li>
              <li>✓ Manage all your squares</li>
              <li>✓ Get notified of game updates</li>
            </ul>
          </div>

          <div class="signup-note">
            <small>Signing up is free — you'll be returned to claim your square after authentication.</small>
          </div>
        </div>

        <div class="actions signup-actions">
          <button type="button" (click)="goToSignIn()" class="secondary">
            Sign In
          </button>
          <button type="button" (click)="goToSignUp()" class="primary">
            Sign Up
          </button>
        </div>
      </div>
    </div>

    <!-- Regular Mode Signup Prompt - Square Claimed, Account Suggested -->
    <div *ngIf="showSignupPrompt && !isGrowthMode()" class="modal-backdrop debug-modal" (click)="onSignupBackdrop($event)" tabindex="-1">
      <div class="modal signup-modal" role="dialog" aria-modal="true" (keydown.escape)="declineSignup()"
        (click)="$event.stopPropagation()">
        <h2>🎉 Square Claimed Successfully!</h2>
        <div class="signup-content">
          <p>Your square has been claimed! Would you like to create a free account to unlock additional features?</p>

          <div class="benefits">
            <h3>With a free account, you can:</h3>
            <ul>
              <li>✓ Track all your squares across games</li>
              <li>✓ Get notifications about game updates</li>
              <li>✓ Access your game history</li>
              <li>✓ Priority access to new games</li>
            </ul>
          </div>

          <div class="signup-note">
            <small>Creating an account is completely free and optional. You can continue playing without one!</small>
          </div>
        </div>

        <div class="actions signup-actions">
          <button type="button" (click)="declineSignup()" class="secondary">
            No Thanks, Continue
          </button>
          <button type="button" (click)="goToSignUp()" class="primary">
            Create Account
          </button>
        </div>
      </div>
    </div>

    <!-- Invite Confirmation Modal - Shown when user has a pending invite for this game -->
    <div *ngIf="showInviteConfirmation" class="modal-backdrop debug-modal" (click)="onInviteBackdrop($event)" tabindex="-1">
      <div class="modal invite-modal" role="dialog" aria-modal="true" (keydown.escape)="closeInviteConfirmation()"
        (click)="$event.stopPropagation()">
        <h2>🎉 You've Been Invited!</h2>
        <div class="invite-content">
          <p>{{ pendingInvite?.inviter_name }} invited you to join this game!</p>
          <p>Your square at position [{{ pendingInvite?.row_idx }}, {{ pendingInvite?.col_idx }}] is ready to be claimed.</p>

          <div class="confirmation-message" *ngIf="confirmationMessage">
            {{ confirmationMessage }}
          </div>

          <div class="actions invite-actions">
            <button type="button" (click)="closeInviteConfirmation()" class="secondary">
              Maybe Later
            </button>
            <button
              type="button"
              (click)="acceptInviteSquare()"
              [disabled]="isProcessingInvite"
              class="primary"
            >
              <span *ngIf="isProcessingInvite">Accepting...</span>
              <span *ngIf="!isProcessingInvite">Accept Square</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral Call-to-Action - Shown after a square is claimed, inviting users to refer friends -->
    <div *ngIf="showReferralCTA" class="modal-backdrop debug-modal" (click)="onReferralBackdrop($event)" tabindex="-1">
      <div class="modal referral-modal" role="dialog" aria-modal="true" (keydown.escape)="closeReferralCTA()"
        (click)="$event.stopPropagation()">
        <h2>🚀 Refer & Earn!</h2>
        <div class="referral-content">
          <p>Refer friends to join the game and earn rewards! Enter your friend's details below:</p>


          <div class="form-group">
            <label for="referralEmail">Friend's Email</label>
            <input
              type="email"
              id="referralEmail"
              name="referralEmail"
              [(ngModel)]="referralFriendEmail"
              email
              placeholder="friend@example.com"
            />
          </div>

          <div class="error" *ngIf="!isValidEmail(referralFriendEmail) && referralFriendEmail">
            Must be a valid email address
          </div>

          <div class="actions referral-actions">
            <button type="button" (click)="closeReferralCTA()" class="secondary">
              Maybe Later
            </button>
            <button
              type="button"
              (click)="sendReferral()"
              [disabled]="!isValidEmail(referralFriendEmail) || isProcessingReferral"
              class="primary"
            >
              <span *ngIf="isProcessingReferral">Sending...</span>
              <span *ngIf="!isProcessingReferral">Send Referral</span>
            </button>
          </div>

          <div class="referral-message" *ngIf="referralMessage">
            {{ referralMessage }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      display: flex !important;
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.8);
      align-items: center;
      justify-content: center;
      z-index: 99999;
    }
    .modal {
      display: block !important;
      background: #2a2d30;
      color: #fff;
      border-radius: 12px;
      padding: 2rem;
      min-width: 320px;
      box-shadow: 0 2px 16px #0008;
      z-index: 100000;
    }
    /* Make signup modal lighter so text is readable and buttons stand out */
    .signup-modal {
      max-width: 520px;
      background: #fff;
      color: #111;
    }
    h2 {
      margin: 0 0 1.5rem;
      font-size: 1.4rem;
      color: #f7c873;
    }
    .signup-content {
      margin-bottom: 1.25rem;
    }
    .signup-content p {
      margin-bottom: 1rem;
      color: #333;
      font-size: 1.05rem;
    }
    .benefits {
      background: #f4f4f6;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 0.75rem;
    }
    .benefits h3 {
      margin: 0 0 0.75rem;
      color: #f7c873;
      font-size: 1rem;
    }
    .benefits ul { list-style: none; padding: 0; margin: 0; }
    .benefits li { padding: 0.25rem 0; color: #444; font-size: 0.95rem; }
    .signup-note { text-align: center; margin-top: 0.5rem; }
    .signup-note small { color: #666; font-style: italic; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.5rem; color: #eee; }
    input { width: 100%; padding: 0.6rem; border-radius: 6px; border: 1px solid #444; background: #1a1d20; color: #fff; font-size: 1rem; }
    /* Special styling when signup-modal is active to ensure inputs are readable */
    .signup-modal input { background: #fff; color: #111; border: 1px solid #ddd; }
    input:focus { outline: none; border-color: #f7c873; }
    .hint { font-size: 0.85rem; color: #999; margin-top: 0.25rem; }
    .error { color: #ff4444; font-size: 0.9rem; margin-top: 0.25rem; }
    .actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.25rem; }
    .signup-actions { justify-content: center; }
    button { padding: 0.6rem 1.2rem; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
    button[type="button"] { background: #444; color: #fff; }
    button[type="button"]:hover { background: #555; }
    button.secondary { background: transparent; border: 1px solid #ccc; color: #333; }
    button.secondary:hover { background: #f6f6f6; }
    button.primary { background: #f7c873; color: #000; }
    button.primary:hover { background: #f9d48f; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .validation-error {
      color: #ff4444;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      text-align: center;
    }
    /* Invite modal specific styles */
    .invite-modal {
      max-width: 480px;
      background: #fff;
      color: #111;
    }
    .invite-content {
      text-align: center;
    }
    .invite-actions {
      justify-content: center;
    }
    /* Referral modal specific styles */
    .referral-modal {
      max-width: 480px;
      background: #fff;
      color: #111;
    }
    .referral-modal h2 {
      color: #f7c873;
    }
    .referral-modal p {
      color: #333;
      margin-bottom: 1rem;
    }
    .referral-modal label {
      color: #333;
      font-weight: 500;
    }
    .referral-modal input {
      background: #fff;
      color: #111;
      border: 1px solid #ddd;
    }
    .referral-modal .error {
      color: #ff4444;
    }
    .referral-modal .referral-message {
      color: #333;
      margin-top: 1rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #f7c873;
    }
    .referral-content {
      text-align: center;
    }
    .referral-actions {
      justify-content: center;
    }
  `]
})
export class RequestModalComponent implements OnChanges, OnInit {
  @Input() open = false;
  @Input() row!: number;
  @Input() col!: number;
  @Input() gameData: any = null;
  @Output() closed = new EventEmitter<void>();
  @Output() requested = new EventEmitter<{ name: string; email: string; userId?: string; friendEmail?: string }>();
  @Output() signupRequested = new EventEmitter<{ name: string; email: string }>();

  name = '';
  email = '';
  friendEmail = '';
  userId?: string;
  showSignupPrompt = false;
  validationError = '';
  isValidating = false;

  // New properties for invite confirmation flow
  showInviteConfirmation = false;
  showReferralCTA = false;
  pendingInvite: any = null;
  referralFriendName = '';
  referralFriendEmail = '';
  isProcessingInvite = false;
  isProcessingReferral = false;
  confirmationMessage = '';
  referralMessage = '';

  @ViewChild('nameField') nameField!: ElementRef;

  constructor(private router: Router, private boardService: BoardService) {}

  async ngOnInit() {
    await this.loadUserInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] && this.open) {
      this.showSignupPrompt = false;
      this.showInviteConfirmation = false;
      this.showReferralCTA = false;
      this.validationError = '';
      this.confirmationMessage = '';

      // Reload user info and check for pending invites
      this.loadUserInfo().then(async () => {
        // Check if this user has a pending invite for this game
        if (this.userId && this.email && this.gameData?.id) {
          const pendingInvite = await this.boardService.checkUserPendingInvite(this.email, this.gameData.id);
          if (pendingInvite) {
            this.pendingInvite = pendingInvite;
            // Show invite confirmation instead of regular request form
            this.showInviteConfirmation = true;
            return;
          }
        }

        if (this.isGrowthMode() && !this.userId) {
          // Immediately prompt the user to sign in for growth-mode squares
          this.showSignupPrompt = true;
        } else {
          this.showSignupPrompt = false;
          // Focus the name field when the form is visible
          setTimeout(() => {
            this.nameField?.nativeElement?.focus();
          }, 0);
        }
      });
    }
  }

  shouldShowCoordinates(): boolean {
    if (this.gameData?.status === 'closed') {
      return true;
    }
    return !this.gameData?.hide_axes;
  }

  isGrowthMode(): boolean {
    return (this.gameData?.game_mode === 'growth');
  }

  async loadUserInfo() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error loading user info for modal:', error);
        return;
      }

      if (user) {
        this.userId = user.id;
        this.name =
          user.user_metadata?.['full_name'] ||
          user.user_metadata?.['display_name'] ||
          user.user_metadata?.['name'] ||
          this.name;
        this.email = user.email || this.email;
        console.log('Auto-populated user info:', { name: this.name, email: this.email, userId: this.userId });
      } else {
        this.userId = undefined;
      }
    } catch (err) {
      console.error('Unexpected error loading user info:', err);
    }
  }

  close() {
    this.showSignupPrompt = false;
    this.closed.emit();
  }

  async submit(event: Event) {
    event.preventDefault();

    // Clear previous validation errors
    this.validationError = '';

    if (this.name && this.email) {
      // If growth mode, require user to be signed in
      if (this.isGrowthMode() && !this.userId) {
        this.showSignupPrompt = true;
        return;
      }

      // If growth mode with friend email, validate invite play requirements
      if (this.isGrowthMode() && this.friendEmail && this.userId) {
        this.isValidating = true;
        try {
          const validationResult = await this.boardService.validateInvitePlay(
            this.friendEmail,
            this.userId,
            this.gameData?.id
          );

          if (!validationResult.isValid) {
            this.validationError = validationResult.message;
            this.isValidating = false;
            return;
          }
        } catch (error) {
          this.validationError = 'Unable to validate invitation. Please try again.';
          this.isValidating = false;
          return;
        } finally {
          this.isValidating = false;
        }
      }

      this.requested.emit({
        name: this.name,
        email: this.email,
        userId: this.userId,
        friendEmail: this.isGrowthMode() ? this.friendEmail : undefined
      });

      // If user is not logged in for non-growth mode, show signup prompt after successful submission
      if (!this.userId) {
        this.showSignupPrompt = true;
      } else {
        this.close();
      }
    }
  }

  goToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  declineSignup() {
    this.close();
  }

  onBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.close();
  }

  onSignupBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.declineSignup();
  }

  onInviteBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.closeInviteConfirmation();
  }

  onReferralBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.closeReferralCTA();
  }

  closeInviteConfirmation() {
    this.showInviteConfirmation = false;
  }

  closeReferralCTA() {
    this.showReferralCTA = false;
  }

  async sendReferral() {
    if (!this.isValidEmail(this.referralFriendEmail) || !this.userId) {
      this.referralMessage = 'Please enter a valid email address.';
      return;
    }

    this.isProcessingReferral = true;
    this.referralMessage = '';

    try {
      // Use the actual board service method to create referral
      const result = await this.boardService.createReferralForNewUser(
        this.userId,
        this.gameData?.id,
        this.name,
        this.email,
        this.referralFriendEmail
      );

      if (!result.success) {
        this.referralMessage = result.message;
      } else {
        this.referralMessage = result.message;
        this.referralFriendName = '';
        this.referralFriendEmail = '';

        // Close referral CTA after successful referral
        setTimeout(() => {
          this.showReferralCTA = false;
        }, 3000);
      }
    } catch (error) {
      this.referralMessage = 'Failed to send referral. Please try again.';
    } finally {
      this.isProcessingReferral = false;
    }
  }

  isValidEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async acceptInviteSquare() {
    if (!this.pendingInvite?.id || !this.userId) return;

    this.isProcessingInvite = true;
    this.confirmationMessage = '';

    try {
      // Instead of using the existing referral square, assign the currently selected square
      const result = await this.boardService.assignSelectedSquareToInvitedUser(
        this.pendingInvite.id,
        this.userId,
        this.row,
        this.col,
        this.gameData?.id
      );

      if (!result.success) {
        this.confirmationMessage = result.message;
      } else {
        this.confirmationMessage = result.message;
        // Show referral CTA after successfully accepting invite
        setTimeout(() => {
          this.showInviteConfirmation = false;
          this.showReferralCTA = true;
        }, 2000);
      }
    } catch (error) {
      this.confirmationMessage = 'An error occurred while accepting the invite. Please try again.';
    } finally {
      this.isProcessingInvite = false;
    }
  }
}
