// Jade Gardner | Dylan McDermott
// Created: 5/28/2024
// Phaser: 3.80.0

/*
// game config - old
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: false  // prevent pixel art from getting blurred when scaled
    },
    width: 1920,
    height: 1080,
    scene: [Load, TestNight]
}
*/

// game config - fullscreen
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: false  // prevent pixel art from getting blurred when scaled
    },
    width: 1920,
    height: 1080,
    scene: [Load, TestNight]
}













var cursors;
const SCALE = 1.0;
var my = {sprite: {}};

const game = new Phaser.Game(config);