
export default ({ unitGetter, position, direction, scale }) => {
  const sprite = unitGetter();

  sprite.x = ((position + 100) / 200) * 1166;
  sprite.y = 200;
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.animationSpeed = 0.20;
  sprite.play();
  return sprite;
};
