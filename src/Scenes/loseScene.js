class LoseScene extends Phaser.Scene {
    constructor() {
        super("loseScene");
    }

    preload() {
    }

    init() {
        
    }

    create() {
       
        // TEXT STUFF //////////////////////////////////////////////////////////////////////////

        // place lose text in center of screen
        //this.loseText = this.add.text(960, 540, "YOU LOSE!\nYeah yeah, there's no jumpscare, I get it.\nsay's the person who died to 1 animatronic\nunless you died to power, which is, well, lmao\npress space to restart", { font: '64px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        my.sprite.loseScene = this.add.sprite(game.config.width/2, game.config.height/2, "loseScene").setScale(1);




        // space key listener
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

    if(this.spaceKey.isDown) {
        this.scene.start("testNightScene");
    }
 
    }
}