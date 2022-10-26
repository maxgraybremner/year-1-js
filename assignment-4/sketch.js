//Assignment 2, Milestone 2, Max Bremner, s5262372
let width = 500;
let height = 700;


let collectorCounter = 0;
let xoff = 0.01;

let sounds = [];

let bullets;
let xDev = 0;

let paused = false;
let data = [];

let bossImg;



//load images and spritsheets
function preload() {
    nameFont = loadFont("./assests/Silkscreen/Silkscreen-Regular.ttf");
    bulletImg = loadImage("./Sprites/BlueBullet.svg");
    menuBulletImg = loadImage("./Sprites/BlueBullet2.svg");
    craft = loadImage("./Sprites/craftGraphic.svg");
    menuCraftImage = loadImage("./Sprites/craftGraphic2.svg")
    craftTrailImg = loadImage("./Sprites/craftGraphicTrail.svg");
    menuTrailImg = loadImage("./Sprites/craftGraphicTrail2.svg");
    enemyShipImg = loadImage("./Sprites/enemy1.svg");
    bossImg = loadImage("./Sprites/boss.svg");

}

function setup() {

    highScores();
    drawGraphics();
    bullets = new Group();
    enemyBulletGroup = new Group();
    turretGroup = new Group();
    enemyShipGroup = new Group();
    bossGroup = new Group();
    spaceShip.createShip();
    trails = new Group();
    createCanvas(width, height);
    colorMode(HSB);
    defineToken();
    border();

    for (let i = 0; i < pathArray.length; i++) {
        soundEffects([i], pathArray[i]);
    };
}

function draw() {
    background(240, 100, 5);
    renderBackground()
    drawSprites();

    spaceShip.position();
    if (!paused && !loading) {
        spaceShip.steering();

        shooting();
    }
    gamePause();
    collisions();
    if (playing == 1) {
        gameplay();
    } else if (playing == 0) {
        menu();
    } else if (playing == 3) {
        loadingBar();
    } else if (playing == 4) {
        endGame();
    }
}

let pauseEvent = false;

function keyReleased() {
    if (key == "p") {
        pauseEvent = true;
    }
}

function keyPressed() {
    if (keyIsDown(49)) { bulletFreq -= 5; }
    if (keyIsDown(80) && !paused && playing == 1) {
        paused = true;

    } else if (keyIsDown(80) && paused) {
        paused = false;
    }
}


//collisions

let walls;
let wall;

function collisions() {
    if (playing === 1) {
        tokens.bounce(tokens);
        tokens.bounce(walls);
        craftSprite.collide(tokens);
        tokens.overlap(craftSprite, collect);

        function collect(collector) {
            sounds[4].play()
            playerPoints += 200;
            collector.remove();
            if (bulletFreq > 1) { bulletFreq -= 5 };
        }
        bullets.collide(turretGroup, damage);
        bullets.collide(enemyShipGroup, damage);

        function damage(collected, collector) {
            collected.remove();
            playerPoints += 100;
            collector.lifePoints -= 1;
            if (collector.lifePoints <= 0) {
                playerPoints += 100;
                collector.remove();
                sounds[5].play();
                if (random() < 0.4) {
                    createToken(collector.position.x, collector.position.y, random(0, 360));

                }
            }
        }

        bullets.collide(bossGroup, bossDamage);

        function bossDamage(collected, collector) {
            collected.remove();
            collector.lifePoints--;
            if (collector.lifePoints < 0) {
                collector.remove();
                enemyCounter = 0;
                if (difficulty > 1) {
                    difficulty--;
                }
            }
        }

        craftSprite.collide(enemyBulletGroup, respawn);
        craftSprite.collide(enemyShipGroup, respawn);

        function respawn(collected, collector) {
            collector.remove();
            craftSprite.lifePoints -= 1
            if (craftSprite.lifePoints <= 0) {
                craftSprite.animation.changeFrame(0);
                playing = 4;

                turretCounter = 0;
                shipCounter = 0;
                turretGroup.removeSprites()
                enemyShipGroup.removeSprites();
                enemyBulletGroup.removeSprites();
                tokens.removeSprites();
                bossGroup.removeSprites();
                for (let i = 0; i < scoreArray.length; i++) {
                    if (playerPoints >= scoreArray[i].score) {
                        updateScore()
                        updated = false;
                        break;
                    } else {
                        updated = true;
                    }
                }
            } else {
                for (let i = 0; i < (22 - bulletFreq) / 5; i++) {
                    createToken(collected.position.x, collected.position.y, random(0, 360))
                }
            }
            collected.position.x = width / 2;
            collected.position.y = height - 100;
            bulletFreq = 22;

            sounds[8].play();

        }

    } else if (playing == 0) {
        bullets.collide(beginSprite, select);

        function select(collected, collector) {
            angleMode(DEGREES);
            collected.remove();
            beginCounter += 360 / 2.7;
        }
    }


    craftSprite.collide(walls);
}

