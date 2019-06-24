

// room size
var sizex = 1000;
var sizey = 500;


var p1Offset = 0;
var p2Offset = 0;



// bullets
var playerBullets = [];

// 2D canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");


// create background window (500x500 white square)
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 500, 500);

// player
class player {
    constructor(x, y, col) {
        this.speed = 2;
        this.color = col;
        this.x = x;
        this.y = 400;
        this.width = 15;
        this.height = 70;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
let p1 = new player(50, 400, "blue");
let p2 = new player(950, 400, "red");

// create a bullet
function Bullet(I) {
    I.active = true;
    I.xVelocity = 0;
    I.yVelocity = -I.speed;
    I.width = 3;
    I.height = 3;
    I.color = "#000";

    // check whether bullet is within canvas
    I.inBounds = function () {
        return I.x >= 0 && I.x <= sizex &&
            I.y >= 0 && I.y <= sizey;
    };

    // draw bullet
    I.draw = function () {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    // udpate bullet
    I.update = function () {
        I.x += I.xVelocity;
        I.y += I.yVelocity;

        I.active = I.active && I.inBounds();
    };

    return I;
}

// manage key strokes (key down)
document.addEventListener('keydown', function (event) {
    if (isPlayer1) {

        if (event.keyCode == 87) {// left arrow pressed
            // move left
            p1Offset = -p1.speed;

        }

        else if (event.keyCode == 83) {// S pressed
            // move down
            p1Offset = p1.speed;
        }

    }
    else {

        if (event.keyCode == 87) {// left arrow pressed
            // move left
            p2Offset = -p2.speed;
        }

        else if (event.keyCode == 83) {// S pressed
            // move down
            p2Offset = p2.speed;
        }
    }
});

// manage key strokes (key up)
document.addEventListener('keyup', function (event) {
    if (isPlayer1) {

        if (event.keyCode == 87) {// left arrow pressed
            // move left
            p1Offset = 0;
        }

        else if (event.keyCode == 83) {// right arrow pressed
            // move right
            p1Offset = 0;
        }
    }
    else {

        if (event.keyCode == 87) {// left arrow pressed
            // move left
            p2Offset = 0;
        }

        else if (event.keyCode == 83) {// right arrow pressed
            // move right
            p2Offset = 0;
        }
    }

});

// call draw0 function every 1ms
setInterval(draw, 16);

// main function
function draw() {

    // clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, sizex, sizey);

    //update database state
    if (RoomID != "") {
        if (isPlayer1)
            database.ref(RoomID).child("blueY").set(p1.y.toString());
        else
            database.ref(RoomID).child("redY").set(p2.y.toString());

        if (isPlayer1)
            database.ref(RoomID).on("value", p1Get, errData);
        else
            database.ref(RoomID).on("value", p2Get, errData);

        //update each player
        if (isPlayer1) {
            p1.y = p1.y + p1Offset;
            p2.y = GameState.redY;
        }
        else {
            p1.y = GameState.blueY;
            p2.y = p2.y + p2Offset;
        }
    }


    // draw player
    p1.draw();
    p2.draw();


}