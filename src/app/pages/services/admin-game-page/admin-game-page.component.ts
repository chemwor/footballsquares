import { Component, OnInit } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './component/hero/hero.component'
import { FooterComponent } from './component/footer/footer.component'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'
import { RouterModule, ActivatedRoute } from '@angular/router'
import { AdminPanelComponent } from '@components/admin-panel/admin-panel.component'
import { AdminBoardViewComponent } from '@components/admin-board-view/admin-board-view.component'
import { QuarterWinnersComponent } from '@components/quarter-winners/quarter-winners.component'
import { GameActionsComponent } from '@components/game-actions/game-actions.component'
import { supabase } from 'src/app/data-sources/supabase.client'
import { AuthService } from 'src/app/services/auth.service'
import { filter, take } from 'rxjs/operators'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'admin-game-page',
  standalone: true,
  imports: [
    CommonModule,
    NavigationBar2Component,
    HeroComponent,
    FooterComponent,
    JarallaxDirective,
    RouterModule,
    AdminPanelComponent,
    AdminBoardViewComponent,
    QuarterWinnersComponent,
    GameActionsComponent,
  ],
  templateUrl: './admin-game-page.component.html',
  styles: ``,
})
export class AdminGamePageComponent implements OnInit {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }

  gameId: string | null = null
  gameData: any = null
  loading: boolean = false
  error: string = ''
  accessDenied: boolean = false
  currentUser: any = null
  heroBgUrl: string = 'assets/img/services/v3/hero-bg.jpg'

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userResolved$
      .pipe(filter(resolved => resolved), take(1))
      .subscribe(() => {
        this.loadCurrentUserAndGame()
      })
  }

  async loadCurrentUserAndGame() {
    // Get current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error('Error fetching user:', userError)
      this.error = 'Authentication error'
      return
    }

    if (!user) {
      this.error = 'You must be logged in to access this page'
      return
    }

    this.currentUser = user

    // Get game ID from route parameters
    this.gameId = this.route.snapshot.paramMap.get('id')
    console.log('Game ID from route:', this.gameId)

    if (this.gameId) {
      await this.loadGameData()
    } else {
      console.error('No game ID provided in route')
      this.error = 'No game ID provided'
    }
  }

  async loadGameData() {
    if (!this.gameId) return

    this.loading = true
    this.error = ''
    this.accessDenied = false

    try {
      // Fetch game data from Supabase
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', this.gameId)
        .single()

      if (error) {
        console.error('Error fetching game data:', error)
        this.error = 'Error loading game data'
        return
      }

      // Check if the current user is the owner of the game
      if (data.owner_id !== this.currentUser?.id) {
        console.log('Access denied: User is not the owner of this game')
        console.log('Game owner_id:', data.owner_id)
        console.log('Current user id:', this.currentUser?.id)
        this.accessDenied = true
        this.error = 'Access denied: You are not authorized to view this admin page'
        return
      }

      this.gameData = data
      console.log('Game data loaded:', this.gameData)
      console.log('Game title:', this.gameData?.title)
      console.log('Game sport:', this.gameData?.sport)
      console.log('Teams:', this.gameData?.team1_name, 'vs', this.gameData?.team2_name)
      console.log('Grid size:', this.gameData?.grid_size)
      console.log('Status:', this.gameData?.status)
      console.log('Created at:', this.gameData?.created_at)
      console.log('Owner ID:', this.gameData?.owner_id)

      // Set heroBgUrl based on sport if available
      if (this.gameData && this.gameData.sport) {
        const sport = this.gameData.sport.toLowerCase();
        if (sport === 'basketball') {
          this.heroBgUrl = 'assets/img/services/v3/basketball.jpg';
        } else if (sport === 'football') {
          this.heroBgUrl = 'assets/img/services/v3/football.jpg';
        } else {
          this.heroBgUrl = 'assets/img/services/v3/hero-bg.jpg';
        }
      } else {
        this.heroBgUrl = 'assets/img/services/v3/hero-bg.jpg';
      }
    } catch (err) {
      console.error('Unexpected error loading game:', err)
      this.error = 'Unexpected error occurred'
    } finally {
      this.loading = false
    }
  }
}
