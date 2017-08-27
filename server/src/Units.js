import { mapValues } from 'lodash';
import { DIRECTIONS, UNITS } from '../config';

import Events from './events';

let lastId = 0;

class Unit {
  constructor(playerId, position) {
    this.id = String(lastId++);
    this.playerId = playerId;
    this.position = position;
    this.direction = DIRECTIONS[this.playerId];
  }

  move() {
    this.position += this.speed * this.direction;
    Events.UNIT_MOVE(this);
  }

  isInRangeToAttack(unit) {
    return this.position - unit.position;
  }

  attack(unit) {
    if (unit.hp) {
      const result = unit.injure(this.damage);
      if (result && result.wasKilled) {
        this.gold += result.gold;
      }
      Events.UNIT_ATTACK(this, unit);
    }
  }

  injure(damage) {
    if (this.hp) {
      this.hp = Math.max(this.hp - damage, 0);

      if (this.hp === 0) {
        Events.UNIT_DIE(this, damage);
      } else {
        Events.UNIT_HURT(this, damage);
      }

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
      direction: this.direction,
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
