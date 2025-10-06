import { Component, OnInit } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './component/hero/hero.component'
import { FooterComponent } from './component/footer/footer.component'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'
import { RouterModule, ActivatedRoute } from '@angular/router'
import { BoardComponent } from '@components/board/board.component'
import { GameActionsComponent } from '@components/game-actions/game-actions.component'
import { QuarterWinnersComponent } from '@components/quarter-winners/quarter-winners.component'
import { UserSquaresComponent } from '@components/user-squares/user-squares.component'
import { supabase } from 'src/app/data-sources/supabase.client'

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
    QuarterWinnersComponent,
    UserSquaresComponent,
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

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    // Get game ID from route parameters
    this.gameId = this.route.snapshot.paramMap.get('id')
    console.log('Player Game ID from route:', this.gameId)

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
    } catch (err) {
      console.error('Unexpected error loading game:', err)
      this.error = 'Unexpected error occurred'
    } finally {
      this.loading = false
    }
  }
}
