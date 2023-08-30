var splash
var gameState = "wait"
var playbutton, soundonbutton, soundoffbutton;
var backgroundImg, player, zombie, zombieGroup, bgSound, playerimg, groundGame, coinImg, coinGroup, reward;
var obImg1, obImg2, obstacle;
var coinScore = 0
var coinScoreSound, gunSound, coinGroup
var coinScore1 =0;
var health=390
var maxHealth=400



function preload() {
    splash = loadImage("Ghoul Grapple.gif")
    backgroundImg = loadImage("background.png")
    playerimg = loadImage("player.gif")
    zombie = loadImage("zombie.png")
    bgSound = loadSound("zombieSound.mp3")
    level1bg = loadImage("gameBackground.png")
    obImg1 = loadImage("zombie.png")
    obImg2 = loadImage("zombieSplashLeft.png")
    coinImg = loadImage("coin.png")
    coinScoreSound = loadSound("moneySound.mp3")
    gunSound = loadSound("gunSound.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("startbutton.png")
    playbutton.position(20, height / 2.5)
    playbutton.size(155, 140);

    soundonbutton = createImg("soundOn.png")
    soundonbutton.position(width - 150, playbutton.y - 25)
    soundonbutton.size(150, 175)
    soundonbutton.mouseClicked(mute)


    soundoffbutton = createImg("soundOff.png")
    soundoffbutton.position(width - 150, playbutton.y - 25)
    soundoffbutton.size(150, 175)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)

    bgSound.play()

    ground = createSprite(0, 0, width, height)
    ground.addImage(level1bg)
    ground.visible = false
    // ground.x = ground.width / 2
    ground.scale = 5

    groundGame = createSprite(width / 2 - 10, height - 30, width, 10)
    groundGame.visible = false

    player = createSprite(width / 2, height - 150);
    player.addImage(playerimg);
    player.scale = 0.7
    player.visible = false;
    //  player.debug=true;
    player.setCollider("rectangle", 0, 0, (player.width) / 3.2, (player.height) / 1.75)

    coinGroup = new Group();
    zombieGroup = new Group();

}

function draw() {
    player.collide(groundGame)
    if (gameState === "wait") {
        background(splash)

    }

    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
    })

    if (gameState == "level1") {
        groundGame.visible = false
        //   background(level1bg)
        // addobstacles()
        addrewards();
        ground.visible = true
        player.visible = true;
        ground.velocityX = -5
        player.velocityY = 5
        if (keyDown("SPACE")) {
            player.velocityY = -10
        }
        if (keyDown("SHIFT")) {
            player.velocityY = 10
        }
        player.velocityY += 0.5
        // if (player.collide(obstacle)) {

        // }

        if (ground.x < 0) {
            ground.x = ground.width / 2
        }
        if (player.isTouching(coinGroup)) {
            coinScore = coinScore + 100
            console.log(coinScore);
            coinGroup.destroyEach()
            coinScoreSound.play();
        }


        

      
    }

    if (coinScore >= 200) {
        gameState = 'level1done'
        console.log("done it")
    }

    if (gameState == 'level1done') {
        level1Won()
        coinGroup.destroyEach()
        player.visible = false
      
    }

    if (gameState == "level2") {
        groundGame.visible = false
        //   background(level1bg)
        addobstacles()
        addrewards();
        ground.visible = true
        player.visible = true;
        ground.velocityX = -5
        player.velocityY = 5
        if (keyDown("SHIFT")) {
            player.velocityY = 10
        }
        if (keyDown("SPACE")) {
            player.velocityY = -10
        }
        player.velocityY += 0.5
        // if (player.collide(obstacle)) {

        // }

        if (ground.x < 0) {
            ground.x = ground.width / 2
        }
        if (player.isTouching(coinGroup)) {
            coinScore1 = coinScore1 + 100
            console.log(coinScore);
            coinGroup.destroyEach()
            coinScoreSound.play();
            
        }



        if (player.isTouching(zombieGroup)) {
            health -=100
            console.log("zobmie touched");
            zombieGroup.destroyEach()
            // coinScoreSound.play();
        }

      
    }

    drawSprites()


    if (gameState == "level1") {
        textSize(50)
        fill("black")
        stroke("yellow")
        strokeWeight(2)
        text("LEVEL 1", 50, 80)
        text("SCORE : " + coinScore, width - width / 4, 80);


    }


    
    if (gameState == "level2") {
        textSize(50)
        fill("black")
        stroke("yellow")
        strokeWeight(2)
        text("LEVEL 2", 50, 80)
        text("SCORE : " + coinScore1, width - width / 4, 80);
        healthlevel2();
        // if(health>=maxHealth){
        //     gameState="win"
        // }
       if (health<=9){
            gameState="over"
        }

    }


    if(gameState=="win"){
        gameWin()
    }

    
    if(gameState=="over"){
        gameOver()
    }


if(player.y<=50){
    player.y=100
}
if(player.y>=height){
    player.y=100
}


}

function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        soundoffbutton.show();
        soundonbutton.hide();
        console.log("mute")
    }
    else {
        soundonbutton.show()
        soundoffbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}


function addobstacles() {


    if (frameCount % 150 == 0) {
        var obstacle = createSprite(width, height - 150)
        var rand = Math.round(random(1, 2))
        obstacle.velocityX = -5


        switch (rand) {

            case 1: obstacle.addImage(obImg1)
                obstacle.scale = 0.75
                                break;
            case 2: obstacle.addImage(obImg2)
                obstacle.scale = 1
                break;
            default: break;

        }

        zombieGroup.add(obstacle)
    }
}

function addrewards() {


    if (frameCount % 190 == 0) {
        reward = createSprite(width, height - 150)
        // var rand = Math.round(random(1, 2))
        reward.velocityX = -5
        reward.addImage(coinImg)
        reward.scale = 0.4
           coinGroup.add(reward);

    }
}

function level1Won() {

    swal(
        {

            title: `GOOD JOB! YOU'RE RICH! `,
            text: "OH NO! THE ZOMBIES ARE HERE!!!",
            imageUrl: "player.gif",
            imageSize: "200x200",
            confirmButtonText: "LEVEL 2",
            confirmButtonColor: "#1a1e2b"
        },
        function () {
            coinScore=0
            gameState = "level2";
        }

    )
}


function healthlevel2() {

    stroke("gold");
    strokeWeight(7);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill("red");
    rect(10, 10, map(health, 0, maxHealth, 0, 200), 20);
}


// function gameWin() {
//     swal(
//         {

//             title: `You WON!!!`,
//             text: "Get back to the Misson Again",
//             imageUrl: "/player.gif",
//             imageSize: "200x200",
//             confirmButtonText: "Restart",
//             confirmButtonColor: "cyan"
//         },
//         function () {

//             window.location.reload();
//         }

//     )
// }


function gameOver() {
    swal(
        {

            title: `You LOST💀`,
            text: "Get back to the Misson Again",
            imageUrl: "bomb.png",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "#33000c"
        },
        function () {

            window.location.reload();
        }
    )
    player.visible= false
}