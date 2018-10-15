import { game, Sprite } from "../sgc/sgc.js";
game.setBackground("water.png", 500, 0);
// Back Wall
class wall extends Sprite {
    constructor() {
        super();
        this.name = "Wall";
        this.setImage("wall.png");
        this.x = 0;
        this.y = 175;
        this.accelerateOnBounce = false;
    }
}
class Support extends Sprite {
    constructor(x, y, image) {
        super();
        this.x = x;
        this.y = y;
        this.setImage(image);
    }
}
// Landing Platforms
class Platform extends Support {
    constructor(x, y, image) {
        super(x, y, image);
        this.name = "Platform";
        this.accelerateOnBounce = false;
    }
}
// Sliders
class Sliders extends Support {
    constructor(x, y, angle) {
        super(x, y, "slider.png");
        this.name = "Sliders";
        this.angle = angle;
        this.speed = 48;
    }
}
//Player
class Princess extends Sprite {
    constructor() {
        super();
        this.setImage("ann.png");
        this.x = 48;
        this.y = 300;
        this.speed = 0;
        this.whenWalking = 125;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
        this.isFalling = false;
    }
    handleLeftArrowKey() {
        this.angle = 180;
        this.speed = this.whenWalking;
    }
    handleRightArrowKey() {
        this.angle = 0;
        this.speed = this.whenWalking;
    }
    handleGameLoop() {
        //handle Right Animation
        if (this.angle == 0 && this.speed > 0) {
            this.playAnimation("right");
        }
        //Handle Left Animation
        if (this.angle > 0 && this.speed > 0) {
            this.playAnimation("left");
        }
        //Stop from moving off Sides
        this.x = Math.max(5, this.x);
        //Handle Gravity
        this.isFalling = false;
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 1, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true;
            this.y = this.y + 4;
        }
    }
}
new wall();
let startPlatform = new Platform(0, 400, "start.png");
let finishPlatform = new Platform((game.displayWidth - (48 * 2)), 400, "finish.png");
new Sliders(startPlatform.x + 48 * 3, startPlatform.y + 48, 0);
new Sliders(finishPlatform.x - 48 * 5, finishPlatform.y + 48, 180);
let player = new Princess();