function border() {
    walls = new Group();

    for (let i = -100; i < width + 100; i += 50) {
        wall = createSprite(i, -50);
        walls.add(wall);
        wall = createSprite(i, height + 50);
        walls.add(wall);
    }

    for (let i = -100; i < height + 100; i += 50) {
        wall = createSprite(-20, i, 50, 50);
        walls.add(wall);
        wall = createSprite(width + 20, i, 50, 50);
        walls.add(wall);
    }
    for (const w of walls) {
        w.immovable = true;
        w.visible = false;
    }
}

//gameplay

let playing = 3;
let loadingCounter = 0;
let beginSprite;
let beginCounter = 0;
let playerPoints = 0;
let mmCounter = 0;
let rCounter = 0;
let scoreArray = [];
let updated = true;
let input, button, title;
let loading = true;
//0 = main menu
//1 = gameplay
//2 = pause menu
//3 = loading 
//4 = endGame

function menu() {
    drawLogo();
    drawLogo();
    craftSprite.animation.changeFrame(0);
    textFont(nameFont);
    textSize(24);
    stroke(245, 107, 2);
    textAlign(CENTER);
    text("BEGIN", width / 2, 200);
    textSize(16);
    stroke(0, 170, 255)
    text("easy", 50, 250);
    text("medium", 150, 250);
    text("Hard", 350, 250);
    text("extreme", 450, 250);
    rectMode(CENTER);
    if (difficulty == 4) {
        rect(50, 260, 50, 2)
    } else if (difficulty == 3) {
        rect(150, 260, 70, 2)
    } else if (difficulty == 2) {
        rect(350, 260, 50, 2)
    } else if (difficulty == 1) {
        stroke(255, 10, 10);
        rect(450, 260, 75, 2)
    }
    noFill()
        //----begin button----//
    beginSprite = createSprite(width / 2, 192);
    beginSprite.visible = false;
    beginSprite.setCollider("circle", 0, 0, 50);
    beginSprite.life = 2;
    noFill()
    beginCounter = constrain(beginCounter, 0, 362)
    arc(width / 2, 192, 100, 100, 0, beginCounter);
    beginCounter--
    if (beginCounter === 361) {
        playing = 1;
        craftSprite.lifePoints = 1 + difficulty;
        sounds[1].play();
    }
}

let createCounter = 0;

function gameplay() {
    if (!paused) {
        createCounter++
    }
    craftSprite.animation.changeFrame(1)
    if (enemyCounter == 0) {
        drawTurret();
    } else if (enemyCounter == 1) {
        if (createCounter % 60 == 0 && !paused) {
            drawEnemyShip();
        }
    } else if (enemyCounter == 2) {
        drawBossShip();
    }
    turretRotation();
    enemyShipRotation();
    drawToken();
    spaceShip.trace();
    textFont(nameFont);

    textSize(24);
    fill(245, 107, 2);
    noStroke();
    textAlign(CENTER);
    text("SCORE: " + playerPoints, width - 125, 20);
    text("LIVES x " + craftSprite.lifePoints, 125, 20);

}

