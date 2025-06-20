import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'saas1-industries',
  standalone: true,
  imports: [NgbNavModule, CommonModule],
  templateUrl: './industries.component.html',
})
export class IndustriesComponent {
  activeTab: string = 'Marketers'

  tabs = [
    {
      name: 'Marketers',
      imageSrc: 'assets/img/landing/saas-1/industries/01.png',
      bgColor: 'bg-primary',
      title: 'Track user journey from first interaction to conversion.',
      description:
        'Porttitor in mauris tellus ipsum commodo praesent nunc vel integer mi at tristique id faucibus pretium vestibulum massa nisl at massa sagittis congue ac uismod tortor dictum enim tincidunt gravida odio. Auctor arcu ante malesuada pharetra gravida nunc euismod egestas quam dolor ut vel venenatis quis egestas orci.',
    },
    {
      name: 'Agencies',
      imageSrc: 'assets/img/landing/saas-1/industries/02.png',
      bgColor: 'bg-info',
      title: 'Analyze your marketing activities quickly and efficiently.',
      description: `Phasellus sed orci, praesent sed integer egestas imperdiet morbi vitae vel diam risus in sed elit semper est malesuada venenatis egestas diam consequat sit scelerisque integer sit nisl nunc.`,
    },
    {
      name: 'E-Commerce',
      imageSrc: 'assets/img/landing/saas-1/industries/03.png',
      bgColor: 'bg-warning',
      title:
        "Track the user's path to the order on all product interaction paths.",
      description: `Sollicitudin et donec tincidunt arcu cras felis ipsum dolor sollicitudin. Nec purus, lobortis tristique pellentesque venenatis. Varius nulla quis morbi lectus sit dui viverra mi. Amet in diam vitae non at euismod massa orci at dis libero facilisi lacus morbi. Magna vitae ac condimentum enim vitae cras egestas elementum.`,
    },
    {
      name: 'Startups',
      imageSrc: 'assets/img/landing/saas-1/industries/04.png',
      bgColor: 'bg-danger',
      title: 'Track fast growth with important data.',
      description: `Porttitor in mauris tellus ipsum commodo praesent nunc vel integer mi at tristique id faucibus pretium vestibulum massa nisl at massa sagittis congue ac uismod tortor dictum enim tincidunt gravida odio. Auctor arcu ante malesuada pharetra gravida nunc euismod egestas quam dolor ut vel venenatis quis egestas orci.`,
    },
  ]
}
