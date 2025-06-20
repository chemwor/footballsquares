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

  currentStep = 1;
  totalSteps = 3;

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
    email: ''
  };


  bodyTypes: string[] = ['Tall', 'Short', 'Compact', 'Lean', 'Strong', 'Flexible', 'Heavyset', 'Muscular'];
  goals : string[] = ['Hobbyist', 'Competing Soon', 'Long-Term Competitor', 'Self-Defense', 'MMA Crossover', 'Fitness'];
  performanceStrengths: string[]  = ['Strength', 'Agility', 'Cardio', 'Flexibility', 'Speed', 'Fight IQ', 'Pressure', 'Precision', 'Wrestling Base'];
  experiences: string[]  = ['None', 'Wrestling', 'Judo', 'MMA / Striking', 'Yoga', 'General Gym', 'CrossFit', 'Other'];

  nextStep() {
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

}