function gamePause() {
    if (paused) {
        textFont(nameFont);
        textSize(64);
        textAlign(CENTER)
        stroke(0, 170, 255)
        fill(0)
        text("PAUSED", width / 2, 100);
    }

}

function loadingBar() {
    noFill();
    rectMode(CENTER);
    stroke(0, 170, 255)
    strokeWeight(6)

    //map the loading counter value to the size of the loading bar
    percentFinished = map(loadingCounter, 0, pathArray.length, 0, width - 100);

    //draw the loading border 
    rect(width / 2, height - 100, width - 100, 50, 10);

    //draw the loadbar fill
    noStroke();
    fill(255, 87, 51);
    rect(width / 2, height - 100, percentFinished, 40, 10)

}

let pathArray = [
    "./Sounds/Hover effect.wav",
    "./Sounds/Woosh.wav",
    "./Sounds/alarm.wav",
    "./Sounds/alarm2.wav",
    "./Sounds/Collectable.wav",
    "./Sounds/Ememy hit.wav",
    "./Sounds/Epic Ememy Horn.wav",
    "./Sounds/Shooting.wav",
    "./Sounds/player explosion.wav",
    "./Sounds/Daft Punk- Derezzed.mp3",
    "./Sounds/sepparate-ways.mp3"
];

//load each sound in the sound array 
function soundEffects(id, filePath) {
    loadSound(filePath, soundLoaded);

    function soundLoaded(sound) {
        //incrememnt the loading counter with each load;
        loadingCounter++;
        //label each sound with the sound index
        sounds[id] = sound;

        //if all songs loaded procede to main menu
        if (loadingCounter >= pathArray.length) {
            loading = false;
            playing = 0;
        }
    }
}

function endGame() {
    textFont(nameFont);
    textSize(64);
    textAlign(CENTER)
    rectMode(CENTER);
    fill(0)
    stroke(0, 170, 255)

    //draw end screen
    text("GAME OVER", width / 2, 100);
    rect(width / 2, 250, width / 2, 250);
    textSize(24);
    stroke(245, 107, 2);

    //draw restart and main menu screens
    rCounter = constrain(rCounter, 0, 2);
    mmCounter = constrain(mmCounter, 0, 2);
    text("RESTART", 100, 450);
    text("MAIN MENU", 400, 450);
    noFill()
    rect(100, 460, rCounter * 45, 5);
    rect(400, 460, mmCounter * 45, 5);
    rCounter -= 0.01;
    mmCounter -= 0.01;

    //select restart
    if (rCounter >= 1.7 && updated) {
        playing = 1;
        sounds[1].play();
        craftSprite.lifePoints = 1 + difficulty;
        playerPoints = 0
        enemyCounter = 0;
        rCounter = 0
        updated = false;

        //select main menu
    } else if (mmCounter >= 1.7 && updated) {
        playing = 0;
        beginCounter = 0;
        enemyCounter = 0;
        playerPoints = 0
        craftSprite.lifePoints = 1 + difficulty;
        mmCounter = 0;
        updated = false;
    }

    //if highscore reached update scoreboard
    if (updated) {
        displayScores();
    }
}

function displayScores() {
    strokeWeight(2);
    noFill();

    //arrange the array from highest to lowest
    scoreArray.sort((a, b) => b.score - a.score);

    //draw names on highscore board
    for (let i = 0; i < 5; i++) {
        let n = scoreArray[i].name;
        let s = scoreArray[i].score;
        text(i + 1 + ". " + n + "  " + s, width / 2, 155 + (i * 50));
    }
}

//load in scores from a json file
function highScores() {
    loadJSON("./Scores.JSON", parseJSON);

    //sort information from highest to lowest and push to the leaderboard array
    function parseJSON(players) {
        let pname = players
        pname.sort((a, b) => b.score - a.score);
        for (let i = 0; i < 5; i++) {
            scoreArray.push(pname[i]);
        }
    }
}

