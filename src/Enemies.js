class Enemies extends Phaser.GameObjects.Sprite{

    constructor(scene, level, camera, movement, x, y, coordinates, sprite){
        super(scene, x, y, sprite);
        scene.add.existing(this);
    
        this.level = level; //AI level for random movement checks, integer
        this.hasIncreased = 0;//If the AI level has increased
        this.camera = camera; //Can you camera stall the enemy, boolean
        this.chosenMoveArray = 1//Math.floor(Math.random()*2);
        this.movement = movement[this.chosenMoveArray]; //What is this enemy's movement pattern between cameras, array
        this.index = 0; //Index of the current position
        this.position = this.movement[this.index]; //Set intial postion to first allowed room
        this.attackState = false; //If the enemy is about to attack
        this.justMoved = false; //If the enemy just succeeded a movemenet opportunity
        this.coordinates = coordinates[this.chosenMoveArray];//Camera coordinates for the chosen movement array

        this.coveLevel = 0;//Pirate cove enemys phase level

        //TODO
        this.doorPosX = x;//Dylan wtf do these variables do please leave a comment
        this.doorPosY = y;
        // they set where the animatronic stands when they are in the door state. since their default position is almost immediatly overwritten by update, I used the sprite's starting position to determine where they would stand for attacking the door. However, I haven't check what you've changed, so perhaps this is antiquated.

        //this.enemyD = scene.cache.json.get('');//Json holding all enemy data

        this.enemyKnock = this.scene.sound.add('knock', {
            volume: 0.5,
            loop: false
        });

        this.jumpscare = this.scene.sound.add('jumpscare', {
            volume: 0.5,
            loop: false
        });
    }

    moveEnemy(inCam, doorIsClosed, shiftPos){
        //Get random number between 1-10 to check against AI level
        let movementOpportunity = Math.floor(Math.random()*20) + 1;
        //If the enemy can be camera stalled and player isn't in cams
        //Or if the enemy isn't able to be camera stalled the enemy takes it movement opportunity
        if((this.camera && !inCam) || !this.camera){
            //If the enemy AI level is greater than or equal to the movementOpportunity it gets to move
            if(this.level >= movementOpportunity){
                //If enemy is in it's final position set it up to attack
                if(this.position == this.movement[this.movement.length-1]) {this.attackPrep(doorIsClosed, shiftPos);}
                //Else increase current position index by 1 and set the position to movement at index
                else{
                    this.index++;
                    this.position = this.movement[this.index];
                }
                this.justMoved = true;
                return true;
            }
        }
        return false;
    }

    attackPrep(doorIsClosed, shiftPos){
        //Get Enemy ready to attack at next chance
        // if enemy is ready to kill, place at respective door
        if(this.attackState == false) {
            // place at back of screen
            this.x = this.doorPosX;
            this.y = this.doorPosY;
            this.scale = 1;
            this.depth = -999;
            this.visible = true;
            this.attackState = true;
        } 
        else { // otherwise, kill time
            if(doorIsClosed == true) {
                this.index = 0;
                this.coveLevel = 0;
                this.position = this.movement[this.index];

                // if farther to the right of the screen, set audio pan to right
                if(this.doorPosX > 960) { this.enemyKnock.pan = 0.5; }
                else { this.enemyKnock.pan = -0.5; }
                this.enemyKnock.play();


                this.attackState = false;
            }
            else{
                console.log("you're dead :)");

                this.depth = 999;
                this.scale = 5;
                this.x = 960 + shiftPos;
                this.y = 2060;
                let shakeIntensity = 200;

                this.jumpscare.play();

                let shakeTimeX = Phaser.Math.Between(15, 35);
                let shakeTimeY = Phaser.Math.Between(15, 35);

                this.scene.tweens.add({
                    targets: my.sprite.phaser,
                    x: my.sprite.phaser.x + shakeIntensity,
                    //y: my.sprite.phaser.y + shakeIntensity,
                    duration: shakeTimeX,           // Very fast movements (50ms)
                    ease: 'Sine.easeInOut',
                    //ease: 'Bounce',
                    yoyo: true,             // Move back to origin
                    repeat: 15,             // Number of shakes
                    onComplete: () => {
                        // send to lose screen
                        this.jumpscare.stop();
                        this.scene.backgroundAmbience.stop();
                        this.scene.scene.start("loseScene");
                    }
                });

                this.scene.tweens.add({
                    targets: my.sprite.phaser,
                    //x: my.sprite.phaser.x + shakeIntensity,
                    y: my.sprite.phaser.y + shakeIntensity,
                    duration: shakeTimeY,           // Very fast movements (50ms)
                    ease: 'Sine.easeInOut',
                    //ease: 'Bounce',
                    yoyo: true,             // Move back to origin
                    repeat: 15,             // Number of shakes
                    onComplete: () => {
                        // send to lose screen
                        this.jumpscare.stop();
                        this.scene.backgroundAmbience.stop();
                        this.scene.scene.start("loseScene");                    
                    }
                });
            }
        }
    }

    coveMove(doorIsClosed, inCam, shiftPos){
        //Get random number between 1-10 to check against AI level
        let movementOpportunity = Math.floor(Math.random()*20) + 1;
        if(this.level >= movementOpportunity){
            if(this.coveLevel >= 5){
                //set level to max so that "running occurs and Rush takes every movement to get to office
                this.level = 20;
                //If enemy is in it's final position set it up to attack
                if(this.position == this.movement[this.movement.length-1]) { this.attackPrep(doorIsClosed, shiftPos); }
                //Else increase current position index by 1 and set the position to movement at index
                else{
                    this.index++;
                    this.position = this.movement[this.index];
                }
            }
            //increase coveLevel is player isnt in cams
            else if(!inCam){this.coveLevel++;}
            this.justMoved = true;
            return true;
        }
        return false;
    }

    //Helper Functions that return class variables
    levelReturn(){return this.level;}
    cameraReturn(){return this.camera;}
    movementReturn(){return this.movement;}
    indexReturn(){return this.index;}
    positionReturn(){return this.position;}
    attackStateReturn(){return this.attackState;}
    coveLevelReturn(){return this.coveLevel;}

    resetLevel(level){this.level = level;}

    update(cam, curCam, time, shiftPos){
        // NOTE: shift pos is the current camera movement offset (sent from main night script)
        if(this.justMoved){
            this.justMoved = false;
            //here can play any sound effects or handle anything else when enemy just moved
            if(this.camera){
                
            }
        }
        
       // this.access = this.roomD[this.postion];
        //if the player is on the same cam as the enemy's position & the cams are visible, set enemy visible else hide it
        //Also sets 
        if(curCam.texture.key == this.position && curCam.visible == true) {
            this.x = this.coordinates[this.index][0]+shiftPos;
            this.y = this.coordinates[this.index][1];
            this.setScale(this.coordinates[this.index][2]);
           //TODO
            this.depth = 1;//what is this for Dylan? it was to make the animatronics appear at correct camera depth. The way the "at the door" mechanic worked is when the animatronic was at the door, this update function would stop firing, and the enemy's depth (ie where they appear in sprite layering) would be set to the back. That way, they would appear behind the door, the office, and whatnot. Then, when update started firing again, the enemy's depth would get reset to being good for the cameras
            this.visible = true;
        } else {this.visible = false;}

        //if enemy is in office/attack state hide them 
        if(this.attackState == true){this.visible = false;}

        if(this.camera && this.movement[0] == "pirateCove" && this.coveLevel==0){this.visible = false;}
    
        //at certain times increase level by number
        if(time == 2 && this.hasIncreased == 0){this.level += 2; this.hasIncreased += 1;}
        if(time == 4 && this.hasIncreased == 1){this.level += 1; this.hasIncreased += 1;}
    }
}