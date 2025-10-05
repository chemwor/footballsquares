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
    match: '',
    boardSize: '10x10',
    boardName: '',
    reverseSquares: false
  };

  sports: string[] = ['Football', 'Basketball', 'Baseball', 'Soccer', 'Hockey', 'Other'];
  matches: string[] = [];

  // Example matches for each sport
  private matchOptions: Record<string, string[]> = {
    Football: ['Falcons vs Eagles', 'Patriots vs Giants', 'Packers vs Bears'],
    Basketball: ['Lakers vs Celtics', 'Warriors vs Bulls', 'Heat vs Knicks'],
    Baseball: ['Yankees vs Red Sox', 'Dodgers vs Cubs', 'Giants vs Cardinals'],
    Soccer: ['Barcelona vs Real Madrid', 'Man United vs Liverpool', 'PSG vs Bayern'],
    Hockey: ['Maple Leafs vs Canadiens', 'Rangers vs Bruins', 'Blackhawks vs Red Wings'],
    Other: ['Custom Match']
  };

  onSportChange(event: Event) {
    const sport = (event.target as HTMLSelectElement).value;
    this.matches = this.matchOptions[sport] || [];
    this.formData['match'] = '';
  }

  async submitForm() {
    this.formSubmitted = true;
    if (!this.formData['sport'] || !this.formData['match'] || !this.formData['boardSize'] || !this.formData['boardName']) {
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

    // Map form fields to Supabase games table columns
    const [team1, team2] = this.formData['match'].split(' vs ');
    const boardSizeNumber = parseInt(this.formData['boardSize'], 10);

    // Get the user's display name, fallback to email, then to 'Unknown User'
    const ownerName =
      user?.user_metadata?.['full_name'] ||
      user?.user_metadata?.['display_name'] ||
      user?.user_metadata?.['name'] ||
      user?.email ||
      'Unknown User'

    const payload = {
      sport: this.formData['sport'],
      title: this.formData['boardName'],
      grid_size: boardSizeNumber,
      team1_name: team1 || '',
      team2_name: team2 || '',
      status: 'open',
      owner_id: user?.id || null,
      owner_name: ownerName,
      reverse_squares: this.formData['reverseSquares'] || false,
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

      // Seed the squares for the newly created game
      // const { error: seedError } = await supabase.rpc('seed_squares', {
      //   p_game_id: gameId,
      //   p_size: boardSizeNumber
      // });
      //
      // if (seedError) {
      //   console.error('❌ Error seeding squares:', seedError);
      //   alert('⚠️ Game created but there was an issue setting up the board. Please contact support.');
      //   return;
      // }
      //
      // console.log(`✅ Squares seeded successfully for game ${gameId} with board size ${boardSizeNumber}`);

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
  }

}
