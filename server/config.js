export const FPS = 30;
export const SPEED_RATIO = 40;

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
  Solder: {
    maxHP: 10,
    gold: 15,
    cost: 20,
    damage: 2,
    range: 1,
    speed: 1,
  },
  Archer: {
    maxHP: 5,
    gold: 23,
    cost: 30,
    damage: 3,
    range: 3,
    speed: 1,
  },
  Troll: {
    maxHP: 30,
    gold: 45,
    cost: 60,
    damage: 6,
    range: 1,
    speed: 0.5,
  },
};
