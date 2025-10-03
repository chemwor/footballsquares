import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { servicev3Type, servicesv3 } from '../../data'

@Component({
  selector: 'single-v3-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  // servicesv3: servicev3Type[] = servicesv3

  servicesv3: servicev3Type[] = [
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
    // {
    //   iconSrc: 'assets/img/services/v3/icons/size-white.svg',
    //   headingText: 'Full range of services',
    // },
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

}
