import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../data-sources/supabase.client';

export enum GameStatus {
  Open = 'open',
  Cancel = 'cancel',
  Locked = 'locked',
  Started = 'started',
  Complete = 'complete',
}

interface QuarterWinner {
  quarter: string;
  homeScore: number | null;
  awayScore: number | null;
  homeTeamAbbr?: string;
  awayTeamAbbr?: string;
  winners: Array<{
    winnerName: string;
    winnerEmail: string;
    squarePosition?: string;
  }>;
  totalPayout: number;
  isActive: boolean;
}

@Component({
  selector: 'sq-quarter-winners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quarter-winners.component.html',
  styles: [`
    .winners-container {
      background: #181a1b;
      color: #eee;
      padding: 2rem;
      border-radius: 12px;
      margin: 2rem 0;
    }

    .winners-title {
      text-align: center;
      color: #f7c873;
      margin-bottom: 2rem;
      font-size: 2rem;
      font-weight: bold;
    }

    .quarters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .quarter-card {
      background: #23272a;
      border-radius: 12px;
      padding: 1.5rem;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      position: relative;
    }

    .quarter-card.active {
      border-color: #2ecc40;
      background: #1e3a24;
      box-shadow: 0 0 20px rgba(46, 204, 64, 0.3);
    }

    .quarter-card.dormant {
      border-color: #666;
      opacity: 0.7;
    }

    .quarter-header {
      text-align: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid #444;
      padding-bottom: 1rem;
    }

    .quarter-header h3 {
      margin: 0;
      color: #f7c873;
      font-size: 1.3rem;
      font-weight: bold;
    }

    .score {
      margin-top: 0.5rem;
      font-size: 1.1rem;
      color: #fff;
      font-weight: 500;
    }

    .winner-info {
      text-align: center;
    }

    .winner-item {
      padding: 0.5rem 0;
    }

    .winner-name {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2ecc40;
      margin-bottom: 0.5rem;
    }

    .winner-email {
      font-size: 0.9rem;
      color: #aaa;
      margin-bottom: 0.5rem;
    }

    .square-position {
      font-size: 0.8rem;
      color: #f7c873;
      font-weight: 500;
    }

    .total-payout {
      text-align: center;
      border-top: 1px solid #444;
      padding-top: 1rem;
    }

    .payout {
      background: #2ecc40;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      display: inline-block;
      font-weight: bold;
    }

    .payout-amount {
      font-size: 1.1rem;
    }

    .dormant-message {
      text-align: center;
      padding: 2rem 1rem;
    }

    .dormant-text {
      color: #666;
      font-style: italic;
      font-size: 1.1rem;
    }

    .admin-controls {
      border-top: 1px solid #444;
      padding-top: 2rem;
      margin-top: 2rem;
    }

    .admin-controls h3 {
      color: #f7c873;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .quarter-control {
      background: #2a2d30;
      padding: 1rem;
      border-radius: 8px;
    }

    .quarter-control h4 {
      margin: 0 0 1rem 0;
      color: #f7c873;
    }

    .score-inputs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .score-inputs label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }

    .score-inputs input {
      background: #181a1b;
      border: 1px solid #444;
      color: #eee;
      padding: 0.3rem 0.5rem;
      border-radius: 4px;
      width: 60px;
    }

    .quarter-control button {
      background: #2ecc40;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      width: 100%;
    }

    .quarter-control button:hover:not(:disabled) {
      background: #27ae36;
    }

    .quarter-control button:disabled {
      background: #666;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .quarters-grid {
        grid-template-columns: 1fr;
      }

      .controls-grid {
        grid-template-columns: 1fr;
      }

      .winners-container {
        padding: 1rem;
      }

      .winners-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class QuarterWinnersComponent implements OnInit, OnChanges {
  @Input() gameData: any;
  @Input() showAdminControls: boolean = false;

  showWinners = false;
  quarters: QuarterWinner[] = [];

  async ngOnInit() {
    if (this.gameData) {
      await this.initializeQuarters();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['gameData'] && this.gameData) {
      await this.initializeQuarters();
    }
  }

  async initializeQuarters() {
    // Initialize quarters with empty data first
    this.quarters = [
      {
        quarter: '1st Quarter',
        homeScore: null,
        awayScore: null,
        winners: [],
        totalPayout: 0,
        isActive: false
      },
      {
        quarter: '2nd Quarter',
        homeScore: null,
        awayScore: null,
        winners: [],
        totalPayout: 0,
        isActive: false
      },
      {
        quarter: '3rd Quarter',
        homeScore: null,
        awayScore: null,
        winners: [],
        totalPayout: 0,
        isActive: false
      },
      {
        quarter: 'Final Score',
        homeScore: null,
        awayScore: null,
        winners: [],
        totalPayout: 0,
        isActive: false
      }
    ];

    // Load team abbreviations
    await this.loadTeamAbbreviations();

    // Load actual winners from database
    await this.loadWinnersFromDatabase();

    // Show winners section if game status is appropriate
    this.showWinners = this.shouldShowWinners();
  }

  async loadTeamAbbreviations() {
    if (!this.gameData) return;

    try {
      let homeTeamAbbr = '';
      let awayTeamAbbr = '';

      // If we have scheduled_game_id, fetch team data from the scheduled games view
      if (this.gameData.scheduled_game_id) {
        const { data: gameData, error } = await supabase
          .from('v_scheduled_games_with_teams')
          .select('home_team_abbr, away_team_abbr')
          .eq('id', this.gameData.scheduled_game_id)
          .single();

        if (!error && gameData) {
          homeTeamAbbr = gameData.home_team_abbr || '';
          awayTeamAbbr = gameData.away_team_abbr || '';
        }
      }
      // Fallback: use team names from game data to look up abbreviations
      else if (this.gameData.team1_name && this.gameData.team2_name) {
        // Look up teams by name (assuming team1 is home, team2 is away)
        const { data: homeTeam } = await supabase
          .from('teams')
          .select('abbreviation')
          .eq('name', this.gameData.team1_name)
          .single();

        const { data: awayTeam } = await supabase
          .from('teams')
          .select('abbreviation')
          .eq('name', this.gameData.team2_name)
          .single();

        homeTeamAbbr = homeTeam?.abbreviation || this.gameData.team1_name?.substring(0, 3).toUpperCase() || '';
        awayTeamAbbr = awayTeam?.abbreviation || this.gameData.team2_name?.substring(0, 3).toUpperCase() || '';
      }

      // Update all quarters with team abbreviations
      this.quarters.forEach(quarter => {
        quarter.homeTeamAbbr = homeTeamAbbr;
        quarter.awayTeamAbbr = awayTeamAbbr;
      });

    } catch (error) {
      console.error('Error loading team abbreviations:', error);
      // Fallback to team names if available
      if (this.gameData.team1_name && this.gameData.team2_name) {
        this.quarters.forEach(quarter => {
          quarter.homeTeamAbbr = this.gameData.team1_name?.substring(0, 3).toUpperCase() || '';
          quarter.awayTeamAbbr = this.gameData.team2_name?.substring(0, 3).toUpperCase() || '';
        });
      }
    }
  }

  async loadWinnersFromDatabase() {
    if (!this.gameData?.id) return;

    try {
      // Query game_winners table joined with squares to get winner information
      const { data, error } = await supabase
        .from('game_winners')
        .select(`
          period_no,
          home_digit,
          away_digit,
          announced_at,
          winner_name,
          winner_email,
          squares!inner(
            id,
            row_idx,
            col_idx,
            user_id
          )
        `)
        .eq('game_id', this.gameData.id)
        .order('period_no');

      if (error) {
        console.error('Error loading quarter winners:', error);
        return;
      }

      console.log('Quarter winners loaded from database:', data);

      // Group winners by quarter to avoid duplicates
      const winnersByQuarter: { [key: number]: any[] } = {};

      data?.forEach(winner => {
        const quarterIndex = winner.period_no - 1;
        if (!winnersByQuarter[quarterIndex]) {
          winnersByQuarter[quarterIndex] = [];
        }
        winnersByQuarter[quarterIndex].push(winner);
      });

      // Update quarters with grouped winner data
      Object.keys(winnersByQuarter).forEach(quarterIndexStr => {
        const quarterIndex = parseInt(quarterIndexStr);
        const winners = winnersByQuarter[quarterIndex];

        if (quarterIndex >= 0 && quarterIndex < this.quarters.length && winners.length > 0) {
          // Use the first winner to get the scores (they should all be the same for the quarter)
          const firstWinner = winners[0];
          const homeScore = firstWinner.home_digit !== null ? firstWinner.home_digit : null;
          const awayScore = firstWinner.away_digit !== null ? firstWinner.away_digit : null;

          // Map all winners for this quarter
          const quarterWinners = winners.map(winner => {
            return {
              winnerName: winner.winner_name || '',
              winnerEmail: winner.winner_email || '',
              squarePosition: winner.home_digit !== null && winner.away_digit !== null
                ? `[${winner.home_digit}, ${winner.away_digit}]`
                : undefined
            };
          });

          // Replace the quarter data (don't append)
          this.quarters[quarterIndex] = {
            ...this.quarters[quarterIndex],
            homeScore: homeScore,
            awayScore: awayScore,
            winners: quarterWinners, // Replace, don't append
            isActive: true
          };

          console.log(`Quarter ${quarterIndex + 1} winners:`, {
            count: quarterWinners.length,
            homeDigit: homeScore,
            awayDigit: awayScore,
            winners: quarterWinners.map(w => w.winnerName)
          });
        }
      });

    } catch (err) {
      console.error('Error loading winners:', err);
    }
  }

  shouldShowWinners(): boolean {
    // Only show winners if the game is complete
    return this.gameData?.status === GameStatus.Complete;
  }

  // Template methods (used in HTML template)
  updateWinner(quarterIndex: number): void {
    const quarter = this.quarters[quarterIndex];
    if (quarter.homeScore !== null && quarter.awayScore !== null) {
      // Calculate winner based on last digit of scores
      const homeLastDigit = quarter.homeScore % 10;
      const awayLastDigit = quarter.awayScore % 10;

      // This would typically lookup the winner from the squares grid
      console.log(`Quarter ${quarterIndex + 1} scores updated:`, {
        home: homeLastDigit,
        away: awayLastDigit
      });
    }
  }

  activateQuarter(quarterIndex: number): void {
    const quarter = this.quarters[quarterIndex];
    if (quarter.homeScore !== null && quarter.awayScore !== null) {
      quarter.isActive = true;

      // Here you would:
      // 1. Calculate the winning square based on last digits
      // 2. Look up who owns that square
      // 3. Save the winner to the database
      // 4. Update the UI

      console.log(`Quarter ${quarterIndex + 1} activated with ${quarter.winners.length} winner(s)`);
    }
  }

  obfuscateEmail(email: string): string {
    if (!email) return '';
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visible = user.slice(0, 3);
    return `${visible}${'*'.repeat(Math.max(0, user.length - 3))}@${domain}`;
  }

  calculateWinningSquare(homeScore: number, awayScore: number): { row: number; col: number } {
    const homeDigit = homeScore % 10;
    const awayDigit = awayScore % 10;
    return { row: homeDigit, col: awayDigit };
  }
}
