import { Component } from '@angular/core'
import { blogPostList, BlogPostType } from '../../../list-sidebar/data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'list-blog',
  standalone: true,
  imports: [NgbPaginationModule, RouterModule],
  templateUrl: './list-blog.component.html',
  styles: ``,
})
export class ListBlogComponent {
  allListBlog: BlogPostType[] = blogPostList
  games = [
    {
      image: 'assets/img/mma-1575854_1280.jpg',
      title: 'Falcons vs Eagles Squares',
      sport: 'Football',
      match: 'Falcons vs Eagles',
      boardSize: '10x10',
      status: 'Open',
      ownerName: 'Eric Chemwor',
      excerpt: 'Join the excitement for Falcons vs Eagles. Claim your square and win big!',
      shares: 12,
      comments: 5,
      date: 'Oct 1, 2025',
      category: 'Football'
    },
    {
      image: 'assets/img/bjj-8111390_1280.jpg',
      title: 'Lakers vs Celtics Squares',
      sport: 'Basketball',
      match: 'Lakers vs Celtics',
      boardSize: '10x10',
      status: 'Pending',
      ownerName: 'Jane Doe',
      excerpt: 'Classic rivalry! Secure your spot for Lakers vs Celtics squares.',
      shares: 8,
      comments: 2,
      date: 'Sep 28, 2025',
      category: 'Basketball'
    },
    {
      image: 'assets/img/card.png',
      title: 'Yankees vs Red Sox Squares',
      sport: 'Baseball',
      match: 'Yankees vs Red Sox',
      boardSize: '5x5',
      status: 'Closed',
      ownerName: 'Alex Smith',
      excerpt: 'The game is closed, but check back for more baseball squares soon.',
      shares: 15,
      comments: 7,
      date: 'Sep 20, 2025',
      category: 'Baseball'
    }
  ];
}