//if the player reaches a higher score ask for name before proceding
function updateScore() {
    let c = width / 2;
    let playerName;
    let score = playerPoints;

    //create title, input form, and submit button
    title = createElement("h2", "ENTER NAME");
    title.style('color', 'rgb(245, 107, 2)')
    title.position(c - 78, height / 4 - 50);
    title.style('font-family', 'Arial');
    input = createInput();
    input.position(c - 90, height / 4);
    input.style('background', 'rgb(0, 0, 0)');
    input.style('border-radius', '10px');
    input.style('color', 'rgb(0, 170, 255)');
    button = createButton("ENTER");
    button.position(c - 35, height / 4 + 25);
    button.mousePressed(arrayUpdate);

    //update the high score array with the new information

    function arrayUpdate() {
        //retrieve name from input field
        playerName = input.value();

        //remove lowest score from array
        scoreArray.splice(scoreArray.length - 1, 1);

        //create highscore object
        let playerObj = {
            name: playerName,
            score: score
        };

        //push the new object into the highscore array
        scoreArray.push(playerObj);

        //remove DOM elements 
        title.remove();
        input.remove();
        button.remove();

        //procede to highscore screen.
        updated = true;
    }
}

//graphics

let nameFont;
let craftTrailImg;
let bulletImg;
let craft;
let spaceShip;
let shootAnimation

let tokenGraph;
let tokenImg;
let turretGraph;
let turretImg;
let enemyBulletGraph;
let enemyBulletImg;
let enemyShipImg;
let tileGraph;
let backgorundGraph
let b = 255;
let bTar = 255;

function drawLogo() {
    textFont(nameFont);
    textSize(64);
    textAlign(CENTER)
    stroke(0, 170, 255)
    fill(0)
    text("Neon Strike", width / 2, 100);
}

function drawGraphics() {
    //----resize each image----//
    craft.resize(50, 65)
    bulletImg.resize(25, 35);
    menuBulletImg.resize(25, 35);
    craftTrailImg.resize(50, 65);
    menuTrailImg.resize(50, 65);
    menuCraftImage.resize(50, 65);
    enemyShipImg.resize(100, 150);
    bossImg.resize(250, 250);

    //----create turret graphic----//
    turretGraph = createGraphics(60, 60);
    turretGraph.noFill();
    turretGraph.stroke(245, 107, 2);
    turretGraph.strokeWeight(3);
    turretGraph.ellipse(30, 30, 50, 50);
    turretGraph.line(30, 30, 30, 0);
    turretImg = turretGraph.get();

    enemyBulletGraph = createGraphics(12, 12);
    enemyBulletGraph.stroke(245, 107, 50);
    enemyBulletGraph.fill(245, 107, 2);
    enemyBulletGraph.strokeWeight(1);
    enemyBulletGraph.ellipse(6, 6, 10, 10);
    enemyBulletImg = enemyBulletGraph.get();

    //----create token graphic----//
    tokenGraph = createGraphics(26, 26);
    tokenGraph.rectMode(CENTER);
    tokenGraph.noFill();
    tokenGraph.stroke(0, 170, 255);
    tokenGraph.strokeWeight(2);
    tokenGraph.ellipse(13, 13, 20);
    tokenGraph.fill(0, 170, 255)
    tokenGraph.rect(13, 13, 10, 10, );
    tokenImg = tokenGraph.get();


    spaceShip = new Spaceship;

}

function renderBackground() {
    let x = b
    b = lerp(x, bTar, 0.1);
    colorMode(RGB)
    stroke(134, 33, b, 50);
    strokeWeight(3);
    noFill()

    //chnange tile colour
    if (playing == 1) {
        bTar = 20;
    } else {
        bTar = 255;
    }

    for (let i = 0; i < height; i += 50) {
        if (!paused) {
            y = (i + frameCount) % height;
        } else if (paused) {
            y = i;
        }
        line(0, y, width, y);
        line(i, 0, i, height);
    }
}

