export const FPS = 30;

export const PLAYERS = {
  ONE: 'ONE',
  TWO: 'TWO',
};

export const POSITIONS = {
  [PLAYERS.ONE]: -100,
  [PLAYERS.TWO]: 100,
};

export const DIRECTIONS = {
  [PLAYERS.ONE]: 1,
  [PLAYERS.TWO]: -1,
};

export const UNITS = {
  TrollGreen: {
    maxHP: 30,
    gold: 15,
    cost: 20,
    damage: 2,
    range: 20,
    speed: 5,
  },
  TrollRed: {
    maxHP: 50,
    gold: 45,
    cost: 60,
    damage: 6,
    range: 20,
    speed: 2,
  },
  TrollGrey: {
    maxHP: 50,
    gold: 45,
    cost: 60,
    damage: 6,
    range: 20,
    speed: 2,
  },
  Knight: {
    maxHP: 35,
    gold: 23,
    cost: 30,
    damage: 3,
    range: 20,
    speed: 1,
  },
  Warrior: {
    maxHP: 25,
    gold: 45,
    cost: 60,
    damage: 6,
    range: 20,
    speed: 2,
  },
  Paladin: {
    maxHP: 25,
    gold: 45,
    cost: 60,
    damage: 6,
    range: 20,
    speed: 2,
  },
};
