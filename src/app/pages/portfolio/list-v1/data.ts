export type PortfolioType = {
  id: number
  image: string
  description: string
  category: string
  title: string
}

export const portfolioList: PortfolioType[] = [
  {
    id: 1,
    image: 'assets/img/portfolio/list/01.jpg',
    category: 'Branding, Strategy',
    title: 'Design for eco bags and merch',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus. Morbi et massa fames ac scelerisque sit commodo dignissim vel.',
  },
  {
    id: 2,
    image: 'assets/img/portfolio/list/02.jpg',
    category: 'Branding',
    title: 'Handmade tableware company',
    description:
      'Feugiat elit tempor, malesuada rutrum amet quis duis facilisi viverra. Quam ut in gravida dignissim eget mauris pretium facilisi dui varius amet et quam massa auctor odio.',
  },
  {
    id: 3,
    image: 'assets/img/portfolio/list/03.jpg',
    category: 'Identity, Packaging',
    title: 'Bottle for French perfume brand',
    description:
      'Egestas ultrices condimentum consectetur massa aliquam volutpat pulvinar aliquet nisi quam. Nibh commodo tristique nisi, justo, sed maecenas lectus ut nec eu.',
  },
  {
    id: 4,
    image: 'assets/img/portfolio/list/04.jpg',
    category: 'E-book, Branding',
    title: 'Book cover design Twin Fish',
    description:
      'Sed feugiat tristique enim aenean netus cum adipiscing est sem eget nulla leo vestibulum. Cras urna, proin ut ut dictum risus porttitor nulla consequat et iaculis.',
  },
  {
    id: 5,
    image: 'assets/img/portfolio/list/05.jpg',
    category: 'Branding, Strategy',
    title: 'Business cards and identity for Sen Jonson',
    description:
      'Lectus lacus, ac justo, ullamcorper egestas at felis arcu arcu venenatis praesent odio. Odio vulputate purus placerat ultrices faucibus sem sed magna est elementum.',
  },
]
