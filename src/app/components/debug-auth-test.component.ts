import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'debug-auth-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-light rounded">
      <h3>🔧 Authentication Debug Panel</h3>

      <div class="mb-3">
        <h5>Current Auth State:</h5>
        <p><strong>User:</strong> {{ authService.user() ? 'Authenticated' : 'Not Authenticated' }}</p>
        <p><strong>User ID:</strong> {{ authService.user()?.id || 'None' }}</p>
        <p><strong>Profile:</strong> {{ authService.profile() ? 'Loaded' : 'Not Loaded' }}</p>
        <p><strong>Membership:</strong> {{ authService.profile()?.membership || 'None' }}</p>
      </div>

      <div class="mb-3">
        <h5>Test Actions:</h5>
        <button class="btn btn-primary me-2" (click)="testSignOut()">Test Sign Out</button>
        <button class="btn btn-secondary" (click)="logCurrentState()">Log Current State</button>
      </div>

      <div class="alert alert-info">
        <small>Check the browser console for detailed logs</small>
      </div>
    </div>
  `
})
export class DebugAuthTestComponent {
  authService = inject(AuthService);

  testSignOut() {
    console.log('🧪 DEBUG: Testing sign out...');
    this.authService.signOut();
  }

  logCurrentState() {
    console.log('🧪 DEBUG: Current auth state:');
    console.log('User:', this.authService.user());
    console.log('Profile:', this.authService.profile());
    console.log('IsAuthenticated:', this.authService.isAuthenticated());
  }
}
