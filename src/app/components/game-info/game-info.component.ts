import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum GameStatus {
  Open = 'open',
  Cancel = 'cancel',
  Locked = 'locked',
  Started = 'started',
  Complete = 'complete',
}

@Component({
  selector: 'sq-game-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-info.component.html',
  styles: [`
    .game-info-container {
      background: linear-gradient(135deg, #1a1d23 0%, #2a2d35 100%);
      color: #eee;
      padding: 1.5rem;
      border-radius: 12px;
      margin: 1rem 0;
      border: 1px solid #333;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #444;
      padding-bottom: 1rem;
    }

    .info-title {
      font-size: 1.3rem;
      font-weight: bold;
      color: #f7c873;
      margin: 0;
    }

    .game-status-badge {
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-open {
      background: linear-gradient(135deg, #2ecc40, #27ae36);
      color: white;
      box-shadow: 0 2px 4px rgba(46, 204, 64, 0.3);
    }

    .status-cancel {
      background: linear-gradient(135deg, #95a5a6, #7f8c8d);
      color: white;
      box-shadow: 0 2px 4px rgba(149, 165, 166, 0.3);
    }

    .status-locked {
      background: linear-gradient(135deg, #f39c12, #e67e22);
      color: white;
      box-shadow: 0 2px 4px rgba(243, 156, 18, 0.3);
    }

    .status-started {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      box-shadow: 0 2px 4px rgba(231, 76, 60, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }

    .status-complete {
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
      color: white;
      box-shadow: 0 2px 4px rgba(155, 89, 182, 0.3);
    }

    .status-closed {
      background: linear-gradient(135deg, #34495e, #2c3e50);
      color: white;
      box-shadow: 0 2px 4px rgba(52, 73, 94, 0.3);
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .info-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #444;
      border-radius: 8px;
      padding: 1.2rem;
      transition: all 0.3s ease;
    }

    .info-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: #555;
      transform: translateY(-2px);
    }

    .info-card-title {
      font-size: 1rem;
      font-weight: 600;
      color: #f7c873;
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .info-card-content {
      font-size: 0.95rem;
      color: #ccc;
      line-height: 1.5;
    }

    .icon {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .winner-banner {
      background: linear-gradient(135deg, #f39c12, #e67e22);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 1rem;
      box-shadow: 0 4px 8px rgba(243, 156, 18, 0.3);
      animation: celebrationPulse 2s ease-in-out infinite;
    }

    .winner-banner h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.4rem;
      font-weight: bold;
    }

    .winner-banner p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.9;
    }

    @keyframes celebrationPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    .feature-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .feature-enabled {
      background: rgba(46, 204, 64, 0.2);
      color: #2ecc40;
      border: 1px solid rgba(46, 204, 64, 0.3);
    }

    .feature-disabled {
      background: rgba(149, 165, 166, 0.2);
      color: #95a5a6;
      border: 1px solid rgba(149, 165, 166, 0.3);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    .dot-enabled {
      background: #2ecc40;
      box-shadow: 0 0 6px rgba(46, 204, 64, 0.5);
    }

    .dot-disabled {
      background: #95a5a6;
    }

    @media (max-width: 768px) {
      .info-grid {
        grid-template-columns: 1fr;
      }

      .info-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class GameInfoComponent {
  @Input() gameData: any;

  get gameStatusClass(): string {
    const status = this.gameData?.status;
    return `game-status-badge status-${status}`;
  }

  get gameStatusText(): string {
    const status = this.gameData?.status;
    switch (status) {
      case GameStatus.Open:
        return 'Open for Registration';
      case GameStatus.Cancel:
        return 'Cancelled';
      case GameStatus.Locked:
        return 'Registration Locked';
      case GameStatus.Started:
        return 'Game in Progress';
      case GameStatus.Complete:
        return 'Game Complete';
      case 'closed': // Legacy status
        return 'Closed';
      default:
        return 'Unknown Status';
    }
  }

  get isGameClosed(): boolean {
    return this.gameData?.status === 'closed' || this.gameData?.status === GameStatus.Complete;
  }

  get isGameComplete(): boolean {
    return this.gameData?.status === GameStatus.Complete;
  }

  get isGameActive(): boolean {
    return this.gameData?.status === GameStatus.Started;
  }

  get isGameJoinable(): boolean {
    return this.gameData?.status === GameStatus.Open;
  }

  get isGameCancelled(): boolean {
    return this.gameData?.status === GameStatus.Cancel;
  }

  get hasWinner(): boolean {
    return this.gameData?.winner_name || this.gameData?.has_winner || false;
  }

  get isReverseSquares(): boolean {
    return this.gameData?.reverse_squares || false;
  }

  get areAxesVisible(): boolean {
    return !this.gameData?.hide_axes; // If hide_axes is true, axes are NOT visible
  }
}