//spaceship

let craftSprite;
let xPos, yPos;
let keyCounter = 1;
let bulletFreq = 22;
let difficulty = 3;
let menuTrailImg;



class Spaceship {

    constructor() {
        this.x = width / 2;
        this.y = height - 200;
    }

    position() {
        xPos = craftSprite.position.x
        yPos = craftSprite.position.y
    }

    createShip() {
        craftSprite = createSprite(this.x, this.y, 10, 10);
        craftSprite.addAnimation("craft", menuCraftImage, craft);
        craftSprite.animation.stop();
        craftSprite.animation.changeFrame(0);
        craftSprite.lifePoints = 1 + difficulty;
        craftSprite.friction = 0.3;
    }

    steering() {
        if (keyIsDown(UP_ARROW)) {
            craftSprite.addSpeed(3.5, 270);
        } else if (keyIsDown(DOWN_ARROW)) {
            craftSprite.addSpeed(-3.5, 270);
        }

        if (keyIsDown(RIGHT_ARROW)) {
            craftSprite.addSpeed(3.5, 0);
        } else if (keyIsDown(LEFT_ARROW)) {
            craftSprite.addSpeed(3.5, 180);
        }
    }

    trace() {

        let trailY = yPos;
        let trail = createSprite(xPos, trailY);
        trail.addImage(craftTrailImg);
        trail.setVelocity(0, 10);
        trails.add(trail);

        for (const t of trails) {
            if (t.position.y > height) {
                t.remove();
            }
        }

    }

    shoot() {
        sounds[7].play();
        if (bulletFreq == 22) {
            createBullet(xPos, yPos, 0, 30, xDev, -20);
        } else if (bulletFreq == 17) {
            for (let i = -1; i < 2; i += 2) {
                createBullet(xPos, yPos, i, 30, xDev, -20);
            }
        } else if (bulletFreq == 12) {
            for (let i = -1; i < 2; i += 1) {
                xDev = i * 15;
                createBullet(xPos, yPos, i, 20, xDev, -20);
            }
        } else if (bulletFreq <= 7) {
            for (let i = -1; i < 1.5; i += 0.5) {
                xDev = i * 15;
                createBullet(xPos, yPos, i, 20, xDev, -20);
            }
        }

    }

}

function shooting() {
    if (keyIsDown(32)) {
        keyCounter++;
    }
    if (keyCounter % bulletFreq === 0 && keyIsDown(32)) {
        spaceShip.shoot();
    }

    for (const b of bullets) {
        let x = b.position.x;
        let y = b.position.y;
        if (y < 0) {
            b.remove();
        }
        if (playing == 0) {
            if (y < 260) {
                if (x > 25 && x < 75) {
                    difficulty = 4;
                    craftSprite.lifePoints = 1 + difficulty;
                    b.remove();
                } else if (x > 115 && x < 185) {
                    difficulty = 3;
                    b.remove();
                    craftSprite.lifePoints = 1 + difficulty;
                } else if (x > 325 && x < 375) {
                    difficulty = 2;
                    b.remove();
                    craftSprite.lifePoints = 1 + difficulty;
                } else if (x > 410 && x < 490) {
                    difficulty = 1;
                    b.remove();
                    craftSprite.lifePoints = 1 + difficulty;
                }
            }
        } else if (playing == 4) {
            if (y < 480) {
                if (x > 25 && x < 175) {
                    b.remove();

                    rCounter++
                } else if (x > 325 && x < 475) {
                    b.remove();
                    mmCounter++
                }
            }
        }
    }
}

function createBullet(xPos, yPos, index, yoff, xdeviation, yVelocity) {
    xPos += (index * 15);
    yPos -= yoff;

    //let blast = createSprite(xPos, yPos);
    //blast.addImage(shootAnimation);
    //blast.life = 2;
    let bullet = createSprite(xPos, yPos);
    if (playing == 1) {
        bullet.addImage(bulletImg);
    } else {
        bullet.addImage(menuBulletImg);
    }
    bullet.rotation = xdeviation * 2;
    bullet.setVelocity(xdeviation, yVelocity);
    bullets.add(bullet)

    for (const b of bullets) {
        if (b.position.y < 0) {
            b.remove();
        }
    }
}

