class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // AUDIO //

        // background Ambience
        this.load.audio("ambience", "ES_Ambience, Room Tone, Quiet Hotel Room, Morning - Epidemic Sound.mp3");
        // enemy knocking sound
        this.load.audio("knock", "ES_Doors, Knock, Metal Garage Door, Knocking 03 - Epidemic Sound.mp3");
        // door slam sound
        this.load.audio("doorClose", "ES_Doors, Metal, Garage, Aggressive, Slam - Epidemic Sound.mp3");
        // ui sound
        this.load.audio("button", "ES_User Interface, Click, UI Buttons, Bubbly, Option - Epidemic Sound.mp3");
        // camera open/close sound
        this.load.audio("cameraSwitch", "cameraSwitch.mp3");
        // win sound
        this.load.audio("nightOver", "nightOver.mp3");
        // horrible jumpscare sound
        this.load.audio("jumpscare", "horribleSound.mp3");
        // spooky powerOut ambience
        this.load.audio("spookyAmbience", "ES_Ambience, Scifi, Space Atmosphere, Dark, Creepy, Resonant - Epidemic Sound.mp3");

        // phonecall stuff
        this.load.audio("phonecall", "PhoneCall.mp3");
        this.load.audio("phonecallEnd", "phoneJingle.mp3");

        // IMAGES //

        // load confetti image
        this.load.image("confetti", "confetti.png");

        // load lose scene
        this.load.image("loseScene", "LoseScene.png");

        // load win scene image
        this.load.image("winScene", "winSceneBlackBars.png");

        // load camera button
        this.load.image("cameraButton", "cameraButton.png");
        // camera location buttons
        this.load.image("roomButton", "roomsButtons.png");
        this.load.image("roomButton_active", "roomsButtons_active.png");
        // load office sprites
        this.load.image("office", "office.png");
        this.load.image("office_blackout", "office_blackout.png");
        
        // load door button sprites
        this.load.image("doorButton_closed", "doorsSwitch_on.png");
        this.load.image("doorButton_open", "doorsSwitch_off.png");

        // load door sprites
        this.load.image("door", "door.png");
        this.load.image("door_blackout", "door_blackout.png");

        // THE GREAT CAMERA BACKGROUND DUMP
        this.load.image("hallway_right", "hallway_right.png");
        this.load.image("hallwayCorner_right", "hallwayCorner_right.png");       
        
        this.load.image("hallway_left", "hallway_left.png");
        this.load.image("hallwayCorner_left", "hallwayCorner_left.png");       

        this.load.image("goldenFreddyCloset", "freddyCloset.png");       
        this.load.image("arcade", "arcade.png");       

        this.load.image("pirateCove", "pirateCove_3.png");       

        this.load.image("backRoom", "backRoom.png");       
        this.load.image("kitchen", "kitchen.png");      

        this.load.image("mainRoom", "mainHall.png");       
        this.load.image("mainStage", "mainStage.png");       

        // load camera stripe pattern
        this.load.image("cameraFilter", "camera_Stripes.png");
        this.load.image("camMap", "camMap.png");

        // load animatronic images
        this.load.image("dylanSprite", "dylan_new.png");
        this.load.image("bernardSprite", "jade.png");

        this.load.image("phaserSprite", "phaser_new.png");
        this.load.image("phaserBlackoutSprite", "phaser_blackout1.png");
        this.load.image("phaserBlackoutJumpscareSprite", "phaser_blackoutJumpscare.png");

        this.load.image("rushSprite1", "rushPhase1.png");
        this.load.image("rushSprite2", "rushPhase2.png");
        this.load.image("rushSprite3", "rushPhase3.png");
        this.load.image("rushSprite4", "rushPhase4.png");
        this.load.image("rushSprite5", "rushPhase5.png");

        // load rooms and enemies json files
        this.load.json('roomData', 'roomData.json');
        this.load.json("enemiesNight1", "enemiesNightOne.json");
        this.load.json("enemiesNight2", "enemiesNightTwo.json");
        this.load.json("enemiesNight3", "enemiesNightThree.json");
    }

    create() {
        // ...and pass to the next Scene
        this.scene.start("mainMenuScene");
    }
}