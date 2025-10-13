import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-request-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Main Request Modal -->
    <div *ngIf="open && !showSignupPrompt" class="modal-backdrop debug-modal" (click)="onBackdrop($event)" tabindex="-1">
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

          <div class="actions">
            <button type="button" (click)="close()">Cancel</button>
            <button
              type="submit"
              [disabled]="form.invalid"
              class="primary"
            >
              Request Square
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Signup Prompt Modal -->
    <div *ngIf="showSignupPrompt" class="modal-backdrop debug-modal" (click)="onSignupBackdrop($event)" tabindex="-1">
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

        <div class="actions">
          <button type="button" (click)="declineSignup()" class="secondary">
            No Thanks, Continue
          </button>
          <button type="button" (click)="acceptSignup()" class="primary">
            Create Account
          </button>
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
    .signup-modal {
      max-width: 500px;
    }
    h2 {
      margin: 0 0 1.5rem;
      font-size: 1.4rem;
      color: #f7c873;
    }
    .signup-content {
      margin-bottom: 2rem;
    }
    .signup-content p {
      margin-bottom: 1.5rem;
      color: #eee;
      font-size: 1.1rem;
    }
    .benefits {
      background: #1a1d20;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .benefits h3 {
      margin: 0 0 1rem;
      color: #f7c873;
      font-size: 1.1rem;
    }
    .benefits ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .benefits li {
      padding: 0.5rem 0;
      color: #ddd;
      font-size: 0.95rem;
    }
    .signup-note {
      text-align: center;
      margin-top: 1rem;
    }
    .signup-note small {
      color: #999;
      font-style: italic;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #eee;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid #444;
      background: #1a1d20;
      color: #fff;
      font-size: 1rem;
    }
    input:focus {
      outline: none;
      border-color: #f7c873;
    }
    .error {
      color: #ff4444;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    button[type="button"] {
      background: #444;
      color: #fff;
    }
    button[type="button"]:hover {
      background: #555;
    }
    button.secondary {
      background: #444;
      color: #fff;
    }
    button.secondary:hover {
      background: #555;
    }
    button.primary {
      background: #f7c873;
      color: #000;
    }
    button.primary:hover {
      background: #f9d48f;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class RequestModalComponent implements OnChanges, OnInit {
  @Input() open = false;
  @Input() row!: number;
  @Input() col!: number;
  @Input() gameData: any = null;
  @Output() closed = new EventEmitter<void>();
  @Output() requested = new EventEmitter<{ name: string; email: string; userId?: string }>();
  @Output() signupRequested = new EventEmitter<{ name: string; email: string }>();

  name = '';
  email = '';
  userId?: string; // Store the current user's ID
  showSignupPrompt = false;

  @ViewChild('nameField') nameField!: ElementRef;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadUserInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] && this.open) {
      this.showSignupPrompt = false; // Reset signup prompt when modal opens
      this.loadUserInfo(); // Reload user info when modal opens
      setTimeout(() => {
        this.nameField?.nativeElement?.focus();
      }, 0);
    }
  }

  shouldShowCoordinates(): boolean {
    // Hide coordinates if hide_axes is true, unless game is closed
    if (this.gameData?.status === 'closed') {
      return true; // Always show coordinates when game is closed
    }
    return !this.gameData?.hide_axes;
  }

  async loadUserInfo() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error loading user info for modal:', error);
        return;
      }

      if (user) {
        // Store the user ID
        this.userId = user.id;

        // Auto-populate with user's information
        this.name =
          user.user_metadata?.['full_name'] ||
          user.user_metadata?.['display_name'] ||
          user.user_metadata?.['name'] ||
          this.name; // Keep existing value if no metadata
        this.email = user.email || this.email; // Keep existing value if no email
        console.log('Auto-populated user info:', { name: this.name, email: this.email, userId: this.userId });
      } else {
        // Clear user ID if no user is logged in
        this.userId = undefined;
      }
    } catch (err) {
      console.error('Unexpected error loading user info:', err);
    }
  }

  close() {
    this.showSignupPrompt = false;
    this.closed.emit();
    // Don't clear the fields immediately - they might want to reopen
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.name && this.email) {
      this.requested.emit({ name: this.name, email: this.email, userId: this.userId });

      // If user is not logged in, show signup prompt after successful submission
      if (!this.userId) {
        this.showSignupPrompt = true;
      } else {
        this.close();
      }
    }
  }

  acceptSignup() {
    // Navigate to the signup page
    this.router.navigate(['/auth/signup']);
  }

  declineSignup() {
    // User declined signup, just close the modal
    this.close();
  }

  onBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.close();
  }

  onSignupBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.declineSignup();
  }
}
