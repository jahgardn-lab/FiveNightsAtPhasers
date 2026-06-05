class Enemies extends Phaser.GameObjects.Sprite{

    constructor(scene, level, camera, movement, x, y, sprite){
        super(scene, x, y, sprite);
        scene.add.existing(this);
    
        this.level = level; //AI level for random movement checks, integer
        this.camera = camera; //Can you camera stall the enemy, boolean
        this.movement = movement; //What is this enemy's movement pattern between cameras, array
        this.index = 0; //Index of the current position
        this.position = this.movement[this.index]; //Set intial postion to first allowed room
        this.attackState = false; //If the enemy is about to attack
        this.justMoved = false;

        this.hasIncreased = 0;
        this.roomD = scene.cache.json.get('roomData');

        this.doorPosX = x;
        this.doorPosY = y;

    }

    moveEnemy(inCam, doorIsClosed){
        //Get random number between 1-10 to check against AI level
        let movementOpportunity = Math.floor(Math.random()*20) + 1;
        //If the enemy can be camera stalled and player isn't in cams
        //Or if the enemy isn't able to be camera stalled the enemy takes it movement opportunity
        if((this.camera && !inCam) || !this.camera){
            //If the enemy AI level is greater than or equal to the movementOpportunity it gets to move
            if(this.level >= movementOpportunity){
                //If enemy is in it's final position set it up to attack
                if(this.position == this.movement[this.movement.length-1]){this.attackPrep(doorIsClosed);}
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

    attackPrep(doorIsClosed){
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
        } else { // otherwise, kill time

            if(doorIsClosed == true) {
                this.index = 0;
                this.position = this.movement[this.index];
                this.attackState = false;
            }
            else
            {
                console.log("you're dead :)");

            }
        }

    }

    //Helper Functions that return class variables
    levelReturn(){return this.level;}
    cameraReturn(){return this.camera;}
    movementReturn(){return this.movement;}
    indexReturn(){return this.index;}
    positionReturn(){return this.position;}
    attackStateReturn(){return this.attackState;}

    update(cam, curCam, time, shiftPos){
        // NOTE: shift pos is the current camera movement offset (sent from main night script)
        if(this.justMoved){
            this.justMoved = false;
            //here can play any sound effects or handle anything else when enemy just moved
            if(this.camera){
                
            }
        }
        
        //if the player is on the same cam as the enemy's position & the cams are visible, set enemy visible else hide it
        if(curCam.texture.key == this.position && curCam.visible == true) {
            this.x = this.roomD[this.position].bernard.pos.x + shiftPos;
            this.y = this.roomD[this.position].bernard.pos.y;
            this.setScale(this.roomD[this.position].bernard.scale.x, this.roomD[this.position].bernard.scale.y);
            this.depth = 1;
            this.visible = true;
        } else {this.visible = false;}

        //if enemy is in office/attack state hide them 
        if(this.attackState == true){this.visible = false;}

        //at certain times increase level by number
        if(time == 2 && this.hasIncreased == 0){this.level += 2; this.hasIncreased += 1;}
        if(time == 4 && this.hasIncreased == 1){this.level += 1; this.hasIncreased += 1;}
    }
}