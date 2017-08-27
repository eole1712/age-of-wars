import * as PIXI from 'pixi.js';
import { mapValues } from 'lodash';

import { constructAssets } from '../../helpers/assets-loader';

const units = {
  Knight: { modes: ['attack', 'die', 'hurt', 'run', 'walk'], nbSprites: 7, scale: 0.15 },
  Paladin: { modes: ['attack', 'die', 'hurt', 'run', 'walk'], nbSprites: 7, scale: 0.15 },
  Warrior: { modes: ['attack', 'die', 'hurt', 'run', 'walk'], nbSprites: 7, scale: 0.15 },
  TrollGreen: { modes: ['attack', 'die', 'hurt', 'run', 'walk'], nbSprites: 7, scale: 0.3 },
  TrollRed: { modes: ['attack', 'die', 'hurt', 'run', 'walk'], nbSprites: 7, scale: 0.3 },
  TrollGrey: { modes: ['attack', 'die', 'hurt', 'run', 'walk'], nbSprites: 7, scale: 0.3 },
};

export default mapValues(
  units,
  ({ modes, nbSprites }, type) => ({
    ...mapValues(
      constructAssets(type, modes, nbSprites),
      paths => () => (
        new PIXI.extras.AnimatedSprite(
          paths.map(path => PIXI.Texture.fromImage(path)),
        )
      ),
    ),
    scale: units[type].scale,
  }),
);
