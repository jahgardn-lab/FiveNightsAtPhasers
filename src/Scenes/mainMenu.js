class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenuScene");
    }

    preload() {
    }

    init() {
        
    }

    create() {
        //create list of nights and night scence
        this.nightList = ["NIGHT 1", "NIGHT 2", "NIGHT 3"];
        this.nightSceneList = ["testNightScene", "nightTwo"];
        //pull the currently saved night from local storage, as a safety net if the local storage is null set to test night
        this.savedNight = localStorage.getItem("currentNight");
        if(this.savedNight == null){this.savedNight == this.nightList[0]}

        //Assign saved night text to cooresponding scene name, as a safety net the current scene is set to the test night
        if(this.savedNight == this.nightList[0]){this.curSceneLoad = this.nightSceneList[0];}
        else if(this.savedNight == this.nightList[1]){this.curSceneLoad = this.nightSceneList[1];}
        else if(this.savedNight == this.nightList[2]){this.curSceneLoad = this.nightSceneList[2];}
        else{this.curSceneLoad = "testNightScene";}
        // TEXT STUFF //////////////////////////////////////////////////////////////////////////

        // place lose text in center of screen
        this.loseText = this.add.text(960, 80, "5 NIGHTS AT PHASER'S", { font: '128px Courier', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        my.sprite.phaser = this.add.sprite(1500, 2100, "phaserSprite").setScale(5).setAlpha(0);
        this.phaserFlashTimer = 2;
        my.sprite.camFilter = this.add.sprite(game.config.width/2, game.config.height/2, "cameraFilter").setAlpha(0.1);


        // creates clickable to saved night
        this.nightTXT = this.add.text(50, 540, this.savedNight, { font: '72px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setInteractive();
        this.nightTXT.on('pointerdown', (pointer) => {   this.scene.start(this.curSceneLoad);   });

        
        // credits for game
        this.creditsTXT = this.add.text(50, 1020, "Credits", { font: '32px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setInteractive();
        this.creditsBackTXT = this.add.text(50, 1020, "Back", { font: '32px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setInteractive().setVisible(false);
        this.creditsContentTXT = this.add.text(50, 300, "Co-created by Jade Gardner & Dylan McDermott", { font: '64px Courier', fill: '#ffffff' }).setOrigin(0, 0.5).setVisible(false);

        this.creditsTXT.on('pointerdown', (pointer) => {
            this.creditsTXT.setVisible(false);
            this.creditsBackTXT.setVisible(true);
            this.creditsContentTXT.setVisible(true);

            this.nightTXT.setVisible(false);
        });

        this.creditsBackTXT.on('pointerdown', (pointer) => {
            this.creditsTXT.setVisible(true);
            this.creditsBackTXT.setVisible(false);
            this.creditsContentTXT.setVisible(false);

            this.nightTXT.setVisible(true);
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