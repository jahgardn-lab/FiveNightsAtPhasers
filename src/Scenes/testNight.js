class TestNight extends Phaser.Scene {
    constructor() {
        super("testNightScene");
    }

    preload() {
    }

    init() {
        this.HAS_WON = false;
        this.CAM_SHIFT_AMOUNT = 200;
        this.CAM_SHIFT_SPEED = 15;
        this.hasToggledCams = false;
        this.hasToggledCams_space = false;
        this.camsAreOpen = false;
    }

    create() {
        // access var that lets us read the room data
        this.roomD = this.cache.json.get('roomData');

        // place office background sprite
        my.sprite.office = this.add.sprite(game.config.width/2, game.config.height/2, "office").setScale(1.8);

        // create current camera sprite (defaults to one of our choice)
        my.sprite.curCam = this.add.sprite(game.config.width/2, game.config.height/2, "camera_placeholder").setVisible(false);

        // place camera button at bottom of screen
        my.sprite.camButton = this.add.sprite(960, 1000, "cameraButton").setScale(1.5, 0.5).setAlpha(0.3);

        // CAMERA BUTTONS //////////////////////////////////////////////////////////////////////

        // camera buttons group
        this.camButtons = this.add.group();

                // this.createCamButton(x, y, texture, scale); ref for function

        // camera button for left hallway
        let camButton_leftHallway = this.createCamButton(1200, 800, "roomButton", 0.5);
        // listener for camera button getting clicked
        camButton_leftHallway.on('pointerdown', function (pointer) {
            // pointer.x and pointer.y gives coordinates of the click
            my.sprite.curCam.setTexture("hallway_left");
        });

        // camera button for right hallway
        let camButton_rightHallway = this.createCamButton(1300, 800, "roomButton", 0.5);
        // listener for camera button getting clicked
        camButton_rightHallway.on('pointerdown', function (pointer) {
            // pointer.x and pointer.y gives coordinates of the click
            my.sprite.curCam.setTexture("hallway_right");
        });

        // TEXT STUFF //////////////////////////////////////////////////////////////////////////

        // place clock text in bottom left of screen
        this.clockText = this.add.text(1880, 80, "12:00", { font: '64px Courier', fill: '#ff0000' }).setOrigin(1, 1);
        //this.clockText.depth = -9998;
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

        // space key listener
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(delta, time) {
        // CONVENIENCE VARIABLES ///////////////////////////////////////////////////////////////

        // variable to access delta time
        let dTime = (delta/1000); // CURRENTLY NOT USED; CHECK AND MAKE SURE IT GETS USED AT SOME POINT, OR DELETE IT
        // variable to hold elapsed seconds
        let elapsedSeconds = Math.floor(this.nightTimer.getElapsedSeconds());
        // variable to hold elapsed minutes
        let elapsedMinutes = Math.floor(elapsedSeconds/60);
        // mouse pointer tracker - remember! mouse pos is in pixels
        let pointer = this.input.activePointer;
        // current scroll position of camera
        let shiftPos = this.cameras.main.scrollX;

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
            if(spM < 10) {this.clockText.setText(" " + elapsedMinutes+":0" + spM); }
            else { this.clockText.setText(" " + elapsedMinutes + ":" + spM); }
        }
        
        // CAMERA STUFF ////////////////////////////////////////////////////////////////////////

        // if mouse is hovering over bottom center of screen and the cams haven't been toggled, toggle cams
        /* note to anyone looking at this; YES I could have used the built in sprite hovering
        from the mouse pointer, but it was being super finnicky, so hard coding it is :) */
        if((pointer.x > 400 && pointer.x < 1520 && pointer.y > 950 && !this.hasToggledCams) || (this.spaceKey.isDown && !this.hasToggledCams_space)) {

            // if cams are open, close them
            if(this.camsAreOpen) {

                // TODO: implement camera closing logic
                my.sprite.curCam.visible = false;
                // toggle current cam state
                this.camsAreOpen = false;
            } else { // otherwise, open them

                // TODO: implement camera opening logic
                my.sprite.curCam.visible = true;
                // toggle current cam state
                this.camsAreOpen = true;
            }

            // flip button sprite
            my.sprite.camButton.flipY = !my.sprite.camButton.flipY;
            // set camera toggle (prevents multi triggering)
            this.hasToggledCams = true;
            // THIS IS BEING IMPLEMENTED IN A GROSS MANNER SPECIFICALLY FOR JADE; GOT A PROBLEM WITH IT? BRING IT UP WITH HER.
            if(this.spaceKey.isDown) { this.hasToggledCams_space = true;}
        // if mouse is not hovering over button, and camera toggle hasn't been reset, do so now
        } else if(((pointer.x < 400 || pointer.x > 1520 || pointer.y < 950) && this.hasToggledCams) || (!this.spaceKey.isDown && this.hasToggledCams_space))
        { this.hasToggledCams = false; if(!this.spaceKey.isDown) { this.hasToggledCams_space = false; } }

        // VIEW SHIFT //////////////////////////////////////////////////////////////////////////

        let burger = 0; // burger is a helper var that stops the UI from shifting all weird on the screen
        if(pointer.x < 200 && shiftPos > -this.CAM_SHIFT_AMOUNT && !this.camsAreOpen) {
            this.cameras.main.scrollX -= this.CAM_SHIFT_SPEED; burger = -1;
        }
        if(pointer.x > 1720 && shiftPos < this.CAM_SHIFT_AMOUNT && !this.camsAreOpen) {
            this.cameras.main.scrollX += this.CAM_SHIFT_SPEED; burger = 1;
        }

        // UI STUFF ////////////////////////////////////////////////////////////////////////////

        // offset ui to be relative to current screen scroll position
        this.clockText.setPosition(1880 + shiftPos + (this.CAM_SHIFT_SPEED * burger), this.clockText.y);
        this.nightLabel.setPosition(1880 + shiftPos + (this.CAM_SHIFT_SPEED * burger), this.nightLabel.y);
        my.sprite.curCam.setPosition(960 + shiftPos + (this.CAM_SHIFT_SPEED * burger), 540);
        my.sprite.camButton.setPosition(960 + shiftPos + (this.CAM_SHIFT_SPEED * burger), 1000);

        // CAMERA BUTTONS //////////////////////////////////////////////////////////////////////

        // loop through every camera button
        /* hasGorbed helps prevent rerunning this code
        over and over again, hopefully helping with performance :) */
        this.camButtons.children.iterate((camButton) => { if(camButton) {

            if(this.camsAreOpen && camButton.hasGorbed == false) {
                // offset button location with current shift position
                camButton.x = camButton.baseX + shiftPos;
                camButton.setVisible(true); // set button to visible
                camButton.hasGorbed = true;
            }
            else if(!this.camsAreOpen && camButton.hasGorbed == true) {
                camButton.setVisible(false); // set button to invisible
                camButton.hasGorbed = false;
            }
        }});
    }

    // HELPER FUNCTIONS //

    // called when 6 AM is reached
    // can prob just use this function to load the win scene
    hasWon() { this.HAS_WON = true; }

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