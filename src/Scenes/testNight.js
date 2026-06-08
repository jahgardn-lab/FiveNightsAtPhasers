class TestNight extends Phaser.Scene {
    constructor() {
        super("testNightScene");
    }

    preload() {
    }

    init() {
        this.HAS_WON = false;
        this.CAM_SHIFT_AMOUNT = 390;
        this.CAM_SHIFT_SPEED = 15;
        this.MAX_POWER = 1000;

        this.power = 1000;
        this.powerIsOut = false;

        this.hasToggledCams = false;
        this.hasToggledCams_space = false;
        this.camsAreOpen = false;

        this.leftDoorClosed  = false;
        this.rightDoorClosed = false;
        this.doorLeftIsMoving = false;
        this.doorRightIsMoving = false;

        this.shiftPos = 0;
    }

    create() {
        // access var that lets us read the room data
        this.roomD = this.cache.json.get('roomData');
        this.enemyInfo = this.cache.json.get('enemiesNight1');

        let enemy = this.enemyInfo;

        // place left door on left side of screen
        my.sprite.doorLeft = this.add.sprite(960, -500, "door").setScale(1);

        // place right door on right side of screen
        my.sprite.doorRight = this.add.sprite(960, -500, "door").setScale(1).setFlipX(true);

        // place office background sprite
        my.sprite.office = this.add.sprite(game.config.width/2, game.config.height/2, "office").setScale(1);

        // LEFT DORE STUFF /////////////////////////////////////////////////////////////////////

        // place left door button at left side of screen
        my.sprite.doorButtonLeft = this.add.sprite(30, 480, "doorButton_open").setScale(1).setInteractive().setFlipX(true);

        // listener for left door button getting clicked
        my.sprite.doorButtonLeft.on('pointerdown', (pointer) => {
            // pointer.x and pointer.y gives coordinates of the click
            
            if(!this.leftDoorClosed && !this.doorLeftIsMoving) {
                my.sprite.doorButtonLeft.setTexture("doorButton_closed");
                // because of this, the door is considered closed the second the player clicks.
                // if we want to be mean to the player, we could put door is closed inside the tween onComplete
                // so the door has to be fully closed to count (but that feels pretty mean)
                this.leftDoorClosed = true;
                this.doorLeftIsMoving = true;
                this.tweens.add({
                    targets: my.sprite.doorLeft,
                    y: 540,
                    duration: 500, // Duration in milliseconds
                    ease: 'Power1', // Easing function
                    onComplete: () => { this.doorLeftIsMoving = false; }
                });
            } else if(this.leftDoorClosed && !this.doorLeftIsMoving) {
                my.sprite.doorButtonLeft.setTexture("doorButton_open");
                this.leftDoorClosed = false;
                this.doorLeftIsMoving = true;
                this.tweens.add({
                    targets: my.sprite.doorLeft,
                    y: -500,
                    duration: 1000, // Duration in milliseconds
                    ease: 'Power1', // Easing function
                    onComplete: () => { this.doorLeftIsMoving = false; }
                });
            }
        });

        // RIGHT DORE STUFF ////////////////////////////////////////////////////////////////////

        // place right door button at right side of screen
        my.sprite.doorButtonRight = this.add.sprite(1890, 480, "doorButton_open").setScale(1).setInteractive();

        // listener for right door button getting clicked
        my.sprite.doorButtonRight.on('pointerdown', (pointer) => {
            // pointer.x and pointer.y gives coordinates of the click
            
            if(!this.rightDoorClosed && !this.doorRightIsMoving) {
                my.sprite.doorButtonRight.setTexture("doorButton_closed");
                // because of this, the door is considered closed the second the player clicks.
                // if we want to be mean to the player, we could put door is closed inside the tween onComplete
                // so the door has to be fully closed to count (but that feels pretty mean)
                this.rightDoorClosed = true;
                this.doorRightIsMoving = true;
                this.tweens.add({
                    targets: my.sprite.doorRight,
                    y: 540,
                    duration: 500, // Duration in milliseconds
                    ease: 'Power1', // Easing function
                    onComplete: () => { this.doorRightIsMoving = false; }
                });
            } else if(this.rightDoorClosed && !this.doorRightIsMoving) {
                my.sprite.doorButtonRight.setTexture("doorButton_open");
                this.rightDoorClosed = false;
                this.doorRightIsMoving = true;
                this.tweens.add({
                    targets: my.sprite.doorRight,
                    y: -500,
                    duration: 1000, // Duration in milliseconds
                    ease: 'Power1', // Easing function
                    onComplete: () => { this.doorRightIsMoving = false; }
                });
            }
        });

        // idk why, but whenever I remove this superfluous tween, the door stops working. So stay it shall! nvm it fixed itself god damnit >:(
        //this.tweens.add({ targets: my.sprite.doorLeft, y: -400, duration: 10, ease: 'Linear1', onComplete: () => { this.doorLeftIsMoving = false; } });


        // create current camera sprite (defaults to one of our choice)
        my.sprite.curCam = this.add.sprite(game.config.width/2, game.config.height/2, "mainStage").setVisible(false);

        // theoretically, camera enemy needs to be put here (in terms of depth)/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       // this.add.enemies(scene, ai level, canBeCameraStalled, movement array of path, defX, defY, sprite);
       //Making separate array for editing convincing temporarily
       //this.bernardPath = ["mainStage_center", "backRoom_left", "mainRoom_center", "hallway_left", "hallwayCorner_left"]
        //my.sprite.bernard = new Enemies(this, 3, false, this.bernardPath, game.config.width/2, game.config.width/2, "bernardSprite");
        // CAMERA STUFF ////////////////////////////////////////////////////////////////////////

        // this.add.enemies(scene, ai level, canBeCameraStalled, movement array of path, defX, defY, sprite);
       
        my.sprite.bernard = new Enemies(this, enemy.Bernard.level, enemy.Bernard.camera, enemy.Bernard.movement, enemy.Bernard.x, enemy.Bernard.y, enemy.Bernard.coordinates, enemy.Bernard.sprite);
        this.bernardTimer = 1.0;

        my.sprite.phaser = new Enemies(this, enemy.Phaser.level, enemy.Phaser.camera, enemy.Phaser.movement, enemy.Phaser.x, enemy.Phaser.y, enemy.Phaser.coordinates, enemy.Phaser.sprite);

        my.sprite.dylan = new Enemies(this, enemy.Dylan.level, enemy.Dylan.camera, enemy.Dylan.movement, enemy.Dylan.x, enemy.Dylan.y, enemy.Dylan.coordinates, enemy.Dylan.sprite);

        my.sprite.rush = new Enemies(this, enemy.Rush.level, enemy.Rush.camera, enemy.Rush.movement, enemy.Rush.x, enemy.Rush.y, enemy.Rush.coordinates, enemy.Rush.sprite);
        // testing accessing enemy stuff
        //let bernardTest = my.sprite.bernard.movement[3];
        //let bernardTest = "leftHallway";

        //console.log(this.roomD.leftHallway.bernard.pos.x);
        //console.log(this.roomD[bernardTest].bernard.pos.x);

        // CAMERA STUFF ////////////////////////////////////////////////////////////////////////

        my.sprite.camFilter = this.add.sprite(game.config.width/2, game.config.height/2, "cameraFilter").setAlpha(0.1).setVisible(false);
        my.sprite.camFilter.depth = 2;
        my.sprite.camMap = this.add.sprite(game.config.width/2, game.config.height/2, "camMap").setScale(1.1).setVisible(false);

        // place camera button at bottom of screen
        my.sprite.camButton = this.add.sprite(960, 1000, "cameraButton").setScale(1.5, 0.5).setAlpha(0.3);

        // CAMERA BUTTONS //////////////////////////////////////////////////////////////////////

        // camera buttons group
        this.camButtons = this.add.group();

                // this.createCamButton(x, y, buttonTexture, scale); ref for function

        my.sprite.activeCam;

        // camera button for left hallway corner
        let camButton_leftHallwayCorner = this.createCamButton(1550, 900, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_leftHallwayCorner.on('pointerdown', function (pointer) {
            // pointer.x and pointer.y gives coordinates of the click
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_leftHallwayCorner;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("leftHallwayCorner");
        });

        // camera button for right hallway
        let camButton_rightHallwayCorner = this.createCamButton(1700, 900, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_rightHallwayCorner.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_rightHallwayCorner;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("hallwayCorner_right");
        });

        // camera button for left hallway
        let camButton_leftHallway = this.createCamButton(1550, 800, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_leftHallway.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_leftHallway;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("leftHallway");
        });

        // camera button for right hallway
        let camButton_rightHallway = this.createCamButton(1700, 800, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_rightHallway.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_rightHallway;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("hallway_right");
        });

        // camera button for right hallway
        let camButton_goldenFreddyCloset = this.createCamButton(1400, 750, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_goldenFreddyCloset.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_goldenFreddyCloset;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("goldenFreddyCloset");
        });

        // camera button for right hallway
        let camButton_arcade = this.createCamButton(1850, 750, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_arcade.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_arcade;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("arcade");
        });

        // camera button for right hallway
        let camButton_pirateCove = this.createCamButton(1500, 650, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_pirateCove.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_pirateCove;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("pirateCove");
        });

        // camera button for right hallway
        let camButton_backroom = this.createCamButton(1400, 550, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_backroom.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_backroom;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("backRoom");
        });

        // camera button for right hallway
        let camButton_kitchen = this.createCamButton(1860, 550, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_kitchen.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_kitchen;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("kitchen");
        });

        // camera button for right hallway
        let camButton_mainHall = this.createCamButton(1600, 550, "roomButton", 0.4);
        // listener for camera button getting clicked
        camButton_mainHall.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_mainHall;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("mainRoom");
        });

        // camera button for right hallway
        let camButton_mainStage = this.createCamButton(1650, 450, "roomButton_active", 0.4);
        my.sprite.activeCam = camButton_mainStage;
        // listener for camera button getting clicked
        camButton_mainStage.on('pointerdown', function (pointer) {
            my.sprite.activeCam.setTexture("roomButton");
            my.sprite.activeCam = camButton_mainStage;
            my.sprite.activeCam.setTexture("roomButton_active");
            my.sprite.curCam.setTexture("mainStage");
        });

        // TEXT STUFF //////////////////////////////////////////////////////////////////////////

        // place clock text in upper right of screen
        this.clockText = this.add.text(1880, 80, "12:00", { font: '64px Courier', fill: '#ff0000' }).setOrigin(1, 1);

        // place Night Label text
        this.nightLabel = this.add.text(1880, 140, "TEST NIGHT", { font: '48px Courier', fill: '#ff0000' }).setOrigin(1, 1);        

        // timer for the night
        this.nightTimer = this.time.addEvent({
            delay: 360000, // duration of timer in milliseconds
            callback: this.hasWon, // what function is called when timer ends
            args: [], // dunno, but don't need it right now
            callbackScope: this, // scope of callback (set to global, I think)
            loop: false, // does the timer loop (no lmao) (could be used for animatronic ai timers)
            repeat: 0, // how many times does timer repeat
            startAt: 0, // sets amount of first timer to skip in milliseconds
            timeScale: 1, // time scale (1 is normal)
            paused: false, // do I need to freaking tell you >:(
        });

        // place Power Label text
        this.powerLabel = this.add.text(0, 1020, "PWR: 100%", { font: '48px Courier', fill: '#ff0000' }).setOrigin(1, 1);  

        // timer for the powerUpdateTick
        this.powerTimer = this.time.addEvent({
            delay: 1000, // duration of timer in milliseconds
            callback: this.updatePower, // what function is called when timer ends
            args: [], // dunno, but don't need it right now
            callbackScope: this, // scope of callback (set to global, I think)
            loop: true, // does the timer loop (no lmao) (could be used for animatronic ai timers)
            repeat: 0, // how many times does timer repeat
            startAt: 0, // sets amount of first timer to skip in milliseconds
            timeScale: 1, // time scale (1 is normal)
            paused: false, // do I need to freaking tell you >:(
        });

        // space key listener
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time, delta) {

        // CONVENIENCE VARIABLES ///////////////////////////////////////////////////////////////

        // variable to access delta time
        let dTime = (delta / 1000); // CURRENTLY NOT USED; CHECK AND MAKE SURE IT GETS USED AT SOME POINT, OR DELETE IT
        // variable to hold elapsed seconds
        let elapsedSeconds = Math.floor(this.nightTimer.getElapsedSeconds());
        // variable to hold elapsed minutes
        let elapsedMinutes = Math.floor(elapsedSeconds/60);
        // mouse pointer tracker - remember: mouse pos is in pixels
        let pointer = this.input.activePointer;
        // current scroll position of camera
        this.shiftPos = this.cameras.main.scrollX;

        // VIEW SHIFT //////////////////////////////////////////////////////////////////////////

        let burger = 0; // burger is a helper var that stops the UI from shifting all weird on the screen
        if(pointer.x < 200 && this.shiftPos > -this.CAM_SHIFT_AMOUNT && !this.camsAreOpen) {
            this.cameras.main.scrollX -= this.CAM_SHIFT_SPEED; burger = -1;
        }
        if(pointer.x > 1720 && this.shiftPos < this.CAM_SHIFT_AMOUNT && !this.camsAreOpen) {
            this.cameras.main.scrollX += this.CAM_SHIFT_SPEED; burger = 1;
        }

        // if power is on, do normal game loop
        if(!this.powerIsOut) {

            // ENEMY LOGIC /////////////////////////////////////////////////////////////////////////

            // place enemy in cams unless at door
            if(my.sprite.bernard.attackState == false) { my.sprite.bernard.update(this.cameras.main, my.sprite.curCam, elapsedMinutes, this.shiftPos);}
            if(my.sprite.phaser.attackState == false) { my.sprite.phaser.update(this.cameras.main, my.sprite.curCam, elapsedMinutes, this.shiftPos);}
            if(my.sprite.dylan.attackState == false) { my.sprite.dylan.update(this.cameras.main, my.sprite.curCam, elapsedMinutes, this.shiftPos);}
            if(my.sprite.rush.attackState == false) { my.sprite.rush.update(this.cameras.main, my.sprite.curCam, elapsedMinutes, this.shiftPos);}
            // every second (for offset, set initial value of timer higher)
            if(this.bernardTimer <= 0) {
                my.sprite.bernard.moveEnemy(this.camsAreOpen, this.leftDoorClosed);
                this.bernardTimer = 1.0;
            } else { this.bernardTimer -= dTime; }

            // TIMER STUFF /////////////////////////////////////////////////////////////////////////

            // DEBUG TIMER
            //this.clockText.setText(elapsedSeconds + " seconds; " + elapsedMinutes + " minutes; night over: " + this.HAS_WON); 

            /*
            // real game timer (no seconds)
            // if at hour 0, make timer say 12
            if(elapsedMinutes == 0) {this.clockText.setText("12:00"); }
            else {this.clockText.setText(" " + elapsedMinutes + ":00"); }
            */
            
            // real game timer (yes seconds)
            // if at hour 0, make timer say 12
            // also both check if sec < 10, then add display 0
            let spM = elapsedSeconds % 60; // seconds per minute
            if(elapsedMinutes == 0) {
                if(spM < 10) { this.clockText.setText("12:0" + spM); }
                        else { this.clockText.setText("12:" + spM); }
            } else {
                if(spM < 10) { this.clockText.setText(" " + elapsedMinutes+":0" + spM); }
                        else { this.clockText.setText(" " + elapsedMinutes + ":" + spM); }
            }
            
            // CAMERA STUFF ////////////////////////////////////////////////////////////////////////

            // if mouse is hovering over bottom center of screen and the cams haven't been toggled, toggle cams
            /* note to anyone looking at this; YES I could have used the built in sprite hovering detection
            from the mouse pointer, but it was being super finnicky, so hard coding it is :) */
            if((pointer.x > 400 && pointer.x < 1520 && pointer.y > 950 && !this.hasToggledCams) || (this.spaceKey.isDown && !this.hasToggledCams_space)) {

                // if cams are open, close them
                if(this.camsAreOpen) {
                    // make camera screen invisible
                    my.sprite.curCam.visible = false;
                    my.sprite.camFilter.visible = false;
                    my.sprite.camMap.visible = false;
                    // toggle current cam state
                    this.camsAreOpen = false;
                } else { // otherwise, open them
                    // make camera screen visible 
                    my.sprite.curCam.visible = true;
                    my.sprite.camFilter.visible = true;
                    my.sprite.camMap.visible = true;
                    // toggle current cam state
                    this.camsAreOpen = true;
                }

                // flip button sprite
                my.sprite.camButton.flipY = !my.sprite.camButton.flipY;
                // set camera toggle (prevents multi triggering)
                this.hasToggledCams = true;
                // THIS IS BEING IMPLEMENTED IN A GROSS MANNER SPECIFICALLY FOR JADE; GOT A PROBLEM WITH IT? BRING IT UP WITH HER.
                // if the space bar was pressed, set camera space toggle
                if(this.spaceKey.isDown) { this.hasToggledCams_space = true;}
            // if mouse is not hovering over button, and camera toggle hasn't been reset, do so now
            } else if(((pointer.x < 400 || pointer.x > 1520 || pointer.y < 950) && this.hasToggledCams) || (!this.spaceKey.isDown && this.hasToggledCams_space))
            { this.hasToggledCams = false; if(!this.spaceKey.isDown) { this.hasToggledCams_space = false; } }

            // UI STUFF ////////////////////////////////////////////////////////////////////////////

            // offset ui to be relative to current screen scroll position
            this.clockText.setPosition(1880 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), this.clockText.y);
            this.nightLabel.setPosition(1880 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), this.nightLabel.y);
            this.powerLabel.setPosition(1880 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), this.powerLabel.y);
            my.sprite.curCam.setPosition(960 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), 540);
            my.sprite.camFilter.setPosition(960 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), 540);
            my.sprite.camMap.setPosition(1625 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), 680);
            my.sprite.camButton.setPosition(960 + this.shiftPos + (this.CAM_SHIFT_SPEED * burger), 1000);

            // CAMERA BUTTONS //////////////////////////////////////////////////////////////////////

            // loop through every camera button
            /* hasGorbed helps prevent rerunning this code
            over and over again, hopefully helping with performance :) */
            this.camButtons.children.iterate((camButton) => { if(camButton) {

                if(this.camsAreOpen && camButton.hasGorbed == false) {
                    // offset button location with current shift position
                    camButton.x = camButton.baseX + this.shiftPos;
                    camButton.setVisible(true); // set button to visible
                    camButton.hasGorbed = true;
                }
                else if(!this.camsAreOpen && camButton.hasGorbed == true) {
                    camButton.setVisible(false); // set button to invisible
                    camButton.hasGorbed = false;
                }
            }});

        } else { // otherwise, do powerout sequence



            //TODO: do the powerout sequnce
            this.scene.start("loseScene");



        }
 
    }

    // HELPER FUNCTIONS //

    // can prob just use this function to load the win scene
    updatePower() {
        // define default power loss to a value of 1 per second
        let powerSubtraction = 1;

        if(this.leftDoorClosed)  { powerSubtraction += 2; }
        if(this.rightDoorClosed) { powerSubtraction += 2; }
        if(this.camsAreOpen)     { powerSubtraction += 1; }

        this.power -= powerSubtraction;

        let powerPercent = Math.trunc((this.power / this.MAX_POWER) * 100);

        // if power is less than or eqaul to zero, and power out hasn't started, begin
        if(powerPercent <= 0 && this.powerIsOut == false) {

            this.nightLabel.setVisible(false);
            this.clockText.setVisible(false);
            this.powerTimer.isPaused = false;
            this.powerLabel.setVisible(false);
            my.sprite.camButton.setVisible(false);

            // if cams are open, disable camera buttons
            this.camButtons.children.iterate((camButton) => { if(camButton) { 
                if(!this.camsAreOpen && camButton.hasGorbed == true) {
                    camButton.setVisible(false); // set button to invisible
                    camButton.hasGorbed = false;
                }
            }});
            // then disable the camera display
            if(this.camsAreOpen) {
                    // make camera screen invisible
                    my.sprite.curCam.visible = false;
                    my.sprite.camFilter.visible = false;
                    my.sprite.camMap.visible = false;
                    // toggle current cam state
                    this.camsAreOpen = false;
            }

            // next open the doors if they're closed
            if(this.rightDoorClosed) {
                my.sprite.doorButtonRight.setTexture("doorButton_open");
                this.rightDoorClosed = false;
                this.doorRightIsMoving = true;
                this.tweens.add({
                    targets: my.sprite.doorRight,
                    y: -500,
                    duration: 1000, // Duration in milliseconds
                    ease: 'Power1', // Easing function
                    onComplete: () => { this.doorRightIsMoving = false; }
                });
            }

            if(this.leftDoorClosed) {
                my.sprite.doorButtonLeft.setTexture("doorButton_open");
                this.leftDoorClosed = false;
                this.doorLeftIsMoving = true;
                this.tweens.add({
                    targets: my.sprite.doorLeft,
                    y: -500,
                    duration: 1000, // Duration in milliseconds
                    ease: 'Power1', // Easing function
                    onComplete: () => { this.doorLeftIsMoving = false; }
                });
            }

            my.sprite.doorButtonLeft.setVisible(false);
            my.sprite.doorButtonRight.setVisible(false);

            my.sprite.doorLeft.setTexture("door_blackout");
            my.sprite.doorRight.setTexture("door_blackout");

            my.sprite.office.setTexture("office_blackout");

            this.powerIsOut = true;
        }

        let spaces = "";
        if(powerPercent < 100) { spaces = " "; if(powerPercent < 10) { spaces = "  " } }
        this.powerLabel.setText("PWR: " + powerPercent + "%" + spaces);
    }

    // called when 6 AM is reached
    // can prob just use this function to load the win scene
    hasWon() { this.HAS_WON = true; this.scene.start("winScene"); }

    // creates new button sprite and adds it to buttons
    createCamButton(x, y, sprite, scale) {
        let newGroupMember = this.camButtons.create(x, y, sprite).setInteractive();
        newGroupMember.baseX = x; // default x position before moving
        newGroupMember.hasGorbed = false; // helper var
        newGroupMember.setScale(scale); // set scale of sprite
        newGroupMember.setVisible(false);
        return newGroupMember; // return new button
    }
}