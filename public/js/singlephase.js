import mainScene from './mainScene.js';

const config = {
  width: 640,
  height: 640,
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scene: [mainScene]
};

new Phaser.Game(config);