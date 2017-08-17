import { mapValues } from 'lodash';
import { SPEED_RATIO, DIRECTIONS, UNITS } from '../config';

let lastId = 0;

class Unit {
  constructor(playerId, position) {
    this.id = lastId++;
    this.playerId = playerId;
    this.position = position;
  }

  move() {
    this.position += this.speed * DIRECTIONS[this.id] * SPEED_RATIO;
  }

  isInRangeToAttack(unit) {
    return this.position - unit.position;
  }

  attack(unit) {
    if (unit.hp) {
      const result = unit.injure(this.attack);
      if (result && result.wasKilled) {
        this.gold += result.gold;
      }
    }
  }

  injure(damage) {
    if (this.hp) {
      this.hp = Math.max(this.hp - damage, 0);
      return {
        wasKilled: this.hp === 0,
        gold: this.hp === 0 ? this.gold : 0,
      };
    }
    return null;
  }

  get json() {
    return {
      id: this.id,
      type: this.type,
      playerId: this.playerId,
      hp: this.hp,
      position: this.position,
    };
  }
}

const unitBuilder = (className, data) => {
  class u extends Unit {
    constructor(playerId, position) {
      super(playerId, position);

      this.type = u.type;
      Object.assign(this, data);
      this.hp = this.maxHP;
    }
  }
  u.type = className;
  return u;
};

export default mapValues(UNITS, (v, k) => unitBuilder(k, v));
