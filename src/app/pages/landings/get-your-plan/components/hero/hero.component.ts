import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import {
  NgbDateStruct,
  NgbDatepickerConfig,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap'
import type { JarallaxOptions } from 'jarallax'
import { CommonModule } from '@angular/common'
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

  currentStep = 1;
  totalSteps = 6;
  formSubmitted = false;
  showInjuriesField = false;


  formData: {
    [key: string]: any;
    beltLevel: string;
    position: string;
    bodyTypes: string[];
    primaryGoals: string[];
    giNogi: string;
    weeklyTraining: string;
    performanceStrengths: string[];
    experiences: string[];
    injuries: string;
    name: string;
    email: string;
    referalCode?: string;
  } = {
    beltLevel: '',
    position: '',
    bodyTypes: [],
    primaryGoals: [],
    giNogi: '',
    weeklyTraining: '',
    performanceStrengths: [],
    experiences: [],
    injuries: '',
    name: '',
    email: '',
    referalCode: ''
  };



  bodyTypes: string[] = [
    'Tall',
    'Short',
    'Lean',
    'Heavyset',
    'Muscular'
  ];  goals: string[] = [
    'Hobbyist',
    'Competing Soon',
    'Long-Term Competitor',
    'Self-Defense',
    'MMA Transition',
    'Stay Fit & Healthy'
  ];  performanceStrengths: string[] = [
    'Power',
    'Agility',
    'Cardio Endurance',
    'Flexibility',
    'Speed',
    'Fight IQ',
    'Pressure Control',
    'Precision Timing'
  ];  experiences: string[] = [
    'None',
    'Wrestling',
    'Judo',
    'Striking (Boxing, Muay Thai, etc.)',
    'Yoga / Mobility Training',
    'Gym & Weight Training',
    'CrossFit / HIIT'
  ];  validationMessage = '';


  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.formData.beltLevel !== '' &&
          this.formData.position !== '';
      case 2:
        return this.formData.bodyTypes.length > 0 &&
          this.formData.primaryGoals.length > 0;
      case 3:
        return this.formData.giNogi !== '' &&
          this.formData.weeklyTraining !== '';
      case 4:
        return this.formData.performanceStrengths.length > 0 &&
          this.formData.experiences.length > 0;
      case 5:
        // ✅ Injuries are optional, just return true
        return true;
      case 6:
        return this.formData.name.trim() !== '' &&
          this.formData.email.trim() !== '';
      default:
        return true;
    }
  }



  onToggleInjury(show: boolean) {
    this.showInjuriesField = show;
    if (!show) {
      this.formData.injuries = '';
    }
  }



  getValidationError(): string {
    switch (this.currentStep) {
      case 1:
        if (!this.formData.beltLevel) return 'Please select your belt level.';
        if (!this.formData.position) return 'Please select your preferred position.';
        break;
      case 2:
        if (!this.formData.bodyTypes.length) return 'Please select at least one body type.';
        if (!this.formData.primaryGoals.length) return 'Please select at least one primary goal.';
        break;
      case 3:
        if (!this.formData.giNogi) return 'Please select your Gi / No-Gi preference.';
        if (!this.formData.weeklyTraining) return 'Please select your weekly training frequency.';
        break;
      case 4:
        if (!this.formData.performanceStrengths.length) return 'Please select at least one performance strength.';
        if (!this.formData.experiences.length) return 'Please select at least one prior experience.';
        break;
      case 6:
        if (!this.formData.name.trim()) return 'Please enter your name.';
        if (!this.formData.email.trim()) return 'Please enter your email address.';
        break;
    }
    return '';
  }




  nextStep() {
    this.validationMessage = '';

    if (!this.isCurrentStepValid()) {
      this.validationMessage = this.getValidationError();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onCheckboxChange(event: any, field: string) {
    const value = event.target.value;
    const checked = event.target.checked;
    const fieldArray = this.formData[field];

    if (checked) {
      if (!fieldArray.includes(value)) {
        fieldArray.push(value);
      }
    } else {
      const index = fieldArray.indexOf(value);
      if (index >= 0) {
        fieldArray.splice(index, 1);
      }
    }
  }


  submitForm() {
    this.formSubmitted = true;
    this.validationMessage = '';

    if (!this.isCurrentStepValid()) {
      this.validationMessage = this.getValidationError();
      return;
    }

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
