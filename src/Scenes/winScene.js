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

        this.nightChimes = this.sound.add('nightOver', {
            volume: 0.5,
            loop: false
        });

        this.nightChimes.play();
        


        // place win text in center of screen
        this.winColon = this.add.text(960, 560, " :  ", { font: '550px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.winText = this.add.text(960, 820, "5 59\n6 00", { font: '550px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        my.sprite.blackBars = this.add.sprite(game.config.width/2, game.config.height/2, "winScene").setDepth(1);

        this.tweens.add({
            targets: this.winText,
            y: 310,
            duration: 4900, // Duration in milliseconds
            ease: 'Quad.easeInOut', // Easing function

            onComplete: () => { 

                const confetti_left = this.add.particles(0, 0, 'confetti', {
                    tint: [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF],
                    speedX: {min: 100, max: 1000},
                    speedY: {min: 100, max: 1000},
                    scale: {start: 30, end: 15},
                    rotate: {min: 0, max: 360},
                    lifespan: 2000,
                    alpha: {start: 1, end: 0},
                }).setDepth(2);

                const confetti_right = this.add.particles(1920, 0, 'confetti', {
                    tint: [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF],
                    speedX: {min: -1000, max: -100},
                    speedY: {min: 100, max: 1000},
                    scale: {start: 30, end: 15},
                    rotate: {min: 0, max: 360},
                    lifespan: 2000,
                    alpha: {start: 1, end: 0},
                }).setDepth(2);

                setTimeout(() => { confetti_left.stop(); confetti_right.stop(); }, 500);
                this.winInstructions = this.add.text(960, 900, "press space to continue.", { font: '64px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(2);
            }
        });

        // space key listener
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

    if(this.spaceKey.isDown) {
        this.scene.start("mainMenuScene");
    }
 
    }
}