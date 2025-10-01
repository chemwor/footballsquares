export type mobileFaqsType = {
  question: string
  answer: string
}

export type FeatureSwiperType = {
  id: string
  text: string
  title: string
  content: string
}
export const mobileShowCaseFaq: mobileFaqsType[] = [
  {
    question: 'Does this platform handle payments for squares?',
    answer:
      'No. Our tool is for managing boards only. Hosts set their own rules and handle any arrangements directly with their players.',
  },
  {
    question: ' Can players join from their phone?',
    answer:
      'Yes. Our boards are fully mobile-friendly, so players can claim squares and get updates right from their phone.',
  },
  {
    question: 'What sports are supported?',
    answer:
      'You can create boards for football, basketball, and more, with new sports being added as the platform grows.',
  },
  {
    question: 'How are winners decided?',
    answer:
      'At the end of each game, our system highlights the winning squares automatically and sends out an email announcement to all players.',
  },
  {
    question: 'Do I need a subscription to host a board?',
    answer:
      'Players can join for free, but hosting boards requires a paid membership. We offer two flexible plans to fit your needs.',
  },
  {
    question: 'Can I run more than one board at a time?',
    answer:
      'Absolutely. Both Standard and Premium plans include unlimited boards, so you can run as many games as you like.',
  },
];


export const featureSwiper: FeatureSwiperType[] = [
  {
    id: 'image1',
    text: '01',
    title: 'Buy the Drop',
    content:
      'Each week, a new PDF of algorithmically generated picks goes live. You pay once and get instant access to the week’s file.',
  },
  {
    id: 'image2',
    text: '02',
    title: 'Open the File',
    content:
      'No distractions. Just picks. Every matchup includes a recommendation, confidence rating, and brief note—ready to act on.',
  },
  {
    id: 'image2',
    text: '02',
    title: 'Open the File',
    content:
      'No distractions. Just picks. Every matchup includes a recommendation, confidence rating, and brief note—ready to act on.',
  },
  {
    id: 'image3',
    text: '03',
    title: 'Place the Bets',
    content:
      'Use the output to build your slip. Bet with an edge sharpened by stats, trends, and cold logic—not guesswork.',
  },
]
