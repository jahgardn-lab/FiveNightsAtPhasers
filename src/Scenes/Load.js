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
        // load office sprite
        this.load.image("office", "officePlaceholder.png");
        
        // load door button sprites
        this.load.image("doorButton_closed", "doorButton_closed.png");
        this.load.image("doorButton_open", "doorButton_open.png");

        // load door sprite
        this.load.image("door", "DORE.png");

        // load default camera image
        this.load.image("camera_placeholder", "camera_placeholder.png");

        // THE GREAT CAMERA BACKGROUND DUMP
        this.load.image("hallway_right", "hallway_right.png");
        this.load.image("hallway_left", "hallway_left.png");

        this.load.image("hallwayCorner_left", "hallwayCorner_left.png");       
        this.load.image("hallwayCorner_right", "hallwayCorner_right.png");       

        this.load.image("goldenFreddyCloset_left", "goldenFreddyCloset_left.png");       
        this.load.image("idkLMAO_right", "idkLMAO_right.png");       

        this.load.image("pirateCove_left", "pirateCove_left.png");       

        this.load.image("backRoom_left", "backRoom_left.png");       
        this.load.image("kitchen_right", "kitchen_right.png");      

        this.load.image("mainRoom_center", "mainRoom_center.png");       
        this.load.image("mainStage_center", "mainStage_center.png");       


        // load rooms json file
        this.load.json('roomData', 'roomData.json');
        this.load.json("enemiesNightOne", "enemiesNightOne");
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