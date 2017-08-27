import { mapValues } from 'lodash';
import { getio } from './io-container';

const events = {
  UNIT_CREATE: unit => ({
    playerId: unit.playerId,
    unit: unit.json,
  }),
  UNIT_MOVE: unit => ({
    playerId: unit.playerId,
    unit: unit.json,
    newPosition: unit.position,
  }),
  UNIT_ATTACK: (unit, attackedUnit) => ({
    playerId: unit.playerId,
    unit: unit.json,
    attackedUnitId: attackedUnit.id,
    damages: unit.damage,
  }),
  UNIT_HURT: (unit, incomingDamages) => ({
    playerId: unit.playerId,
    unit: unit.json,
    incomingDamages,
  }),
  UNIT_DIE: (unit, incomingDamages) => ({
    playerId: unit.playerId,
    unit: unit.json,
    gold: unit.gold,
    incomingDamages,
  }),
};

export default mapValues(
  events,
  (f, event) => (...params) => {
    const data = f(...params);
    console.log({
      event,
      data,
    });
    getio().emit(event, data);
  },
);
