import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { Saa3LayersType, saas3Layer } from '../../data'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'saas-v3-hero',
  standalone: true,
  imports: [ParallaxMouseMoveDirective, CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  saas3Layers: Saa3LayersType[] = saas3Layer
  showAuthModal = false

  constructor(private authService: AuthService, private router: Router) {}

  onCreateBoardClick() {
    // Check if user is authenticated
    if (!this.authService.user()) {
      this.showAuthModal = true
      return
    }
    // If authenticated, navigate to board creation page
    this.router.navigate(['/landings/get-your-picks'])
  }

  closeAuthModal() {
    this.showAuthModal = false
  }
}
