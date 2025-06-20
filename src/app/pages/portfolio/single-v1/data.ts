export type SingleDescriptionTypes = {
  content: string
  title: string
  id?: boolean
}

export type ResultCounterType = {
  number: string
  description: string
}

export type PortfolioCaseStudiesType = {
  title: string
  imageSrc: string
  backgroundColor: `#${string}`
  description: string
}
export const singleDescriptions: SingleDescriptionTypes[] = [
  {
    title: 'About the client',
    content:
      'Sit congue tellus urna phasellus sagittis interdum sed laoreet eget curabitur. Vel magna sit aliquet viverra morbi massa mattis urna, feugiat egestas tincidunt ipsum diam quam massa amet odio nisi duis dolor. Morbi et massa fames ac scelerisque sit commodo dignissim faucibus quisque proin lectus laoreet sem adipiscing sollicitudin erat massa tellus lorem enim aenean phasellus in hendrerit interdum lorem proin pretium dictum urna suspendisse quis risus et.',
    id: true,
  },
  {
    title: 'The challenge',
    content:
      'Sit diam nunc, et pellentesque ornare elit, ut. Interdum feugiat id ut egestas tellus congue faucibus habitant semper nunc et etiam ultrices id nisi urna amet, odio mauris risus nam aliquam pharetra amet nunc, enim aliquet egestas purus penatibus ac, elit ultricies proin adipiscing suspendisse sit proin.',
  },
  {
    title: 'The solution',
    content:
      'Est enim mollis morbi vulputate egestas commodo vitae quis sed sit ultrices nulla habitant sit faucibus orci. Eu etiam ipsum porttitor morbi urna eget aliquet aenean tristique amet tempus, vestibulum vel montes, pellentesque sit. Cursus nulla viverra elit accumsan, vitae. Phasellus sed hac at pharetra urna. Imperdiet egestas ac eget porttitor ultrices morbi ornare. Libero, lectus eget adipiscing odio ornare non maecenas non vitae libero, at feugiat urna, risus augue fringilla. Venenatis quam.',
  },
]

export const resultCounter: ResultCounterType[] = [
  {
    number: '1200+',
    description: 'leads for $2.1',
  },
  {
    number: '130%',
    description: 'revenue increase',
  },
  {
    number: '124+',
    description: 'new posts',
  },
]

export const portfolioCaseStudies: PortfolioCaseStudiesType[] = [
  {
    title: 'Development of an application for a national bank',
    imageSrc: 'assets/img/portfolio/list/06.png',
    backgroundColor: '#5bc0de',
    description:
      'Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed.',
  },
  {
    title: 'Landing page for a marketing agency Boost',
    imageSrc: 'assets/img/portfolio/list/08.png',
    backgroundColor: '#d9534f',
    description:
      'Sit congue tellus urna phasellus sagittis interdum sed laoreet eget curabitur vel magna sit aliquet viverra morbi massa mattis urna, feugiat egestas tincidunt.',
  },
  {
    title: 'Development of an application for a task tracker',
    imageSrc: 'assets/img/portfolio/list/09.png',
    backgroundColor: '#d7e4f4',
    description:
      'Egestas ultrices condimentum consectetur massa aliquam volutpat pulvinar aliquet nisi quam. Nibh commodo tristique nisi, justo, sed maecenas lectus ut nec.',
  },
]
