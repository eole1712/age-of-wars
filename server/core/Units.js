import { mapValues } from 'lodash';
import { SPEED_RATIO, DIRECTIONS, POSITIONS, UNITS } from '../../config';

class Unit {
  constructor(id) {
    this.id = id;
    this.position = POSITIONS[id];
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
      hp: this.hp,
      position: this.position,
    };
  }
}

const unitBuilder = (className, data) => {
  class u extends Unit {
    constructor(faction) {
      super(faction);

      this.type = u.type;
      Object.assign(this, data);
      this.hp = this.maxHP;
    }
  }
  u.type = className;
  return u;
};

export default mapValues(UNITS, (v, k) => unitBuilder(k, v));
