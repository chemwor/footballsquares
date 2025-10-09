import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component';
import {
  NgbDateStruct,
  NgbDatepickerConfig,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import type { JarallaxOptions } from 'jarallax';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { supabase } from 'src/app/data-sources/supabase.client';


// ✅ Tell TypeScript about gtag
declare function gtag(command: string, eventName: string, params?: any): void;

@Component({
  selector: 'coworking-space-hero',
  standalone: true,
  imports: [JarallaxDirective, NgbDatepickerModule, FormsModule, CommonModule],
  templateUrl: './hero.component.html',
  styles: `
    .jarallax-img {
      background-size: cover;
    }
  `,
})
export class HeroComponent {
  model!: NgbDateStruct

  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }

  constructor(private http: HttpClient, private router: Router) {}

  formSubmitted = false;
  validationMessage = '';

  // Only step 1 is used
  formData: Record<string, any> = {
    sport: '',
    league: '',
    match: '',
    boardSize: '10x10',
    boardName: '',
    reverseSquares: false
  };

  sports: any[] = [];
  leagues: any[] = [];
  games: any[] = [];
  filteredLeagues: any[] = [];
  filteredGames: any[] = [];

  async ngOnInit() {
    // Get current user info from Supabase on component load (use getSession for reliability)
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('❌ Error fetching session:', sessionError);
    }
    console.log('Current Supabase session (on load):', session);
    console.log('Current Supabase user (on load):', session?.user);

    // Listen for auth state changes and log session/user when available
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(`[Supabase] Auth event: ${event}`);
      console.log('Session after event:', session);
      console.log('User after event:', session?.user);
    });

    // Fetch sports, leagues, and games
    const { data: sportsData, error: sportsError } = await supabase.from('sports').select();
    if (sportsError) {
      console.error('❌ Error fetching sports:', sportsError);
    }
    console.log('Fetched sports:', sportsData);
    this.sports = sportsData || [];
    if (!this.sports.length) {
      console.warn('⚠️ No sports found in the database.');
    }
    const { data: leaguesData, error: leaguesError } = await supabase.from('leagues').select();
    if (leaguesError) {
      console.error('❌ Error fetching leagues:', leaguesError);
    }
    this.leagues = leaguesData || [];
    const { data: gamesData, error: gamesError } = await supabase.from('v_scheduled_games_with_teams').select();
    if (gamesError) {
      console.error('❌ Error fetching games:', gamesError);
    }
    this.games = gamesData || [];
  }

  onSportChange(event: Event) {
    const sportId = (event.target as HTMLSelectElement).value;
    // Ensure both sides are strings for comparison
    this.filteredLeagues = this.leagues.filter(l => String(l.sport_id) === String(sportId));
    this.filteredGames = [];
    this.formData['league'] = '';
    this.formData['match'] = '';
    console.log('Selected sportId:', sportId);
    console.log('Filtered leagues:', this.filteredLeagues);
  }

  onLeagueChange(event: Event) {
    const leagueId = (event.target as HTMLSelectElement).value;
    this.filteredGames = this.games.filter(g => g.league_id == leagueId);
    this.formData['match'] = '';
  }

  async submitForm() {
    this.formSubmitted = true;
    if (!this.formData['sport'] || !this.formData['league'] || !this.formData['match'] || !this.formData['boardSize'] || !this.formData['boardName']) {
      this.validationMessage = 'Please fill in all required fields.';
      return;
    }
    this.validationMessage = '';

    // Get current user info from Supabase
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError) {
      console.error('❌ Error fetching user:', userError);
    }
    console.log('Current Supabase user:', user);

    const selectedGame = this.games.find(g => g.id == this.formData['match']);
    const boardSizeNumber = parseInt(this.formData['boardSize'], 10);

    // Find the league for the selected game to get the sport
    const selectedLeague = this.leagues.find(l => l.id == selectedGame?.league_id);
    const selectedSport = selectedLeague ? selectedLeague.sport_id : null;

    // Get the user's display name, fallback to email, then to 'Unknown User'
    const ownerName =
      user?.user_metadata?.['full_name'] ||
      user?.user_metadata?.['display_name'] ||
      user?.user_metadata?.['name'] ||
      user?.email ||
      'Unknown User';

    // Generate randomized axis numbers (0-9 shuffled)
    const generateRandomizedNumbers = (): number[] => {
      const numbers = Array.from({ length: 10 }, (_, i) => i);
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      return numbers;
    };

    const xAxisNumbers = generateRandomizedNumbers();
    const yAxisNumbers = generateRandomizedNumbers();

    const payload = {
      sport: selectedSport,
      league: selectedGame?.league_id || this.formData['league'],
      scheduled_game_id: selectedGame?.id || this.formData['match'],
      title: this.formData['boardName'],
      grid_size: boardSizeNumber,
      team1_name: selectedGame?.home_team_name || '',
      team2_name: selectedGame?.away_team_name || '',
      team1_logo_url: selectedGame?.home_team_logo || '',
      team2_logo_url: selectedGame?.away_team_logo || '',
      starts_at: selectedGame?.starts_at || null,
      external_match_id: selectedGame?.ext || null,
      status: 'open',
      owner_id: user?.id || null,
      owner_name: ownerName,
      reverse_squares: this.formData['reverseSquares'] || false,
      x_axis_numbers: xAxisNumbers,
      y_axis_numbers: yAxisNumbers,
      axes_randomized_at: new Date().toISOString(),
      random_seed: Math.random().toString(36).substring(2, 15),
    };

    try {
      // Create the game
      const { error, data } = await supabase.from('games').insert([payload]).select();
      if (error) {
        console.error('❌ Error creating game:', error);
        alert('⚠️ There was an issue creating the game. Please try again later.');
        return;
      }

      const newGame = data[0];
      const gameId = newGame.id;
      console.log('Game created successfully', newGame);

      // Track conversion
      gtag('event', 'conversion', {
        send_to: 'AW-17007905582/JUHSCMvtlOIaEK6WgK4_'
      });

      // Route to the admin page for the newly created game
      this.router.navigate(['/services/admin-game-page', gameId]);

    } catch (err) {
      console.error('❌ Unexpected error during game creation:', err);
      alert('⚠️ There was an unexpected issue creating the game. Please try again later.');
    }
  }
}
