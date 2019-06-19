(function () {

    var gamesize = {
        width = 1000,
        height = 500
    };

    // 2D canvas
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    // create background window 
    ctx.fillStyle = "#00A";
    ctx.fillRect(0, 0, 500, 1000);


    // manage key strokes (key down)
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 37) {// left arrow pressed
            // move left
            xOffset = -player.speed;
            yOffset = 0;
        }

        else if (event.keyCode == 39) {// right arrow pressed
            // move right
            xOffset = player.speed;
            yOffset = 0;
        }

        else if (event.keyCode == 32) {// space bar
            // jump
            player.isJumping = true;
            player.yVel = player.jumpInitialVelocity;
        }
    });
    // manage key strokes (key up)
    document.addEventListener('keyup', function (event) {
        if (event.keyCode == 37) {// left arrow pressed
            // move left
            xOffset = 0;
            yOffset = 0;
        }

        else if (event.keyCode == 39) {// right arrow pressed
            // move right
            xOffset = 0;
            yOffset = 0;
        }
    });
})();