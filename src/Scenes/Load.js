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




        // load rooms json file
        this.load.json('roomData', 'roomData.json');
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