//tokens

let tokens;
let tokenCounter = 0;

function defineToken() {
    tokens = new Group();
    tokens.collider = "circle", 0, 0, 13;
    tokens.maxSpeed = 1;
    tokens.rotateToDirection = true;
}

function drawToken() {
    let startY
    if (!paused) {
        tokenCounter++;
    }
    for (let t of tokens) {
        if (paused) {
            t.setSpeed(0, 0);
        } else if (!paused) {
            t.setSpeed(0.5, t.savedAngle);
        }
    }
    let startX;
    switch (floor(random() * 3)) {
        case 0:
            startX = 30;
            startY = random() * height - 200;
            startAng = random(310, 400);
            break;
        case 1:
            startX = width - 30;
            startY = random() * height - 200;
            startAng = random(310, 400);
            break;
        case 2:
            startX = random() * width - 30;
            startY = 20;
            startAng = random(50, 120);
            break;

    }
}

function createToken(x, y, startAng) {
    token = createSprite(x, y, 10, 10);
    token.setSpeed(0.5, startAng);
    token.savedAngle;
    token.addImage(tokenImg);
    token.life = 1000;
    tokens.add(token);
}


// enemies

let turretGroup;
let enemyShipGroup;
let enemyBulletGroup;
let turretCounter = 0;
let shipCounter = 0;
let enemyCounter = 0;
let shipID = 0;

function drawTurret() {
    angleMode(DEGREES);
    if (!paused) {
        turretCounter++
    }
    if (turretCounter == (3 * 60)) {
        for (let i = 0; i < 10 - difficulty; i++) {
            let turret = createSprite(map(random(), 0, 1, 50, width - 50), -i * (150 + difficulty * 20) - 25);

            turret.lifePoints = 5 - difficulty;
            turret.setCollider("circle", 0, 0, 25);
            turret.setVelocity(0, 2);

            turret.addImage("turret", turretImg);
            turretGroup.add(turret);
        }
    }
}

function turretRotation() {
    for (const t of turretGroup) {
        let tx = t.position.x;
        let ty = t.position.y;
        let cx = craftSprite.position.x;
        let cy = craftSprite.position.y;

        let angle = atan2(tx - cx, ty - cy);
        t.rotation = -angle;

        if (turretCounter % 55 == 0 && ty > 0 && !paused) {

            let enemyBullet = createSprite(tx, ty);
            enemyBullet.addImage("bullet", enemyBulletImg);
            enemyBullet.setSpeed(6, -angle - 90);
            enemyBullet.savedAngle = -angle - 90;
            enemyBulletGroup.add(enemyBullet);
        }

        for (let e of enemyBulletGroup) {
            if (e.position.x > width || e.position.x < 0) {
                e.remove()
            }
            if (e.position.y < 0 || e.position.y > height) {
                e.remove()
            }

            if (paused) {
                e.setSpeed(0, 0)
            } else if (keyIsDown(80) && !paused) {
                e.setSpeed(6, e.savedAngle);
            }

        }
        if (turretGroup.length < 2) {
            enemyCounter = 1;
            turretCounter = 1;
        }
    }
}



