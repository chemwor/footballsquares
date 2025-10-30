import { Component, OnInit } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './component/hero/hero.component'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'
import { RouterModule, ActivatedRoute } from '@angular/router'
import { BoardComponent } from '@components/board/board.component'
import { GameActionsComponent } from '@components/game-actions/game-actions.component'
import { GameInfoComponent } from '@components/game-info/game-info.component'
import { QuarterWinnersComponent } from '@components/quarter-winners/quarter-winners.component'
import { UserSquaresComponent } from '@components/user-squares/user-squares.component'
import { supabase } from 'src/app/data-sources/supabase.client'
import { AuthService } from 'src/app/services/auth.service'
import { filter, take } from 'rxjs/operators'
import { NgStyle } from '@angular/common'
import { FooterComponent } from '../../landings/saas-v2/components/footer/footer.component'
import { Title } from '@angular/platform-browser'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-service-v3',
  standalone: true,
  imports: [
    NavigationBar2Component,
    HeroComponent,
    FooterComponent,
    JarallaxDirective,
    RouterModule,
    BoardComponent,
    GameActionsComponent,
    GameInfoComponent,
    QuarterWinnersComponent,
    UserSquaresComponent,
    NgStyle,
    FooterComponent,
  ],
  templateUrl: './service-v3.component.html',
  styles: ``,
})
export class ServiceV3Component implements OnInit {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }

  gameId: string | null = null
  gameData: any = null
  loading: boolean = false
  error: string = ''
  heroBgUrl: string = 'assets/img/services/v3/hero-bg.jpg'

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.authService.userResolved$
      .pipe(
        filter((resolved) => resolved),
        take(1)
      )
      .subscribe(() => {
        this.gameId = this.route.snapshot.paramMap.get('id')
        if (this.gameId) {
          this.loadGameData()
        } else {
          this.error = 'No game ID provided'
        }
      })
  }

  async loadGameData() {
    if (!this.gameId) return

    this.loading = true
    this.error = ''

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

      this.gameData = data
      console.log('Player game data loaded:', this.gameData)

      // Set heroBgUrl based on sport if available
      if (this.gameData && this.gameData.sport) {
        const sport = this.gameData.sport.toLowerCase()
        if (sport === 'basketball') {
          this.heroBgUrl = 'assets/img/services/v3/basketball.jpg'
        } else if (sport === 'football') {
          this.heroBgUrl = 'assets/img/services/v3/football.jpg'
        } else {
          this.heroBgUrl = 'assets/img/services/v3/hero-bg.jpg'
        }
      } else {
        this.heroBgUrl = 'assets/img/services/v3/hero-bg.jpg'
      }

      // --- Set meta tags dynamically ---
      const boardName =
        this.gameData.boardName || this.gameData.name || 'Game Board'
      const homeTeam =
        this.gameData.homeTeam || this.gameData.home_team || 'Home Team'
      const awayTeam =
        this.gameData.awayTeam || this.gameData.away_team || 'Away Team'
      const banner = 'Fun and competitive football games on BlitzSquares!'
      const description = `${banner} ${boardName}: ${homeTeam} vs ${awayTeam}`
      const ogImage =
        this.gameData.boardImage ||
        this.gameData.board_image ||
        this.gameData.homeLogo ||
        this.gameData.home_logo ||
        this.heroBgUrl ||
        'https://footballsquare.netlify.app/assets/img/card.png'
      this.titleService.setTitle(`${boardName} | ${banner}`)
      this.metaService.updateTag({ name: 'description', content: description })
      this.metaService.updateTag({
        property: 'og:description',
        content: description,
      })
      this.metaService.updateTag({ property: 'og:image', content: ogImage })
      // --- End meta tags ---
    } catch (err) {
      console.error('Error loading game data:', err)
      this.error = 'Error loading game data'
    } finally {
      this.loading = false
    }
  }
}
