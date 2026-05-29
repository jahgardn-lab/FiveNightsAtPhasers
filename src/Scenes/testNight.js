class TestNight extends Phaser.Scene {
    constructor() {
        super("testNightScene");
    }

    preload() {
    }

    init() {
        this.HAS_WON = false;
        this.hasToggledCams = false;
        this.camsAreOpen = false;
    }

    create() {

        my.sprite.office = this.add.sprite(game.config.width/2, game.config.height/2, "office").setScale(1.8);

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

        // place camera button at bottom of screen
        my.sprite.camButton = this.add.sprite(game.config.width/2, 1000, "cameraButton").setScale(1.5, 0.5).setAlpha(0.3);
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
        if(pointer.x > 400 && pointer.x < 1520 && pointer.y > 950 && this.hasToggledCams == false) {

            // toggle current cam state
            this.camsAreOpen = !this.camsAreOpen;

            // if cams are open, close them
            if(this.camsAreOpen) {


            } else { // otherwise, open them


            }

            // flip button sprite
            my.sprite.camButton.flipY = !my.sprite.camButton.flipY;
            this.hasToggledCams = true;
        } else if((pointer.x < 400 || pointer.x > 1520 || pointer.y < 950) && this.hasToggledCams == true) 
        { this.hasToggledCams = false; }






    }

    // HELPER FUNCTIONS //

    // called when 6 AM is reached
    // can prob just use this function to load the win scene
    hasWon() { this.HAS_WON = true; }
}