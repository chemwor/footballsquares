export type LandingType = {
  title: string
  imageLight: string
  imageDark: string
  link: string
  badge?: string
}

export type FeatureType = {
  title: string
  image: string
  description: string
}

export const landingDemo: LandingType[] = [
  {
    title: 'Mobile App Showcase',
    imageLight:
      'assets/img/landing/intro/landings/mobile-app-showcase-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/mobile-app-showcase-dark.jpg',
    link: 'landings/mobile-showcase',
  },
  {
    title: 'Product Landing',
    imageLight: 'assets/img/landing/intro/landings/product-landing-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/product-landing-dark.jpg',
    link: 'landings/product',
  },
  {
    title: 'SaaS v.1',
    imageLight: 'assets/img/landing/intro/landings/saas-v1-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/saas-v1-dark.jpg',
    link: 'landings/saas-1',
  },
  {
    title: 'SaaS v.2',
    imageLight: 'assets/img/landing/intro/landings/saas-v2-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/saas-v2-dark.jpg',
    link: 'landings/saas-2',
  },
  {
    title: 'SaaS v.3',
    imageLight: 'assets/img/landing/intro/landings/saas-v3-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/saas-v3-dark.jpg',
    link: 'landings/saas-3',
  },
  {
    title: 'SaaS v.4',
    imageLight: 'assets/img/landing/intro/landings/saas-v4-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/saas-v4-dark.jpg',
    link: 'landings/saas-4',
    badge: 'New',
  },
  {
    title: 'Shop Homepage v.1',
    imageLight: 'assets/img/landing/intro/landings/shop-homepage-v1-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/shop-homepage-v1-dark.jpg',
    link: 'landings/shop-1',
  },
  {
    title: 'Shop Homepage v.2',
    imageLight: 'assets/img/landing/intro/landings/shop-homepage-v2-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/shop-homepage-v2-dark.jpg',
    link: 'landings/shop-2',
    badge: 'New',
  },
  {
    title: 'Marketing Agency',
    imageLight: 'assets/img/landing/intro/landings/marketing-agency-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/marketing-agency-dark.jpg',
    link: 'landings/marketing-agency',
  },
  {
    title: 'Creative Agency',
    imageLight: 'assets/img/landing/intro/landings/creative-agency-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/creative-agency-dark.jpg',
    link: 'landings/creative-agency',
  },
  {
    title: 'Conference (Event)',
    imageLight: 'assets/img/landing/intro/landings/conference-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/conference-dark.jpg',
    link: 'landings/conference',
  },
  {
    title: 'Influencer',
    imageLight: 'assets/img/landing/intro/landings/influencer-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/influencer-dark.jpg',
    link: 'landings/influencer',
  },
  {
    title: 'Business Consulting',
    imageLight:
      'assets/img/landing/intro/landings/business-consulting-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/business-consulting-dark.jpg',
    link: 'landings/business-consulting',
  },
  {
    title: 'Corporate',
    imageLight: 'assets/img/landing/intro/landings/corporate-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/corporate-dark.jpg',
    link: 'landings/corporate',
  },
  {
    title: 'Insurance Company',
    imageLight: 'assets/img/landing/intro/landings/insurance-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/insurance-dark.jpg',
    link: 'landings/insurance',
    badge: 'New',
  },
  {
    title: 'Coworking Space',
    imageLight: 'assets/img/landing/intro/landings/coworking-space-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/coworking-space-dark.jpg',
    link: 'landings/coworking-space',
  },
  {
    title: 'Yoga Studio',
    imageLight: 'assets/img/landing/intro/landings/yoga-studio-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/yoga-studio-dark.jpg',
    link: 'landings/yoga-studio',
  },
  {
    title: 'Web Studio',
    imageLight: 'assets/img/landing/intro/landings/web-studio-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/web-studio-dark.jpg',
    link: 'landings/web-studio',
  },
  {
    title: 'Blog Homepage',
    imageLight: 'assets/img/landing/intro/landings/blog-homepage-light.jpg',
    imageDark: 'assets/img/landing/intro/landings/blog-homepage-dark.jpg',
    link: 'landings/blog',
  },
]

export const homeFeatures: FeatureType[] = [
  {
    title: 'Built with latest Bootstrap',
    image: 'assets/img/landing/intro/features/bootstrap.png',
    description:
      "Around is the powerful front-end solution for websites and web apps based on Bootstrap 5 - the world's most popular responsive, mobile-first front-end component library.",
  },
  {
    title: 'Easy to Customize with Sass',
    image: 'assets/img/landing/intro/features/sass.png',
    description:
      'Around is built using Sass. Easily change colors, typography and much more. It is the most mature, stable, and powerful CSS extension language in the world.',
  },
  {
    title: 'Kick-start your development',
    image: 'assets/img/landing/intro/features/npm.png',
    description:
      'Start your development process fast and easy with Npm scripts setup. Configuration files are included in the download package. Full tasks automation and local server hot reload.',
  },
  {
    title: 'Future-proof JavaScript',
    image: 'assets/img/landing/intro/features/js.png',
    description:
      "Around core scripts as well as all dependencies are written in vanilla JS. And now with Bootstrap 5 we finally don't need jQuery any more and we can use ES6 modules to structure the code.",
  },
  {
    title: 'W3C valid HTML code',
    image: 'assets/img/landing/intro/features/html5.png',
    description:
      'All HTML files are checked with W3C validator to ensure 100% valid code. As you probably know invalid HTML limits innovation, but Around is innovative at its core.',
  },
  {
    title: 'Premium Figma file included',
    image: 'assets/img/landing/intro/features/figma.png',
    description:
      "A well-crafted Figma design file is included in the download package. It offers a visually stunning and organized layout, utilizing Figma's components and styles.",
  },
  {
    title: 'Touch-enabled sliders',
    image: 'assets/img/landing/intro/features/touch.png',
    description:
      "In the era of touch screens it's important to ensure great user experience on handheld devices, when it comes to such frequently used interface component as slider.",
  },
  {
    title: 'Google fonts',
    image: 'assets/img/landing/intro/features/google-fonts.png',
    description:
      'Around uses Google font (Inter) which is free, fast to load and of very high quality. Currently Google fonts library includes 1400+ font families to choose from.',
  },
  {
    title: 'Vector based HD ready icons',
    image: 'assets/img/landing/intro/features/vector.png',
    description:
      'Around is equipped with font-based icon pack and SVG icons to ensure that infographics and interface icons look sharp on any device with any screen resolution and pixel density.',
  },
]
