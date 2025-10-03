import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { SubscriptionComponent } from '../current-games/component/subscription/subscription.component'
import { FooterComponent } from '../current-games/component/footer/footer.component'
import { ListBlogComponent } from './component/list-blog/list-blog.component'

@Component({
  selector: 'hosted-games',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    SubscriptionComponent,
    FooterComponent,
    ListBlogComponent,
  ],
  templateUrl: './complete-games.component.html',
  styles: ``,
})
export class CompleteGamesComponent {
  games = [
    {
      image: 'assets/img/mma-1575854_1280.jpg',
      title: 'Completed Game: Falcons vs Eagles Squares',
      sport: 'Football',
      match: 'Falcons vs Eagles',
      boardSize: '10x10',
      status: 'Completed',
      ownerName: 'Eric Chemwor',
      excerpt: 'This game is finished. See results and winners!',
      shares: 12,
      comments: 5,
      date: 'Oct 1, 2025',
      category: 'Football',
    },
    {
      image: 'assets/img/bjj-8111390_1280.jpg',
      title: 'Completed Game: Lakers vs Celtics Squares',
      sport: 'Basketball',
      match: 'Lakers vs Celtics',
      boardSize: '10x10',
      status: 'Completed',
      ownerName: 'Jane Doe',
      excerpt: 'Classic rivalry completed. Check the board for results.',
      shares: 8,
      comments: 2,
      date: 'Sep 28, 2025',
      category: 'Basketball',
    },
    {
      image: 'assets/img/card.png',
      title: 'Completed Game: Yankees vs Red Sox Squares',
      sport: 'Baseball',
      match: 'Yankees vs Red Sox',
      boardSize: '5x5',
      status: 'Completed',
      ownerName: 'Alex Smith',
      excerpt: 'Baseball squares game completed. See who won!',
      shares: 15,
      comments: 7,
      date: 'Sep 20, 2025',
      category: 'Baseball',
    },
  ]
}
