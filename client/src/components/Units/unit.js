import Models from './index';
import renderUnit from '../../helpers/render-unit';

export class Unit {
  constructor(u, config) {
    this.id = u.id;
    this.type = u.type;
    this.playerId = u.playerId;
    this.hp = u.hp;
    this.position = u.position;
    this.direction = u.direction;

    this.actions = [];
    this.renderedUnit = renderUnit({
      unitGetter: Models[this.type].idle, position: this.position, direction: this.direction, scale
    });
  }


}
