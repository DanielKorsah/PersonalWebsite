// room size
var sizex = 1000;
var sizey = 500;

var xOffset = 0;
var yOffset = 0;

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
let p1 = new player(50, 400, "#01F");
let p2 = new player(950, 400, "#B00");

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
        ctx.fillStyle = this.color;
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
    if (event.keyCode == 87) {// left arrow pressed
        // move left
        xOffset = 0;
        yOffset = -p1.speed;
    }

    else if (event.keyCode == 83) {// right arrow pressed
        // move right
        xOffset = 0;
        yOffset = p1.speed;
    }

    else if (event.keyCode == 32) {// space bar
        // fire bullet
        p1.push(Bullet({
            speed: 5,
            x: p1.x + p1.width / 2,
            y: p1.y + p1.height / 2
        }));
    }
});

// manga key strokes (key up)
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 87) {// left arrow pressed
        // move left
        xOffset = 0;
        yOffset = 0;
    }

    else if (event.keyCode == 83) {// right arrow pressed
        // move right
        xOffset = 0;
        yOffset = 0;
    }
});

// call draw0 function every 1ms
setInterval(draw, 1);


// main function
function draw() {
    // clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, sizex, sizey);

    // udpate player
    p1.x = p1.x + xOffset;
    p1.y = p1.y + yOffset;

    // update bullets
    playerBullets.forEach(function (bullet) {
        // check that bullet is within canvas
        bullet.update()
    });

    // remove inactive bullets from bullet vector
    playerBullets = playerBullets.filter(function (bullet) {
        return bullet.active;
    });

    // draw player
    p1.draw();
    p2.draw();

    // draw bullets
    playerBullets.forEach(function (bullet) {
        // draw bullet
        bullet.draw();
    });
}