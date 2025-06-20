import { SafeHtml } from '@angular/platform-browser'
import {
  analytics,
  comment,
  mode,
  notification,
  security,
  subTasks,
} from '@components/icons'

export type ToolsType = {
  name: string
  image: string
  description: string
}

export type Saas3FeatureType = {
  title: string
  description: string
  svg: any
  sanitizedIcon?: SafeHtml
}

export type SaasV3TestimonialType = {
  image_src: string
  name: string
  quote: string
}[][]

export type Saa3LayersType = {
  depth: number
  lightSrc: string
  darkSrc: string
}
export const tools: ToolsType[] = [
  {
    name: 'Google',
    image: 'assets/img/landing/saas-3/tools/google.svg',
    description:
      'Lorem magnis pretium sed curabitur nunc facilisi nunc cursus sagittis volutpat.',
  },
  {
    name: 'Zoom',
    image: 'assets/img/landing/saas-3/tools/zoom.svg',
    description:
      'In eget a mauris quis. Tortor dui tempus quis integer est sit natoque placerat dolor.',
  },
  {
    name: 'Slack',
    image: 'assets/img/landing/saas-3/tools/slack.svg',
    description:
      'Donec blandit nulla elementum eu. Est dui nibh eget amet curabitur nunc.',
  },
  {
    name: 'Gmail',
    image: 'assets/img/landing/saas-3/tools/gmail.svg',
    description:
      'Rutrum interdum tortor, sed at nulla. A cursus bibendum elit purus cras praesent.',
  },
  {
    name: 'Trello',
    image: 'assets/img/landing/saas-3/tools/trello.svg',
    description:
      'Congue pellentesque amet, viverra curabitur quam diam scelerisque fermentum urna.',
  },
  {
    name: 'Mailchimp',
    image: 'assets/img/landing/saas-3/tools/mailchimp.svg',
    description:
      'Turpis fermentum, volutpat ultrices sed ultrices proin risus bibendum elit purus.',
  },
  {
    name: 'Dropbox',
    image: 'assets/img/landing/saas-3/tools/dropbox.svg',
    description:
      'Ut in turpis consequat odio diam lectus elementum. Est faucibus blandit platea.',
  },
  {
    name: 'Evernote',
    image: 'assets/img/landing/saas-3/tools/evernote.svg',
    description:
      'Arcu, lorem facilisis nunc tellus, molestie urna nam mi, ullamcorper tempus quis.',
  },
]

export const saas3feature: Saas3FeatureType[] = [
  {
    title: 'Comments on tasks',
    description:
      'Id mollis consectetur congue egestas egestas suspendisse blandit in the justo eget maximus accumsan lorem ligula malesuada.',
    svg: comment,
  },
  {
    title: 'Tasks analytics',
    description:
      'Non imperdiet facilisis nulla tellus morbi scelerisque eget adipiscing out vulputate convallis justo sed tellus vehicula.',
    svg: analytics,
  },
  {
    title: 'Light / dark mode',
    description:
      'A elementum, imperdiet enim, pretium etiam facilisi in aenean quam inrean mauris ultrices interdum congue ut, dictum et tortor.',
    svg: mode,
  },
  {
    title: 'Notifications',
    description:
      'Diam, suspendisse velitcras ac. Lobortis diam volutpat, eget pellentesque viverra inter vivamus id porta fermentum turpis.',
    svg: notification,
  },
  {
    title: 'Sections & subtasks',
    description:
      'Mi feugiat hac id in. Sit elit placerat lacus nibh lorem ridiculus lectus porttitor tincidunt sapien luctus tristique quam aenean accumsan.',
    svg: subTasks,
  },
  {
    title: 'Data security',
    description:
      'Aliquam malesuada neque eget elit nulla vestibulum nunc cras. Neque, morbi non arcu sapien luctus ullamcorper lectus efficitur.',
    svg: security,
  },
]

export const saasv3Testimonial: SaasV3TestimonialType = [
  [
    {
      image_src: 'assets/img/avatar/44.jpg',
      name: 'Nadia Miles',
      quote:
        'Netus vel, amet placerat eget sit eleifend. Urna laoreet ultricies orci feugiat amet egestas semper praesent. Risus ut porttitor metus tortor quis eleifend.',
    },
    {
      image_src: 'assets/img/avatar/45.jpg',
      name: 'Eleanor Pena',
      quote:
        'Sit facilisis dolor arcu, fermentum vestibulum arcu elementum imperdiet. Mauris duis eleifend faucibus amet sagittis amet consequat aucibus cursus.',
    },
    {
      image_src: 'assets/img/avatar/46.jpg',
      name: 'Ralph Edwards',
      quote:
        'Morbi ut aliquam etiam luctus feugiat ultrices. Amet pellentesque sagittis, consequat id egestas tristique turpis. Arcu odio ultricies blandit eu neque.',
    },
  ],
  [
    {
      image_src: 'assets/img/avatar/47.jpg',
      name: 'Albert Flores',
      quote:
        'Sit facilisis dolor arcu, fermentum vestibulum arcu elementum imperdiet. Mauris duis eleifend faucibus amet sagittis amet consequat aucibus cursus.',
    },
    {
      image_src: 'assets/img/avatar/48.jpg',
      name: 'Jenny Wilson',
      quote:
        'Morbi ut aliquam etiam luctus feugiat ultrices. Amet pellentesque sagittis, consequat id egestas tristique turpis. Arcu odio ultricies blandit eu neque.',
    },
    {
      image_src: 'assets/img/avatar/49.jpg',
      name: 'Esther Howard',
      quote:
        'Netus vel, amet placerat eget sit eleifend. Urna laoreet ultricies orci feugiat amet egestas semper praesent. Risus ut porttitor metus tortor quis eleifend.',
    },
  ],
]

export const saas3Layer: Saa3LayersType[] = [
  {
    depth: 0.1,
    lightSrc: 'assets/img/landing/saas-3/hero/01-light.png',
    darkSrc: 'assets/img/landing/saas-3/hero/01-dark.png',
  },
  {
    depth: 0.25,
    lightSrc: 'assets/img/landing/saas-3/hero/02-light.png',
    darkSrc: 'assets/img/landing/saas-3/hero/02-dark.png',
  },
  {
    depth: 0.35,
    lightSrc: 'assets/img/landing/saas-3/hero/03-light.png',
    darkSrc: 'assets/img/landing/saas-3/hero/03-dark.png',
  },
  {
    depth: 0.45,
    lightSrc: 'assets/img/landing/saas-3/hero/04-light.png',
    darkSrc: 'assets/img/landing/saas-3/hero/04-dark.png',
  },
]
