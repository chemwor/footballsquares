import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { servicev3Type, servicesv3 } from '../../data'
import { supabase } from 'src/app/data-sources/supabase.client';

@Component({
  selector: 'single-v3-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent implements OnInit, OnChanges {
  @Input() gameData: any = null;

  servicesv3: servicev3Type[] = [
    {
      iconSrc: 'assets/img/services/v3/icons/time-white.svg',
      headingText: 'Loading...',
    },
    {
      iconSrc: 'assets/img/services/v3/icons/cog-white.svg',
      headingText: 'Loading...',
    },
    {
      iconSrc: 'assets/img/services/v3/icons/monitor-white.svg',
      headingText: 'Loading...',
    },
  ]

  gameSquares = [
    {
      sport: 'Football',
      match: 'Falcons vs Eagles',
      dateTime: 'Oct 6, 2025 - 8:20 PM EST',
      status: 'upcoming',
      hostName: 'Eric Chemwor',
      iconSrc: 'assets/img/icons/football-icon.svg'
    },
    {
      sport: 'Basketball',
      match: 'Lakers vs Celtics',
      dateTime: 'Oct 8, 2025 - 7:30 PM EST',
      status: 'upcoming',
      hostName: 'Jane Doe',
      iconSrc: 'assets/img/icons/basketball-icon.svg'
    },
    {
      sport: 'Baseball',
      match: 'Yankees vs Red Sox',
      dateTime: 'Oct 10, 2025 - 7:00 PM EST',
      status: 'in progress',
      hostName: 'Alex Smith',
      iconSrc: 'assets/img/icons/baseball-icon.svg'
    },
    {
      sport: 'Football',
      match: 'Cowboys vs Giants',
      dateTime: 'Sep 28, 2025 - 1:00 PM EST',
      status: 'completed',
      hostName: 'Mike Johnson',
      iconSrc: 'assets/img/icons/football-icon.svg'
    }
  ];

  heroBgUrl: string = '';

  async ngOnInit() {
    if (this.gameData) {
      await this.loadSquareCounts();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['gameData'] && this.gameData) {
      await this.loadSquareCounts();
    }
  }

  async loadSquareCounts() {
    if (!this.gameData?.id) return;

    try {
      // Fetch square counts for this game (still needed for debugging)
      const { data, error } = await supabase
        .from('squares')
        .select('status')
        .eq('game_id', this.gameData.id);

      if (error) {
        console.error('Error fetching square counts:', error);
        return;
      }

      // Count squares by status (for debugging)
      const statusCounts = {
        empty: 0,
        pending: 0,
        approved: 0
      };

      // Calculate total possible squares
      const totalSquares = this.gameData.grid_size * this.gameData.grid_size;

      // Count existing squares by status
      data?.forEach(square => {
        if (square.status === 'pending') {
          statusCounts.pending++;
        } else if (square.status === 'approved') {
          statusCounts.approved++;
        }
      });

      // Calculate empty squares (total - claimed squares)
      statusCounts.empty = totalSquares - statusCounts.pending - statusCounts.approved;

      console.log('Square counts:', statusCounts);

      // Format teams display
      const teamsDisplay = this.gameData.team1_name && this.gameData.team2_name
        ? `${this.gameData.team1_name} vs ${this.gameData.team2_name}`
        : 'Teams TBD';

      // Format sport display
      const sportDisplay = this.gameData.sport
        ? `${this.gameData.sport.charAt(0).toUpperCase() + this.gameData.sport.slice(1)}: ${teamsDisplay}`
        : teamsDisplay;

      // Format board size
      const boardSizeDisplay = `${this.gameData.grid_size}×${this.gameData.grid_size} Grid`;

      // Format game status with appropriate styling
      const statusDisplay = this.gameData.status
        ? `Status: ${this.gameData.status.charAt(0).toUpperCase() + this.gameData.status.slice(1)}`
        : 'Status: Unknown';

      // Determine sport icon and hero background
      let sportIcon = 'assets/img/services/v3/icons/time-white.svg';
      let heroBgUrl = '';
      if (this.gameData.sport) {
        const sport = this.gameData.sport.toLowerCase();
        if (sport === 'basketball') {
          sportIcon = 'assets/img/services/v3/icons/basketball.svg';
          heroBgUrl = 'assets/img/services/v3/basketball.jpg';
        } else if (sport === 'football') {
          sportIcon = 'assets/img/services/v3/icons/football.svg';
          heroBgUrl = 'assets/img/services/v3/football.jpg';
        }
      }
      this.heroBgUrl = heroBgUrl;

      // Update servicesv3 with game information added to existing items
      this.servicesv3 = [
        // New game information items
        {
          iconSrc: sportIcon,
          headingText: sportDisplay,
        },
        // {
        //   iconSrc: 'assets/img/services/v3/icons/cog-white.svg',
        //   headingText: boardSizeDisplay,
        // },
        // Add existing/original items
        {
          iconSrc: 'assets/img/services/v3/icons/check.svg',
          headingText: `${statusCounts.approved} Squares Assigned`,
        },
        {
          iconSrc: 'assets/img/services/v3/icons/expired.svg',
          headingText: `${statusCounts.pending} Pending Approval`,
        },
        {
          iconSrc: 'assets/img/services/v3/icons/empty.svg',
          headingText: `${statusCounts.empty} Empty Squares`,
        },
      ];

    } catch (err) {
      console.error('Error loading square counts:', err);
    }
  }
}
