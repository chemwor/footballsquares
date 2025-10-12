import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { servicev3Type } from '../../data'

@Component({
  selector: 'single-v3-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  @Input() gameData: any = null;

  formatGameDate(): string {
    if (!this.gameData?.starts_at) return 'Date TBD';

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

  get servicesv3(): servicev3Type[] {
    if (this.gameData) {
      // Format sport display with capitalization
      const sportDisplay = this.gameData.sport
        ? `${this.gameData.sport.charAt(0).toUpperCase() + this.gameData.sport.slice(1)}: ${this.gameData.team1_name} vs ${this.gameData.team2_name}`
        : 'Date TBD';

      return [
        {
          iconSrc: 'assets/img/services/v3/icons/time-white.svg',
          headingText: sportDisplay,
        },
        // {
        //   iconSrc: 'assets/img/services/v3/icons/time-white.svg',
        //   headingText: this.formatGameDate(),
        // },
        {
          iconSrc: 'assets/img/services/v3/icons/monitor-white.svg',
          headingText: `Host: ${this.gameData.owner_name || 'Unknown'}`,
        },
      ];
    }

    // Fallback to default data if no gameData provided
    return [
      {
        iconSrc: 'assets/img/services/v3/icons/time-white.svg',
        headingText: 'Oct 28th, 2025',
      },
      {
        iconSrc: 'assets/img/services/v3/icons/cog-white.svg',
        headingText: 'Status: Upcoming',
      },
      {
        iconSrc: 'assets/img/services/v3/icons/monitor-white.svg',
        headingText: 'Host: Eric Chemwor',
      },
    ];
  }
}
