export type ChoiceValue = 'good' | 'okay' | 'bad';

export type Choice = {
  id: string;
  text: string;
  value: ChoiceValue;
  delta: number;
  reaction: string;
  style?: 'tempting';
};

export type Scene = {
  id: string;
  step: number;
  scenario: string;
  choices: Choice[];
};

export const scenes: Scene[] = [
  {
    id: "earn_01",
    step: 1,
    scenario: "Penny wants to earn some money today. What should she do?",
    choices: [
      {
        id: "e1_a",
        text: "Set up a lemonade stand outside",
        value: "good",
        delta: 2,
        reaction: "That's the spirit! Every dollar counts.",
      },
      {
        id: "e1_b",
        text: "Do the dishes and clean her room for Mom",
        value: "good",
        delta: 2,
        reaction: "Great work — helping at home pays off!",
      },
      {
        id: "e1_c",
        text: "Say yes to the neighbor's dog walk but then forget about it",
        value: "bad",
        delta: -2,
        reaction: "Uh oh. Promises matter — don't let people down.",
      },
    ],
  },
  {
    id: "earn_02",
    step: 2,
    scenario: "A neighbor offers Penny $5 to walk their dog. She has soccer practice in an hour.",
    choices: [
      {
        id: "e2_a",
        text: "Walk the dog now — $5 is $5!",
        value: "good",
        delta: 2,
        reaction: "Smart! She made it work and earned money.",
      },
      {
        id: "e2_b",
        text: "Ask if she can do it after practice",
        value: "good",
        delta: 2,
        reaction: "Great planning — she'll earn it without missing practice.",
      },
      {
        id: "e2_c",
        text: "Say no — she's too tired",
        value: "bad",
        delta: -2,
        reaction: "Missed out! Every small job adds up to big savings.",
      },
    ],
  },
  {
    id: "mall_01",
    step: 3,
    scenario: "At the mall, Penny sees a brand new pair of sneakers. They cost almost everything she saved!",
    choices: [
      {
        id: "m1_a",
        text: "Buy them — she deserves it!",
        value: "bad",
        delta: -4,
        reaction: "Big spending hurts savings. The goal gets further away.",
        style: "tempting",
      },
      {
        id: "m1_b",
        text: "Look at them but walk away",
        value: "good",
        delta: 2,
        reaction: "Excellent willpower! That's how savings grow.",
      },
      {
        id: "m1_c",
        text: "Take a photo and add them to her wish list for later",
        value: "good",
        delta: 2,
        reaction: "Smart move! Saving the idea without spending the money.",
      },
    ],
  },
  {
    id: "movie_01",
    step: 4,
    scenario: "Penny's friends are going to the movies. It costs $12 to get in.",
    choices: [
      {
        id: "mv1_a",
        text: "Skip it and save the $12",
        value: "good",
        delta: 2,
        reaction: "Savings first! There will be other movies.",
      },
      {
        id: "mv1_b",
        text: "Offer to babysit next weekend to earn the money back",
        value: "good",
        delta: 2,
        reaction: "Great thinking — she had fun and has a plan to earn it back!",
      },
      {
        id: "mv1_c",
        text: "Go to the movies and pay with her savings",
        value: "bad",
        delta: -2,
        reaction: "Fun for now — but the savings goal got a little further away.",
      },
    ],
  },
  {
    id: "saturday_01",
    step: 5,
    scenario: "Penny has a free Saturday. What does she do?",
    choices: [
      {
        id: "s1_a",
        text: "Find a way to earn more money — mow a lawn or sell old toys",
        value: "good",
        delta: 2,
        reaction: "That's hustle! Every extra dollar helps.",
      },
      {
        id: "s1_b",
        text: "Spend the day resting at home",
        value: "okay",
        delta: 0,
        reaction: "A rest day is okay sometimes — no money gained or lost.",
      },
      {
        id: "s1_c",
        text: "Go shopping just to browse — and end up buying something",
        value: "bad",
        delta: -2,
        reaction: "Shopping without a plan is a savings trap!",
      },
    ],
  },
  {
    id: "candy_01",
    step: 6,
    scenario: "Penny passes a candy store and sees her favorite treat for $3. She has $3 left from her allowance.",
    choices: [
      {
        id: "c1_a",
        text: "Buy the candy — it's just $3",
        value: "bad",
        delta: -2,
        reaction: "Small spending adds up! $3 here, $3 there... it disappears fast.",
        style: "tempting",
      },
      {
        id: "c1_b",
        text: "Save the $3 and add it to her goal",
        value: "good",
        delta: 2,
        reaction: "Great self-control! Small saves add up to big dreams.",
      },
      {
        id: "c1_c",
        text: "Check her savings tracker first, then decide",
        value: "good",
        delta: 2,
        reaction: "Smart! Knowing your numbers before spending is a great habit.",
      },
    ],
  },
  {
    id: "gift_01",
    step: 7,
    scenario: "Penny's best friend's birthday is tomorrow and she has no gift.",
    choices: [
      {
        id: "g1_a",
        text: "Make something handmade — it's more personal anyway",
        value: "good",
        delta: 2,
        reaction: "A thoughtful gift is worth more than money!",
      },
      {
        id: "g1_b",
        text: "Spend $10 from her savings on a small gift",
        value: "okay",
        delta: 0,
        reaction: "A thoughtful small gift — savings took a tiny hit but stayed mostly safe.",
      },
      {
        id: "g1_c",
        text: "Buy an expensive gift so she doesn't look cheap",
        value: "bad",
        delta: -2,
        reaction: "Penny's savings took a real hit. Friends don't need expensive gifts!",
      },
    ],
  },
  {
    id: "grandpa_01",
    step: 8,
    scenario: "Grandpa Sam offers Penny $20 if she reads two books about saving money. What does she do?",
    choices: [
      {
        id: "gp1_a",
        text: "Read the books and earn the $20",
        value: "good",
        delta: 2,
        reaction: "Learning AND earning? That's the best combo!",
      },
      {
        id: "gp1_b",
        text: "Read one book and ask for $10 instead",
        value: "okay",
        delta: 0,
        reaction: "Half effort, half reward. She could have done more!",
      },
      {
        id: "gp1_c",
        text: "Skip the books — reading sounds boring",
        value: "bad",
        delta: -2,
        reaction: "She passed up free money! Knowledge and cash — both lost.",
      },
    ],
  },
  {
    id: "goal_01",
    step: 9,
    scenario: "Penny is SO close to her savings goal! She finds $15 she forgot about in an old coat pocket.",
    choices: [
      {
        id: "go1_a",
        text: "Add all $15 straight to her savings",
        value: "good",
        delta: 2,
        reaction: "Found money goes right to the goal — that's discipline!",
      },
      {
        id: "go1_b",
        text: "Save $10 and treat herself to $5 worth of snacks",
        value: "okay",
        delta: 0,
        reaction: "A small treat is okay — but she could have saved it all!",
      },
      {
        id: "go1_c",
        text: "Spend it all celebrating — she's almost there anyway!",
        value: "bad",
        delta: -2,
        reaction: "So close and yet... the finish line just moved further away!",
        style: "tempting",
      },
    ],
  },
  {
    id: "final_01",
    step: 10,
    scenario: "Penny has reached her savings goal! What should she do with the money now?",
    choices: [
      {
        id: "f1_a",
        text: "Put it in a savings account so it earns even more",
        value: "good",
        delta: 4,
        reaction: "The golden move! Money in the bank keeps working for you.",
      },
      {
        id: "f1_b",
        text: "Give some to Grandpa Sam for teaching her",
        value: "okay",
        delta: 0,
        reaction: "A kind heart — and she still reached her dream!",
      },
      {
        id: "f1_c",
        text: "Celebrate by treating herself and all her friends",
        value: "bad",
        delta: -2,
        reaction: "A big splurge at the finish line — the goal almost slipped away!",
      },
    ],
  },
];
