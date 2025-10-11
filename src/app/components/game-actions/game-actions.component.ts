import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameInfoComponent } from '../game-info/game-info.component';
import { supabase } from '../../data-sources/supabase.client';

export enum GameStatus {
  Open = 'open',
  Cancel = 'cancel',
  Locked = 'locked',
  Started = 'started',
  Complete = 'complete',
}

@Component({
  selector: 'sq-game-actions',
  standalone: true,
  imports: [CommonModule, GameInfoComponent],
  templateUrl: './game-actions.component.html',
  styles: [`
    .game-actions-container {
      background: #181a1b;
      color: #eee;
      padding: 1.5rem;
      border-radius: 12px;
      margin: 1rem 0;
      border: 1px solid #333;
    }

    .actions-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #444;
      padding-bottom: 1rem;
    }

    .game-timing {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .start-time {
      font-size: 0.9rem;
      color: #aaa;
    }

    .countdown {
      font-size: 1.1rem;
      font-weight: bold;
      color: #f7c873;
    }

    .countdown.live {
      color: #e74c3c;
      animation: pulse 1s infinite;
    }

    .countdown.upcoming {
      color: #2ecc40;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }

    .status-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .status-badge.open {
      background: #2ecc40;
      color: white;
    }

    .status-badge.locked {
      background: #f39c12;
      color: white;
    }

    .status-badge.drawn {
      background: #e74c3c;
      color: white;
    }

    .status-badge.closed {
      background: #666;
      color: white;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-button {
      background: #2a2d30;
      border: 1px solid #444;
      color: #eee;
      padding: 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }

    .action-button:hover {
      background: #333;
      border-color: #555;
      transform: translateY(-1px);
    }

    .action-button.primary {
      background: #2ecc40;
      border-color: #27ae36;
      color: white;
    }

    .action-button.primary:hover {
      background: #27ae36;
      border-color: #229e32;
    }

    .action-button.warning {
      background: #f39c12;
      border-color: #e67e22;
      color: white;
    }

    .action-button.warning:hover {
      background: #e67e22;
      border-color: #d35400;
    }

    .action-button.danger {
      background: #e74c3c;
      border-color: #c0392b;
      color: white;
    }

    .action-button.danger:hover {
      background: #c0392b;
      border-color: #a93226;
    }

    .action-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    .action-icon {
      font-size: 1.5rem;
    }

    .action-title {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .action-description {
      font-size: 0.8rem;
      color: #aaa;
      line-height: 1.2;
    }

    .share-url {
      background: #222;
      border: 1px solid #444;
      color: #eee;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      width: 100%;
      margin-top: 0.5rem;
      font-family: monospace;
    }

    .confirmation-message {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #2ecc40;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      font-weight: bold;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .actions-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .quick-actions {
        grid-template-columns: 1fr;
        gap: 0.8rem;
      }

      .action-button {
        padding: 0.8rem;
      }
    }
  `]
})
export class GameActionsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() gameData: any = null;
  @Input() isAdminView: boolean = false;

  countdownText = '';
  countdownClass = '';
  gameShareUrl = '';
  showConfirmation = false;
  confirmationMessage = '';

  private countdownInterval: any;

  ngOnInit() {
    this.generateShareUrl();
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameData'] && this.gameData) {
      this.generateShareUrl();
      this.startCountdown();
    }
  }

  generateShareUrl() {
    if (this.gameData?.id) {
      this.gameShareUrl = `${window.location.origin}/services/game-page/${this.gameData.id}`;
    }
  }

  startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    if (!this.gameData?.starts_at) {
      this.countdownText = 'No start time set';
      this.countdownClass = '';
      return;
    }

    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    if (!this.gameData?.starts_at) return;

    const now = new Date().getTime();
    const startTime = new Date(this.gameData.starts_at).getTime();
    const timeDiff = startTime - now;

    if (timeDiff > 0) {
      // Game hasn't started yet
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      if (days > 0) {
        this.countdownText = `Starts in ${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        this.countdownText = `Starts in ${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        this.countdownText = `Starts in ${minutes}m ${seconds}s`;
      } else {
        this.countdownText = `Starting in ${seconds}s`;
      }

      this.countdownClass = 'upcoming';
    } else {
      // Game has started
      const elapsed = Math.abs(timeDiff);
      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));

      this.countdownText = `Live - ${hours}h ${minutes}m elapsed`;
      this.countdownClass = 'live';
    }
  }

  async copyShareLink() {
    try {
      await navigator.clipboard.writeText(this.gameShareUrl);
      this.showConfirmationMessage('Share link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.gameShareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showConfirmationMessage('Share link copied to clipboard!');
    }
  }

  async toggleLockBoard() {
    if (!this.gameData?.id) return;

    const newStatus = this.gameData.status === 'locked' ? 'open' : 'locked';

    try {
      const { error } = await supabase
        .from('games')
        .update({ status: newStatus })
        .eq('id', this.gameData.id);

      if (error) {
        console.error('Error updating game status:', error);
        this.showConfirmationMessage('Error updating board status', true);
        return;
      }

      // Update local data
      this.gameData.status = newStatus;

      const action = newStatus === 'locked' ? 'locked' : 'unlocked';
      this.showConfirmationMessage(`Board ${action} successfully!`);

    } catch (err) {
      console.error('Error toggling board lock:', err);
      this.showConfirmationMessage('Error updating board status', true);
    }
  }

  async closeGame() {
    if (!this.gameData?.id) return;

    const confirmed = window.confirm(
      'Are you sure you want to close this game? This action cannot be undone and will prevent any further changes.'
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('games')
        .update({
          status: 'closed',
          closed_at: new Date().toISOString()
        })
        .eq('id', this.gameData.id);

      if (error) {
        console.error('Error closing game:', error);
        this.showConfirmationMessage('Error closing game', true);
        return;
      }

      // Update local data
      this.gameData.status = 'closed';
      this.gameData.closed_at = new Date().toISOString();

      this.showConfirmationMessage('Game closed successfully!');

    } catch (err) {
      console.error('Error closing game:', err);
      this.showConfirmationMessage('Error closing game', true);
    }
  }

  showConfirmationMessage(message: string, isError = false) {
    this.confirmationMessage = message;
    this.showConfirmation = true;

    setTimeout(() => {
      this.showConfirmation = false;
    }, 3000);
  }

  getStatusBadgeClass(): string {
    return `status-badge ${this.gameData?.status || 'open'}`;
  }

  getStatusText(): string {
    switch (this.gameData?.status) {
      case 'open': return 'Open';
      case 'locked': return 'Locked';
      case 'drawn': return 'Drawn';
      case 'closed': return 'Closed';
      default: return 'Unknown';
    }
  }

  getLockButtonText(): string {
    return this.gameData?.status === 'locked' ? 'Unlock Board' : 'Lock Board';
  }

  getLockButtonClass(): string {
    return this.gameData?.status === 'locked' ? 'primary' : 'warning';
  }

  isGameClosed(): boolean {
    return this.gameData?.status === 'closed';
  }

  isGameJoinable(): boolean {
    // Allow joining only if game is open and not locked/canceled/started/complete
    return this.gameData?.status === GameStatus.Open;
  }

  isGameLive(): boolean {
    return this.gameData?.status === GameStatus.Started;
  }

  isGameComplete(): boolean {
    return this.gameData?.status === GameStatus.Complete;
  }

  formatStartTime(): string {
    if (!this.gameData?.starts_at) return 'No start time set';

    const startTime = new Date(this.gameData.starts_at);
    return startTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  }
}
