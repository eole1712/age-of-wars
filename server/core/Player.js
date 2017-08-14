import { UNITS } from '../../config';

import UnitsList from './Units';

export default class Player {
  constructor(id) {
    this.id = id;

    this.hp = 100;
    this.gold = 200;

    this.units = [];

    console.log({
      event: 'NEW_PLAYER_CREATED',
      id,
    });
  }

  buyUnit(unitId) {
    const unit = UNITS[unitId];

    if (unit && unit.cost <= this.gold) {
      const u = new UnitsList[unitId](this.id);
      this.units.push(u);
      this.gold -= u.cost;
      return u;
    }
    return null;
  }

  get json() {
    return {
      id: this.id,
      hp: this.hp,
      gold: this.gold,
      units: this.units.map(u => u.json),
    };
  }
}