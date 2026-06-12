class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenuScene");
    }

    preload() {
    }

    init() {
        
    }

    create() {
       
        // TEXT STUFF //////////////////////////////////////////////////////////////////////////

        // place lose text in center of screen
        this.loseText = this.add.text(960, 80, "5 NIGHTS AT PHASER'S", { font: '128px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        my.sprite.phaser = this.add.sprite(1500, 2100, "phaserSprite").setScale(5).setAlpha(0);
        this.phaserFlashTimer = 2;
        my.sprite.camFilter = this.add.sprite(game.config.width/2, game.config.height/2, "cameraFilter").setAlpha(0.1);


        // creates clickable to night 1
        this.night1Txt = this.add.text(50, 540, "NIGHT 1", { font: '72px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setInteractive();
        this.night1Txt.on('pointerdown', (pointer) => {   this.scene.start("testNightScene");   });

        
        // credits for game
        this.creditsTXT = this.add.text(50, 1020, "Credits", { font: '32px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setInteractive();
        this.creditsBackTXT = this.add.text(50, 1020, "Back", { font: '32px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setInteractive().setVisible(false);
        this.creditsContentTXT = this.add.text(50, 300, "Co-created by Jade Gardner & Dylan McDermott", { font: '64px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setVisible(false);

        this.creditsTXT.on('pointerdown', (pointer) => {
            this.creditsTXT.setVisible(false);
            this.creditsBackTXT.setVisible(true);
            this.creditsContentTXT.setVisible(true);

            this.night1Txt.setVisible(false);
        });

        this.creditsBackTXT.on('pointerdown', (pointer) => {
            this.creditsTXT.setVisible(true);
            this.creditsBackTXT.setVisible(false);
            this.creditsContentTXT.setVisible(false);

            this.night1Txt.setVisible(true);
        });

        // space key listener
        //this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time, delta) {
        let dTime = (delta / 1000);

        //if(this.spaceKey.isDown) {
        //    this.scene.start("testNightScene");
        //}

        if(this.phaserFlashTimer <= 0) {
            //my.sprite.phaser.setAlpha( Phaser.Math.FloatBetween(0.0, 1.0) );
            my.sprite.phaser.setAlpha( my.sprite.phaser.alpha + Phaser.Math.FloatBetween(-0.1, 0.1) );
            this.phaserFlashTimer = Phaser.Math.FloatBetween(0.25, 0.25);
        }
        else { this.phaserFlashTimer -= dTime; }
    
    }
}