class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // load camera button
        this.load.image("cameraButton", "cameraButton.png");
        this.load.image("office", "officePlaceholder.png");


        // Load tilemap information
        //this.load.image("tilemap_tiles", "tilemap_packed.png");                   // Packed tilemap
        //this.load.tilemapTiledJSON("three-farmhouses", "three-farmhouses.tmj");   // Tilemap in JSON
    }

    create() {
        

         // ...and pass to the next Scene
         this.scene.start("testNightScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}