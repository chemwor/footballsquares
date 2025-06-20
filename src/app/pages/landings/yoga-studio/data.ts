import { SafeHtml } from '@angular/platform-browser'
import {
  pricingLession,
  pricingSubscription,
  pricingValid,
} from '@components/icons'

export type AdvantagesType = {
  title: string
  image: string
  icon_class?: string
  description: string
  button_text?: string
}

export type TrainersType = {
  name: string
  image: string
  specialization: string
}

export type YogaPricingType = {
  title: string
  description: string
  price: string
  price_per_class: string
}

export type InstagramYogaType = {
  col_span: number
  image_src: string
}

export type PricingYogaType = {
  icon: any
  text: string
  sanitizedIcon?: SafeHtml
}

export type CalendarType = {
  title: string
  start: string
  end: string
  classNames: string[]
}
export const advantages: AdvantagesType[] = [
  {
    title: 'Spa area',
    image: 'assets/img/landing/yoga-studio/features/spa-area.jpg',
    icon_class: 'ai-spa',
    description:
      'Orci purus, in tellus sit bibendum scelerisque adipiscing venenatis.',
  },
  {
    title: 'Changing room',
    image: 'assets/img/landing/yoga-studio/features/changing-room.jpg',
    icon_class: 'ai-towel',
    description:
      'Non est nullam amet netus ut vitae, penatibus lacus a ut sed molestie lectus lobortis.',
  },
  {
    title: 'Free lessons',
    image: 'assets/img/landing/yoga-studio/features/free-lessons.jpg',
    icon_class: 'ai-flower',
    description:
      'Nisi vestibulum quam amet, egestas aliquam cursus mauris dignissim tellus.',
  },
  {
    title: 'Lounge cafe',
    image: 'assets/img/landing/yoga-studio/features/lounge-cafe.jpg',
    icon_class: 'ai-cafe',
    description:
      'Amet diam imperdiet nisi non eu, pharetra lorem amet, ac ut aliquam diam sed cras.',
  },
  {
    title: 'Bright halls',
    image: 'assets/img/landing/yoga-studio/features/bright-halls.jpg',
    icon_class: 'ai-sofa',
    description:
      'Non est nullam amet netus ut vitae, penatibus lacus a ut sed molestie lectus lobortis.',
  },
  {
    title: 'Free rugs',
    image: 'assets/img/landing/yoga-studio/features/free-rugs.jpg',
    icon_class: 'ai-rug',
    description:
      'Amet diam imperdiet nisi non eu, pharetra lorem amet, ac ut aliquam diam sed cras.',
  },
  {
    title: 'Get started a free trial',
    image: 'assets/img/landing/yoga-studio/features/flower.svg',
    description:
      'The best yoga practices, adapted at a high level to the needs of the modern pace of life.',
    button_text: 'Try a free lesson',
  },
]

export const trainers: TrainersType[] = [
  {
    name: 'Alisa Black',
    image: 'assets/img/landing/yoga-studio/trainers/01.jpg',
    specialization: 'Fly-yoga trainer',
  },
  {
    name: 'Michelle Yang',
    image: 'assets/img/landing/yoga-studio/trainers/02.jpg',
    specialization: 'Fly-yoga and relax trainer',
  },
  {
    name: 'Robert Fox',
    image: 'assets/img/landing/yoga-studio/trainers/03.jpg',
    specialization: 'Stretching trainer',
  },
  {
    name: 'Jane Cooper',
    image: 'assets/img/landing/yoga-studio/trainers/04.jpg',
    specialization: 'Fly-yoga trainer',
  },
  {
    name: 'Cody Fisher',
    image: 'assets/img/landing/yoga-studio/trainers/05.jpg',
    specialization: 'Fly-yoga and relax trainer',
  },
  {
    name: 'Jenny Wilson',
    image: 'assets/img/landing/yoga-studio/trainers/06.jpg',
    specialization: "Women's practices",
  },
  {
    name: 'Annette Black',
    image: 'assets/img/landing/yoga-studio/trainers/07.jpg',
    specialization: 'Fly-yoga trainer',
  },
  {
    name: 'Ralph Edwards',
    image: 'assets/img/landing/yoga-studio/trainers/08.jpg',
    specialization: 'Stretching trainer, healthy back',
  },
]

