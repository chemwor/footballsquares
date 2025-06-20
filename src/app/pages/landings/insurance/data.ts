import { SafeHtml } from '@angular/platform-browser'
import {
  bundleSave,
  consistencyTrsut,
  insuranceSolution,
} from '@components/icons'

export type InsuranceCategoryType = {
  title: string
  description: string
  icon: string
  sanitizedIcon?: SafeHtml
}

export type PartenerType = {
  name: string
  lightModeSrc: string
  darkModeSrc?: string | null
}

export const insuranceCategory: InsuranceCategoryType[] = [
  {
    title: 'One-stop insurance solution',
    description:
      'Gaining access to a comprehensive suite of insurance products, it saves you time and effort by managing all your insurance needs under one roof.',
    icon: insuranceSolution,
  },
  {
    title: 'Bundle and Save',
    description:
      'We offer attractive discounts and benefits when you bundle multiple insurance lines with us. Enjoy cost savings while ensuring comprehensive coverage for your well-being, your vehicle, and your adventures.',
    icon: bundleSave,
  },
  {
    title: 'Consistency and Trust',
    description:
      'We have a proven track record of financial stability and commitment to customer satisfaction. Our experience and expertise ensure that you receive reliable coverage and support.',
    icon: consistencyTrsut,
  },
]

export const partnerData: PartenerType[] = [
  {
    name: 'Deloitte',
    lightModeSrc: 'assets/img/landing/insurance/partners/deloitte-light.svg',
    darkModeSrc: 'assets/img/landing/insurance/partners/deloitte-dark.svg',
  },
  {
    name: 'Airbnb',
    lightModeSrc: 'assets/img/landing/insurance/partners/airbnb.svg',
    darkModeSrc: null,
  },
  {
    name: 'Champion',
    lightModeSrc: 'assets/img/landing/insurance/partners/champion-light.svg',
    darkModeSrc: 'assets/img/landing/insurance/partners/champion-dark.svg',
  },
  {
    name: 'Financial Times',
    lightModeSrc: 'assets/img/landing/insurance/partners/times-light.svg',
    darkModeSrc: 'assets/img/landing/insurance/partners/times-dark.svg',
  },
  {
    name: 'Clutch',
    lightModeSrc: 'assets/img/landing/insurance/partners/clutch-light.svg',
    darkModeSrc: 'assets/img/landing/insurance/partners/clutch-dark.svg',
  },
]
