// ============================================================
//  EDIT YOUR GAME CONTENT HERE
//  Everything the games show is driven by these simple arrays.
// ============================================================

export type TriviaQuestion = {
  /** The statement shown to the player */
  question: string
  /** Correct answer */
  answer: boolean
  /** Shown on the answer/explanation screen */
  explanation: string
  /** Optional image, gif, or video shown at the bottom of the answer screen */
  answerImage?: string
  /** Optional credit shown below the answer image */
  answerImageCredit?: {
    label: string
    href: string
  }
}

export type Pose = {
  /** Name of the aerial move */
  name: string
  /** Image of the correct pose (lives in /public/assets) */
  image: string
}

// ---- CHALLENGE 1: AERIAL SPORTS MYTH BUSTERS ----------------
export const TRIVIA_TIME_LIMIT = 6

export const TRIVIA: TriviaQuestion[] = [
  {
    question: 'It is necessary to strip down in aerial sports.',
    answer: false,
    explanation:
      'In some cases, such as pole, exposed skin is helpful for grip. In other cases, such as lyra or silk, clothing helps avoid skin burns. Regardless, you do not always need to strip down to participate.',
    answerImage: '/assets/myth-challenge/pole-dance-and-stripping.gif',
  },
  {
    question: 'You have to be strong and light to do aerial sports.',
    answer: false,
    explanation:
      'All body sizes and types are welcomed at NAS! Brute strength is sometimes helpful for certain tricks, but being strong alone is never enough. Good technique and lots of practice matter too.',
    answerImage: '/assets/myth-challenge/you-have-to-be-strong.jpg',
    answerImageCredit: {
      label: 'Photographer - Rae',
      href: 'http://raediummm.myportfolio.com',
    },
  },
  {
    question: 'Injuries are common in aerial sports.',
    answer: false,
    explanation:
      'While there is always a risk of injury, injuries are fairly uncommon and are of similar levels to most sports. Beginner classes use equipment like crash mats and guidance to keep you safe.',
    answerImage: '/assets/myth-challenge/safe.mp4',
  },
  {
    question: 'Aerial sports are always sexual in nature.',
    answer: false,
    explanation:
      'Aerial sports is a spectrum. While pole dancing has roots in erotic performance, it is also a serious sport with difficulty levels, artistic components, and competitive spaces.',
    answerImage:
      '/assets/myth-challenge/Aerial-sports-are-always-sexual-in-nature.jpg',
    answerImageCredit: {
      label: 'Photographer - Rae',
      href: 'http://raediummm.myportfolio.com',
    },
  },
  {
    question: 'I need to have prior dancing or sports experience.',
    answer: false,
    explanation:
      'Prior experience is helpful but not needed to begin your aerial sports journey. NAS welcomes students of all ages and experience levels.',
  },
  {
    question: 'All pole dances are sexy.',
    answer: false,
    explanation:
      'There are many other genres of pole, like lyrical, flow, and sport, which focus on the grace and strength of the athlete.',
    answerImage: '/assets/myth-challenge/pole-dances-are-sexy.jpg',
    answerImageCredit: {
      label: 'Photographer - Rae',
      href: 'http://raediummm.myportfolio.com',
    },
  },
  {
    question: 'Only girls can do aerial sports.',
    answer: false,
    explanation:
      'Boys can do it too. We welcome everyone, regardless of gender, to participate!',
    answerImage: '/assets/myth-challenge/guy-doing-pole.gif',
  },
  {
    question: 'You must be flexible to do aerial sports.',
    answer: false,
    explanation:
      'Most tricks, especially beginner to intermediate level tricks, do not require much flexibility. If certain tricks require flexibility, it will be trained alongside technique.',
    answerImage: '/assets/myth-challenge/flexible.mp4',
  },
  {
    question:
      'Aerial sports are individual and competitive, not community-driven.',
    answer: false,
    explanation:
      'The aerial community is incredibly supportive and collaborative. Come join us for more events and exclusive perks!',
    answerImage: '/assets/myth-challenge/community.JPG',
  },
  {
    question: 'You should point your toes in aerial sports.',
    answer: true,
    explanation:
      'True! Pointed toes extend your lines and instantly elevate any pose!',
    answerImage: '/assets/myth-challenge/answer-toes.png',
  },
]

/** Minimum correct answers needed to "pass" Challenge 1 */
export const TRIVIA_PASS_SCORE = 7

// ---- CHALLENGE 2: MATCH POSE TO NAME -------------------------
export const POSES: Pose[] = [
  {
    name: 'Double Star Drop',
    image: '/assets/pose-challenge/double-star-drop.png',
  },
  { name: 'Superman', image: '/assets/pose-challenge/superman.webp' },
  { name: 'Meathook', image: '/assets/pose-challenge/meathook.jpg' },
  { name: 'Mermaid', image: '/assets/pose-challenge/mermaid.gif' },
  { name: 'Hello Boys', image: '/assets/pose-challenge/hello-boys.jpg' },
]

/** Total seconds for the whole Pose Match game */
export const POSE_GAME_TIME = 20

/** Minimum correct matches needed to "pass" Challenge 2 */
export const POSE_PASS_SCORE = 3
