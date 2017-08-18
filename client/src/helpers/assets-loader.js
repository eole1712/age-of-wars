import { times, reduce } from 'lodash';

const root = 'public/assets';

export const constructAsset = (type, mode, nb) => (
  times(nb, i => (`${root}/${type}/${mode}/${i}.png`))
);

export const constructAssets = (type, modes, nb) => reduce(
  modes,
  (prev, mode) => ({ ...prev, [mode]: constructAsset(type, mode, nb) }),
  {},
);
