class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

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

        // load default camera image
        this.load.image("camera_placeholder", "camera_placeholder.png");

        // THE GREAT CAMERA BACKGROUND DUMP
        this.load.image("hallway_right", "hallway_right.png");
        this.load.image("hallway_left", "hallway_left.png");

        this.load.image("hallwayCorner_left", "hallwayCorner_left.png");       
        this.load.image("hallwayCorner_right", "hallwayCorner_right.png");       

        this.load.image("goldenFreddyCloset_left", "freddyCloset.png");       
        this.load.image("arcade", "arcade.png");       

        this.load.image("pirateCove_left", "pirateCove_0.png");       

        this.load.image("backRoom_left", "backRoom.png");       
        this.load.image("kitchen_right", "kitchen.png");      

        this.load.image("mainRoom_center", "mainHall.png");       
        this.load.image("mainStage_center", "mainStage.png");       

        // load camera stripe pattern
        this.load.image("cameraFilter", "camera_Stripes.png");
        this.load.image("camMap", "camMap.png");


        // load rooms json file
        this.load.json('roomData', 'roomData.json');
        this.load.json("enemiesNightOne", "enemiesNightOne.json");
    }

    create() {

        // access var that lets us read the room data
        //const roomD = this.cache.json.get('roomData');

        //console.log(roomD.rooms[0].connectedRooms[0]); // returns, "Office"
        //console.log(roomD.rooms[1].connectedRooms[1]); // returns, "leftHallway"
        //console.log(roomD.rooms[0]); // returns leftHallway room data








         // ...and pass to the next Scene
         this.scene.start("testNightScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}