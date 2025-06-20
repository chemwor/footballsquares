export type CategorySlideType = {
  category: string
  description: string
  image_src: string
}

export type TestimonialType = {
  name: string
  description: string
  image_light_src: string
  image_dark_src?: string
  avatar_src?: string
  author_name: string
  author_role: string
}

export type PricingSaasType = {
  title: string
  included: string
  includeDesc?: string
  building: string
  timing: string
}

export type ParallaxType = {
  image: string
  dark_mode_image: string
  style: {
    paddingRight?: string
    depth: String
    paddingLeft?: string
  }
}

export const categotySlides: CategorySlideType[] = [
  {
    category: 'E-commerce',
    description: 'Order processing, price suggestions, user research',
    image_src: 'assets/img/landing/saas-4/categories/ecommerce.jpg',
  },
  {
    category: 'Transportation',
    description: 'Itinerary planning, freight pricing calculations, etc.',
    image_src: 'assets/img/landing/saas-4/categories/transportation.jpg',
  },
  {
    category: 'Marketing',
    description: 'Market research, data visualization, user testing',
    image_src: 'assets/img/landing/saas-4/categories/marketing.jpg',
  },
  {
    category: 'Robotics',
    description: 'Enhancing robot learning, improve robotic precision',
    image_src: 'assets/img/landing/saas-4/categories/robotics.jpg',
  },
  {
    category: 'Programming',
    description: 'Code generation, code debugging and optimization',
    image_src: 'assets/img/landing/saas-4/categories/programming.jpg',
  },
]

export const testimonialIntegration: TestimonialType[] = [
  {
    name: 'Envato',
    description:
      "Streamline your workflow and save valuable time with this SaaS platform's powerful AI models, which takes care of the heavy lifting and delivers top-notch results.",
    image_light_src: 'assets/img/landing/saas-4/integrations/envato-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/envato-dark.svg',
    avatar_src: 'assets/img/avatar/50.jpg',
    author_name: 'Emma Johnson',
    author_role: 'CEO, Co-Founder',
  },
  {
    name: 'Firefox',
    description:
      "Transform your business with this SaaS platform's outstanding AI models API, which delivers unparalleled efficiency, great service, and outstanding results.",
    image_light_src: 'assets/img/landing/saas-4/integrations/firefox-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/firefox-dark.svg',
    author_name: 'Robert Thompson',
    author_role: 'Chief Information Officer',
  },
  {
    name: 'Magento',
    description:
      "Differentiate your app from the competition with this SaaS platform's outstanding performance and exceptional API for implementing AI models into your application.",
    image_light_src: 'assets/img/landing/saas-4/integrations/magento-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/magento-dark.svg',
    avatar_src: 'assets/img/avatar/51.jpg',
    author_name: 'Christopher Davis',
    author_role: 'Network Administrator',
  },
  {
    name: 'Pingdom',
    description:
      'Experience game-changing AI models that are accessible and user-friendly, thanks to this exceptional SaaS platform that offers an API for seamless integration.',
    image_light_src: 'assets/img/landing/saas-4/integrations/pingdom-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/pingdom-dark.svg',
    avatar_src: 'assets/img/avatar/52.jpg',
    author_name: 'Samantha Grace',
    author_role: 'Data Analyst',
  },
  {
    name: 'WooCommerce',
    description:
      'This SaaS platform offers an API for integrating AI models into your app with ease, delivering impressive results and enabling you to take your business to the next level.',
    image_light_src:
      'assets/img/landing/saas-4/integrations/woocommerce-light.svg',
    image_dark_src:
      'assets/img/landing/saas-4/integrations/woocommerce-dark.svg',
    author_name: 'William Matthews',
    author_role: 'Software Developer',
  },
  {
    name: 'Shopify',
    description:
      "Get ahead of the competition with this SaaS platform's AI models API, which effortlessly automates processes and delivers exceptional service to ensure your success.",
    image_light_src: 'assets/img/landing/saas-4/integrations/shopify-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/shopify-dark.svg',
    author_name: 'Olivia Rodriguez',
    author_role: 'Human Resources',
  },
  {
    name: 'Laravel',
    description:
      "Implementing AI models has never been easier or more reliable, thanks to this SaaS platform's seamless API integration and accurate, dependable results.",
    image_light_src: 'assets/img/landing/saas-4/integrations/laravel.svg',
    author_name: 'Benjamin Smith',
    author_role: 'Project Manager',
  },
  {
    name: 'Vite',
    description:
      "Stay ahead of the curve and leverage cutting-edge technology with this SaaS platform's unparalleled performance and impressive results.",
    image_light_src: 'assets/img/landing/saas-4/integrations/vite-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/vite-dark.svg',
    author_name: 'Abigail Collins',
    author_role: 'Chief Technology Officer',
  },
  {
    name: 'Angular',
    description:
      'Efficiently harness the power of AI models with this reliable and easy-to-use SaaS platform, featuring an API that provides excellent support and streamlines your processes.',
    image_light_src: 'assets/img/landing/saas-4/integrations/angular-light.svg',
    image_dark_src: 'assets/img/landing/saas-4/integrations/angular-dark.svg',
    author_name: 'Elijah Brown',
    author_role: 'Project Manager',
  },
]

export const pricingSaas: PricingSaasType[] = [
  {
    title: 'Data Models Infrastructure Cost',
    included: 'Included',
    includeDesc: 'Cloud hosted AI/ML capacities',
    building: 'From $10k to $50k',
    timing: 'per month',
  },
  {
    title: 'Engineering Cost',
    included: 'Included',
    includeDesc: 'with our premium plans',
    building: 'From $25k to $30k',
    timing: 'per engineer per month',
  },
  {
    title: 'Time to Implement',
    included: 'Get started in minutes',
    building: 'Average 6-9 months',
    timing: 'depends on team qualification',
  },
  {
    title: 'Maintenance & Operational Cost',
    included: 'Included',
    includeDesc: 'with our premium plans',
    building: 'Average $20k',
    timing: 'per engineer per month',
  },
]

export const parallaxLayers: ParallaxType[] = [
  {
    image:
      'assets/img/landing/saas-4/use-cases/data-analysis/line-chart-light.png',
    dark_mode_image:
      'assets/img/landing/saas-4/use-cases/data-analysis/line-chart-dark.png',
    style: {
      paddingRight: '24.2%',
      depth: '0.1',
    },
  },
  {
    image:
      'assets/img/landing/saas-4/use-cases/data-analysis/bar-chart-light.png',
    dark_mode_image:
      'assets/img/landing/saas-4/use-cases/data-analysis/bar-chart-dark.png',
    style: {
      paddingLeft: '45.75%',
      depth: '-0.12',
    },
  },
  {
    image:
      'assets/img/landing/saas-4/use-cases/data-analysis/donut-chart-light.png',
    dark_mode_image:
      'assets/img/landing/saas-4/use-cases/data-analysis/donut-chart-dark.png',
    style: {
      paddingRight: '7.547%',
      paddingLeft: '44.97%',
      depth: '0.3',
    },
  },
]
