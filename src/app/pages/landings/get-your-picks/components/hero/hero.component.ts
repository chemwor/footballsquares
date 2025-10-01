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

  constructor(private http: HttpClient) {}

  formSubmitted = false;
  validationMessage = '';

  // Only step 1 is used
  formData: Record<string, any> = {
    sport: '',
    match: '',
    boardSize: '10x10',
    boardName: ''
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

  submitForm() {
    this.formSubmitted = true;
    if (!this.formData['sport'] || !this.formData['match'] || !this.formData['boardSize'] || !this.formData['boardName']) {
      this.validationMessage = 'Please fill in all required fields.';
      return;
    }
    this.validationMessage = '';
    // Handle form submission logic here
    // e.g., send to backend or show confirmation


    const url = 'https://mybjjgameplan-7678d6be1c32.herokuapp.com/generate-game-plan';

    this.http.post(url, this.formData).subscribe({
      next: (res) => {
        console.log('Form submitted successfully', res);
        alert('✅ Your BJJ Gameplan request was submitted! Check your email.');
        // Optionally reset form or redirect


        // ✅ Trigger Google Ads conversion
        gtag('event', 'conversion', {
          send_to: 'AW-17007905582/JUHSCMvtlOIaEK6WgK4_'
        });
      },
      error: (err) => {
        console.error('❌ Error submitting form:', err);
        alert('⚠️ There was an issue submitting the form. Please try again later.');
      }
    });
  }

}
