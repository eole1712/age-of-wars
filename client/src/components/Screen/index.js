/* eslint-disable no-param-reassign,react/prop-types */
import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import * as PIXI from 'pixi.js';

import { find } from 'lodash';

import Units from '../Units';
import renderUnit from '../Units/render-unit';

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedUnits: [],
    };

    this.animate = this.animate.bind(this);
    this.renderUnits = this.renderUnits.bind(this);
  }

  componentDidMount() {
    const back = PIXI.Texture.fromImage('public/assets/bg.png');
    const far = new PIXI.extras.TilingSprite(back, 1366, 400);
    far.position.x = 0;
    far.position.y = 0;
    far.tilePosition.x = 0;
    far.tilePosition.y = 0;
    far.interactive = true;

    this.renderer = PIXI.autoDetectRenderer(1366, 400, { backgroundColor: 0x2ecc71 });
    this.gameCanvas.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.stage.width = 1366;
    this.stage.height = 768;
    this.stage.addChild(far);
    this.stage.interactive = true;

    this.stage.on('click', () => {
      console.log(this.props);
      if (this.props.onClick) {
        this.props.onClick();
      }
    });
    this.animate();
  }

  animate() {
    this.renderer.render(this.stage);
  }

  renderUnits() {
    const { units } = this.props;
    const { renderedUnits } = this.state;

    renderedUnits
      .forEach((u, id) => {
        if (!find(units, { id })) {
          this.stage.removeChild(u);
          renderedUnits[id] = null;
        }
      });

    units
      .filter(u => renderedUnits[u.id] === null)
      .forEach((u) => {
        renderedUnits[u.id] = renderUnit({
          ...u,
          unitGetter: Units[u.type].walk,
          scale: Units[u.type].scale,
        });
      });
  }

  render() {
    return (
      <div className="game-canvas-container" ref={(div) => { this.gameCanvas = div; }} />
    );
  }
}

export default Screen;
