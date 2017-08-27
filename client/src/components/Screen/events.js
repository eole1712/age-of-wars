import Units from '../Units';
import renderUnit from '../../helpers/render-unit';
import getPosition from '../../helpers/get-position';

import socket from '../../helpers/socket';

export default (stage, getRenderedUnits, putRenderedUnits) => {
  socket.on('UNIT_CREATE', ({ unit }) => {
    putRenderedUnits({
      [unit.id]: renderUnit({
        ...unit,
        unitGetter: Units[unit.type].walk,
        scale: Units[unit.type].scale,
      }, res => stage.addChild(res)),
    });
  });

  socket.on('UNIT_MOVE', ({ unit, newPosition }) => {
    const u = getRenderedUnits()[unit.id];
    if (u) {
      u.x = getPosition(newPosition);
    }
  });

  socket.on('UNIT_ATTACK', ({ unit }) => {
    const u = getRenderedUnits()[unit.id];
    if (u) {
      stage.removeChild(u);
      putRenderedUnits({
        [unit.id]: renderUnit({
          ...unit,
          unitGetter: Units[unit.type].attack,
          scale: Units[unit.type].scale,
        }, res => stage.addChild(res)),
      });
    }
  });
};
