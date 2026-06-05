class WinScene extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    preload() {
    }

    init() {
        
    }

    create() {
       
        // TEXT STUFF //////////////////////////////////////////////////////////////////////////

        // place win text in center of screen
        this.winText = this.add.text(960, 540, "YOU WIN!\nNo this is not final product stop asking >:(\npress space to restart", { font: '64px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5);


        // space key listener
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

    if(this.spaceKey.isDown) {
        this.scene.start("testNightScene");
    }
 
    }
}