export const yogaPricing: YogaPricingType[] = [
  {
    title: '4 lessons',
    description: 'Valid for all types of classes',
    price: '40',
    price_per_class: '10 per class',
  },
  {
    title: '8 lessons',
    description: 'Valid for all types of classes',
    price: '72',
    price_per_class: '9 per class',
  },
  {
    title: '16 lessons',
    description: 'Valid for all types of classes',
    price: '120',
    price_per_class: '7 per class',
  },
  {
    title: 'Yoga for pregnant',
    description: 'Valid for all types of classes',
    price: '12',
    price_per_class: 'per class',
  },
]

export const instagramYoga: InstagramYogaType[] = [
  {
    col_span: 5,
    image_src: 'assets/img/landing/yoga-studio/instagram/01.jpg',
  },
  {
    col_span: 7,
    image_src: 'assets/img/landing/yoga-studio/instagram/02.jpg',
  },
  {
    col_span: 7,
    image_src: 'assets/img/landing/yoga-studio/instagram/04.jpg',
  },
  {
    col_span: 5,
    image_src: 'assets/img/landing/yoga-studio/instagram/05.jpg',
  },
]

export const pricingYoga: PricingYogaType[] = [
  {
    icon: pricingLession,
    text: 'lesson duration 90 minutes',
  },
  {
    icon: pricingSubscription,
    text: 'subscription valid for 30 days',
  },
  {
    icon: pricingValid,
    text: 'valid for all types of classes',
  },
]

export const calendarEventData: CalendarType[] = [
  {
    title: 'Stretching',
    start: '2022-08-01T16:30',
    end: '2022-08-01T18:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-purple',
    ],
  },
  {
    title: 'For pregnant',
    start: '2022-08-02T07:30',
    end: '2022-08-02T09:40',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-warning',
    ],
  },
  {
    title: 'Healthy back',
    start: '2022-08-02T12:00',
    end: '2022-08-02T13:30',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-info',
    ],
  },
  {
    title: 'Relax yoga',
    start: '2022-08-02T18:45',
    end: '2022-08-02T20:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-danger',
    ],
  },
  {
    title: 'Beginners',
    start: '2022-08-03T11:00',
    end: '2022-08-03T13:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-success',
    ],
  },
  {
    title: 'Relax yoga',
    start: '2022-08-03T12:35',
    end: '2022-08-03T14:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-danger',
    ],
  },
  {
    title: 'Fly yoga',
    start: '2022-08-04T09:00',
    end: '2022-08-04T11:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-primary',
    ],
  },
  {
    title: 'For pregnant',
    start: '2022-08-05T07:30',
    end: '2022-08-05T09:40',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-warning',
    ],
  },
  {
    title: 'Beginners',
    start: '2022-08-08T11:00',
    end: '2022-08-03T13:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-success',
    ],
  },
  {
    title: 'Relax yoga',
    start: '2022-08-08T12:35',
    end: '2022-08-03T14:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-danger',
    ],
  },
  {
    title: 'For pregnant',
    start: '2022-08-09T07:30',
    end: '2022-08-09T09:40',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-warning',
    ],
  },
  {
    title: 'Fly yoga',
    start: '2022-08-10T09:00',
    end: '2022-08-10T11:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-primary',
    ],
  },
  {
    title: 'Stretching',
    start: '2022-08-11T16:30',
    end: '2022-08-11T18:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-purple',
    ],
  },
  {
    title: 'Healthy back',
    start: '2022-08-11T12:00',
    end: '2022-08-11T13:30',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-info',
    ],
  },
  {
    title: 'Relax yoga',
    start: '2022-08-12T12:35',
    end: '2022-08-12T14:00',
    classNames: [
      'event-custom-style',
      'bg-light',
      'text-nav',
      'border-0',
      'rounded-1',
      'p-2',
      'ps-3',
      'border-start',
      'border-5',
      'border-danger',
    ],
  },
]