function drawEnemyShip() {
    if (shipCounter < 3 && !paused) {
        createShip(shipID);
        shipID++
        shipCounter++;
    } else if (shipCounter == 3 && enemyShipGroup.length < 3 && !paused) {
        createShip(shipID);
        shipID++
    }

    if (shipID >= 10 - difficulty) {
        enemyCounter = 2;
        createBoss();
        shipID = 0;
    }

    function createShip(id) {
        angleMode(DEGREES);
        let x = map(random(), 0, 1, 50, width - 50);
        let enemyAngle = 90 + atan2(x - random(100, 400), 300);
        let enemyShip = createSprite(x, -25);

        enemyShip.lifePoints = 5 - difficulty;
        enemyShip.id = id;
        enemyShip.addImage(enemyShipImg);
        enemyShip.setSpeed(random(6, 8), enemyAngle);
        enemyShip.savedAngle = enemyAngle;
        enemyShip.setCollider("rectangle", 3, 11, 33, 40)
        enemyShip.friction = 0.016;
        enemyShip.lifePoints = 5 - difficulty;
        enemyShipGroup.add(enemyShip);
    }

}

let savedSpeed;
let an = []

function enemyShipRotation() {
    for (const t of enemyShipGroup) {
        let tx = t.position.x;
        let ty = t.position.y;
        let cx = craftSprite.position.x;
        let cy = craftSprite.position.y;
        let angle = atan2(tx - cx, ty - cy);

        if (pauseEvent && paused) {
            let sp = t.getSpeed();
            let position = {
                speed: sp,
                id: t.id
            };
            an.push(position);
            if (an.length > enemyShipGroup.length) {
                an.shift();
            }
            t.setVelocity(0, 0)
        }



        if (pauseEvent && !paused) {
            for (let i = 0; i < an.length; i++) {
                if (an[i].id == t.id) {
                    t.setSpeed(an[i].speed, t.savedAngle);
                }
            }
        }

        if (createCounter % 45 == 0 && ty > 0 && !paused) {
            let enemyBullet = createSprite(tx, ty);
            enemyBullet.addImage("bullet", enemyBulletImg);
            enemyBullet.setSpeed(3.5, -angle - 90);
            enemyBullet.savedAngle = -angle - 90;
            enemyBulletGroup.add(enemyBullet);

            if (t == enemyShipGroup.length) {}
        }

        for (let e of enemyBulletGroup) {
            if (e.position.x > width || e.position.x < 0) {
                e.remove()
            }
            if (e.position.y < 0 || e.position.y > height) {
                e.remove()
            }

            if (paused) {
                e.setSpeed(0, 0)
            } else if (keyIsDown(80) && !paused) {
                e.setSpeed(3.5, e.savedAngle);
            }

        }
    }

    pauseEvent = false;
}

let boss;
let bossGroup;
let bossCounter = 0;

function createBoss() {
    boss = createSprite(width / 2, -50);
    boss.setVelocity(0, 2);
    boss.addImage(bossImg);
    boss.setCollider("circle")
    boss.friction = 0.01;
    boss.lifePoints = 30 - (difficulty * 3);
    bossGroup.add(boss);
}

let shotangle = 0;
let anglebool = true;

function drawBossShip() {
    if (!paused) {
        bossCounter++
    }
    boss.rotation = bossCounter;

    for (let e of enemyBulletGroup) {
        if (e.position.x > width || e.position.x < 0) {
            e.remove()
        }
        if (e.position.y < 0 || e.position.y > height) {
            e.remove()
        }

        if (paused) {
            e.setSpeed(0, 0)
        } else if (keyIsDown(80) && !paused) {
            e.setSpeed(6, e.savedAngle);
        }

    }
    if (bossCounter % 20 == 0) {
        if (shotangle > 200) {
            anglebool = false;
        } else if (shotangle < 0) {
            anglebool = true;
        }

        if (anglebool) {
            shotangle += 15
        } else if (!anglebool) {
            shotangle -= 15;
        }

        if (!paused) {
            let enemyBullet = createSprite(boss.position.x, boss.position.y);
            enemyBullet.addImage("bullet", enemyBulletImg);
            enemyBullet.setSpeed(3.5, shotangle);
            enemyBullet.savedAngle = shotangle;
            enemyBulletGroup.add(enemyBullet);

        }

    }
}
//-------------------------bugs-----------------------//
// 1. cant fly up and left white shooting
// 2. add last bullet effect
// 3. highscore elements