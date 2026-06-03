class Enemies extends Phaser.GameObjects.Sprite{

    constructor(level, camera, movement){
        this.level = level; //AI level for random movement checks, integer
        this.camera = camera; //Can you camera stall the enemy, boolean
        this.movement = movement; //What is this enemy's movement pattern between cameras, array
        this.index = 0; //Index of the current position
        this.position = this.movement[index]; //Set intial postion to first allowed room
        this.attackState = false; //If the enemy is about to attack
    }

    moveEnemy(inCam){
        //Get random number between 1-10 to check against AI level
        let movementOpportunity = Math.floor(Math.random()*10) + 1;
        //If the enemy can be camera stalled and player isn't in cams
        //Or if the enemy isn't able to be camera stalled the enemy takes it movement opportunity
        if((this.camera && !inCam) || !this.camera){
            //If the enemy AI level is greater than or equal to the movementOpportunity it gets to move
            if(this.level >= movementOpportunity){
                //If enemy is in it's final position set it up to attack
                if(this.position == this.movement[this.movement.length-1]){attackPrep();}
                //Else increase current position index by 1 and set the position to movement at index
                else{
                    this.index++;
                    this.position = this.movement[this.index];
                }
            }
        }
    }

    attackPrep(){
        //Get Enemy ready to attack at next chance
        this.attackState = true;
    }

    //Helper Functions that return class variables
    levelReturn(){return this.level;}
    cameraReturn(){return this.camera;}
    movementReturn(){return this.movement;}
    indexReturn(){return this.index;}
    positionReturn(){return this.position;}
    attackStateReturn(){return this.attackState;}

    update(cam){
        this.moveEnemy(cam);
    }
}