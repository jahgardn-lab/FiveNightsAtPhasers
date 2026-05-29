class TestNight extends Phaser.Scene {
    constructor() {
        super("testNightScene");
    }

    preload() {
    }

    init() {
        this.HAS_WON = false;
    }

    create() {

        // place clock text in bottom left of screen
        this.clockText = this.add.text(1880, 80, "12:00", { font: '64px Courier', fill: '#ff0000' }).setOrigin(1, 1);
        //this.clockText.depth = -9998;
        // place Night Label text
        this.nightLabel = this.add.text(1880, 140, "TEST NIGHT", { font: '48px Courier', fill: '#ff0000' }).setOrigin(1, 1);        

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
    }

    update(delta, time) {
        // CONVENIENCE VARIABLES //
        // variable to access delta time
        let dTime = (delta/1000); // CURRENTLY NOT USED; CHECK AND MAKE SURE IT GETS USED AT SOME POINT, OR DELETE IT
        // variable to hold elapsed seconds
        let elapsedSeconds = Math.floor(this.nightTimer.getElapsedSeconds());
        let elapsedMinutes = Math.floor(elapsedSeconds/60);
        
        // TIMER STUFF //

        // DEBUG TIMER
        //this.clockText.setText(elapsedSeconds + " seconds; " + elapsedMinutes + " minutes; night over: " + this.HAS_WON); 

        // real game timer (no seconds)
        // if at hour 0, make timer say 12
        //if(elapsedMinutes == 0) {this.clockText.setText("12:00"); }
        //else {this.clockText.setText(" " + elapsedMinutes + ":00"); }
        
        // real game timer (yes seconds)
        // if at hour 0, make timer say 12
        // also both check if sec < 10, then add display 0
        let spM = elapsedSeconds % 60; // seconds per minute
        if(elapsedMinutes == 0) {
            if(spM < 10) { this.clockText.setText("12:0" + spM); }
            else { this.clockText.setText("12:" + spM); }
        }
        else {
            if(spM < 10) {this.clockText.setText(" " + elapsedMinutes+":0" + spM); }
            else { this.clockText.setText(" " + elapsedMinutes + ":" + spM); }
        }












    }

    // HELPER FUNCTIONS //

    // called when 6 AM is reached
    // can prob just use this function to load the win scene
    hasWon() { this.HAS_WON = true; }
}
