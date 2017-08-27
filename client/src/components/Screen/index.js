/* eslint-disable no-param-reassign,react/prop-types,no-undef */
import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

// import { find, mapValues, filter, isEqual, compact } from 'lodash';

import EventsFactory from './events';
// import Units from '../Units';
// import renderUnit from '../Units/render-unit';

const initBackground = () => {
  const back = PIXI.Texture.fromImage('public/assets/bg.png');
  const ts = new PIXI.extras.TilingSprite(back, 1366, 400);
  ts.position.x = 0;
  ts.position.y = 0;
  ts.tilePosition.x = 0;
  ts.tilePosition.y = 0;
  ts.interactive = true;
  return ts;
};

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedUnits: {},
    };

    this.animate = this.animate.bind(this);
    this.getRenderedUnits = this.getRenderedUnits.bind(this);
    this.putRenderedUnits = this.putRenderedUnits.bind(this);
    // this.renderUnits = this.renderUnits.bind(this);
  }

  componentDidMount() {
    this.renderer = PIXI.autoDetectRenderer(1366, 400, { backgroundColor: 0x2ecc71 });
    this.gameCanvas.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.stage.width = 1366;
    this.stage.height = 768;
    this.stage.addChild(initBackground());
    this.stage.interactive = true;

    this.stage.on('click', () => {
      if (this.props.onClick) {
        this.props.onClick();
      }
    });
    EventsFactory(this.stage, this.getRenderedUnits, this.putRenderedUnits);
    requestAnimationFrame(this.animate);
  }

/*  componentWillReceiveProps({ units }) {
    const { renderedUnits } = this.state;

    if (units && renderedUnits && !isEqual(units.map(u => u.id), Object.keys(renderedUnits))) {
      console.log('Rendering');
      this.renderUnits(units);
    }
  } */

  getRenderedUnits() {
    return this.state.renderedUnits;
  }

  putRenderedUnits(units) {
    return this.setState(prev => ({ renderedUnits: { ...prev.renderedUnits, ...units } }));
  }

  animate() {
    this.renderer.render(this.stage);
    this.frame = requestAnimationFrame(this.animate);
  }
  /*
  renderUnits(units) {
    const { renderedUnits } = this.state;

    const filteredNewUnits = compact(mapValues(
      renderedUnits,
      (v, id) => {
        if (!find(units, { id })) {
          this.stage.removeChild(v);
          return null;
        }
        return v;
      },
    ));

    const toAdd = filter(
      units,
      u => !filteredNewUnits[u.id],
    ).reduce(
      (prev, u) => ({
        ...prev,
        [u.id]: renderUnit(
          {
            ...u,
            unitGetter: Units[u.type].walk,
            scale: Units[u.type].scale,
          }, sprite => this.stage.addChild(sprite),
        ),
      }),
      {},
    );

    const newState = { renderedUnits: { ...filteredNewUnits, ...toAdd } };
    console.log(newState);

    this.setState(newState);
  }
  */

  render() {
    return (
      <div className="game-canvas-container" ref={(div) => { this.gameCanvas = div; }} />
    );
  }
}

export default Screen;
