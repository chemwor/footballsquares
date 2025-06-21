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
    question: 'What do I actually get when I purchase a gameplan?',
    answer:
      'Every gameplan includes a complete, personalized blueprint for your jiu-jitsu. You’ll get a detailed overview of your core game identity, the primary positions you should focus on, key transitions to reach those positions, and a mapped-out submission flow. We also include grip strategies, essential escape paths, and a situational flowchart that guides your decision-making during rolls. To reinforce your learning, you’ll receive curated YouTube video references matched to your style. It’s all organized into a mobile-friendly format, so you can study and train from anywhere.',
  },
  {
    question: 'Is this useful if I already have a coach or attend regular classes?',
    answer:
      'Absolutely. My BJJ Gameplan is designed to complement your regular training — not replace it. Think of it as a personal roadmap that helps you train with more focus and intention, especially during open mat or solo study time.',
  },
  {
    question: 'Who is this gameplan for?',
    answer:
      'Our gameplans are built for Brazilian Jiu-Jitsu practitioners of all levels — whether you\'re a white belt just starting out, a hobbyist looking to sharpen specific areas, or a competitor aiming for the podium. Every plan is customized based on your experience, belt rank, strengths, goals, and preferred positions.',
  },
  {
    question: 'What makes this different from an instructional?',
    answer:
      'Instructionals are often long-form and general. Your gameplan is short, focused, and custom-built for your exact needs. You’re not just learning techniques — you’re learning which techniques matter to you and when to use them.',
  },
  {
    question: 'I’m recovering from an injury. Can I still use this?',
    answer:
      'Absolutely. If you’re coming back from an injury — like a tweaked knee or shoulder — let us know in the form and we’ll adjust your gameplan to emphasize safe, controlled positions and movements that support your recovery.',
  },
  {
    question: 'Can I choose between gi and no-gi techniques?',
    answer:
      'Yes! You’ll be able to indicate your preference for gi, no-gi, or a mix of both when filling out the intake form. Your curated videos, flowchart paths, and positional breakdowns will reflect your training focus so everything stays relevant to what you actually do on the mats.',
  },
  {
    question: 'What if I’m not satisfied with the plan I receive?',
    answer:
      'We’re committed to making sure your plan fits your style, goals, and the way you roll. If it’s not what you expected, just reach out and we’ll revise it at no cost. And if it still doesn’t feel right after the revision, we offer a full refund — no questions asked. Your growth and satisfaction are our top priorities.',
  },
];


export const featureSwiper: FeatureSwiperType[] = [
  {
    id: 'image1',
    text: '01',
    title: 'Tell Us About Your Game',
    content:
      'Fill out a quick form with your belt level, strengths, goals, and preferred positions. The more details you share, the more accurate your plan becomes.',
  },
  {
    id: 'image2',
    text: '02',
    title: 'Get Your Custom Gameplan',
    content:
      'We build a fully personalized strategy based on your style — complete with 5 curated videos, a situational flowchart, and positional priorities.',
  },
  {
    id: 'image2',
    text: '02',
    title: 'Get Your Custom Gameplan',
    content:
      'We build a fully personalized strategy based on your style — complete with 5 curated videos, a situational flowchart, and positional priorities.',
  },
  {
    id: 'image3',
    text: '03',
    title: 'Drill It. Own It. Win.',
    content:
      'Start training with purpose. Use your gameplan to sharpen specific areas, track progress, and perform with confidence in every roll.',
  },
]
