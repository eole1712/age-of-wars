import getPosition from './get-position';

export default ({ unitGetter, position, direction, scale }, cb) => {
  const sprite = unitGetter();

  sprite.anchor.set(0.5);

  sprite.x = getPosition(position);
  sprite.y = 290;
  sprite.scale.x = direction * scale;
  sprite.scale.y = scale;
  sprite.animationSpeed = 0.20;
  sprite.play();
  if (cb) {
    cb(sprite);
  }
  return sprite;
};
