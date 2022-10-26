//Assignment 2, Milestone 1, Question 1, Max Bremner, s5262372
let crowdImage;
let roadImage, road;
let grassImage, grass;
let finishImage, finish;
let rallyCarImage, rallyCar, carX, carY;
let trackData;
let crowd;
let roadGroup, grassGroup;
let speed = false;
let b;
let r;

function preload() {
    trackData = loadStrings("track.txt");
    roadImage = loadImage("./Sprites/desert_cracks_s.jpg");
    grassImage = loadImage("./Sprites/grass_green_d.jpg");
    finishImage = loadImage("./Sprites/realistic-racing-checkered-flag-background_23-2148974825.jpg");
    rallyCarImage = loadImage("./Sprites/pixel_racecar_blue.png");
    crowdImage = loadImage("./Sprites/crowd.jpg");
}


function setup() {
    createCanvas(750, 750);
    camera.on();
    sizeImages(); //resize tiles

    roadGroup = new Group(); //create tile groups 
    grassGroup = new Group();

    groupTiles(trackData);
    drawCar();
    drawCrowd();
}

function draw() {
    rallyCar.collide(grassGroup, carStop())
    steering();
    drawSprites();

    //uncomment to activate camera 
    //carCamera();
}


function sizeImages() { //resize the images 
    crowdImage.resize(100, 100);
    grassImage.resize(50, 50);
    roadImage.resize(50, 50);
    finishImage.resize(50, 50);
    rallyCarImage.resize(20, 10);
}


function groupTiles(data) { //load tiles from txt files
    for (let i = 0; i < data.length; i++) {
        let dataRow = split(data[i], " ");

        for (let t = 0; t < data.length; t++) {
            if (dataRow[t] === '0') {
                grass = createSprite(t * 50, i * 50, 50, 50);
                grass.setDefaultCollider();
                grass.addImage("grassTexture", grassImage);
                grass.immovable = true;
                grassGroup.add(grass);
            } else if (dataRow[t] === '1') {
                road = createSprite(t * 50, i * 50, 50, 50);
                road.addImage("roadTexture", roadImage);
                roadGroup.add(road);
            } else if (dataRow[t] === '2') {
                finish = createSprite(t * 50, i * 50, 50, 50);
                finish.addImage("finishLine", finishImage);
                if (dataRow[t - 1] === '0') { //check the rotation of the start line
                    b = true;
                } else if (dataRow[t - 1] !== '0') {
                    b = false;
                }
            }
        }
    }
}


function carStop() { //set the car back to the start position
    if (rallyCar.overlap(grassGroup)) {
        rallyCar.position.x = carX;
        rallyCar.position.y = carY;
        rallyCar.rotation = r;
    }
}

function drawCar() {
    carX = finish.position.x;
    carY = finish.position.y;
    rallyCar = createSprite(carX, carY, 10, 10);
    rallyCar.addImage("car", rallyCarImage);
    rallyCar.friction = 0.02; //slow the car when not accelerating 
    rallyCar.rotateToDirection = true;

    if (b === false) { // set the starting rotation of the car 
        r = 0;
    } else if (b === true) {
        r = 270;
    }

    rallyCar.rotation = r;
    rallyCar.setCollider("circle", 0, 0, 10);
}

function steering() { // car steering behaviours
    if (keyIsDown(UP_ARROW)) {
        rallyCar.rotateToDirection = true;
        rallyCar.addSpeed(0.2, rallyCar.rotation);
        speed = true; //check to see if the car is moving 

    } else if (keyIsDown(DOWN_ARROW)) {
        rallyCar.rotateToDirection = false; //stop the car rotating when rotating
        rallyCar.addSpeed(-0.2, rallyCar.rotation);
        speed = true;

    } else { speed = false; } //set to false is the car is not moving 


    if (keyIsDown(RIGHT_ARROW) && speed) {
        rallyCar.rotation += 5;
    } else if (keyIsDown(LEFT_ARROW) && speed) {
        rallyCar.rotation -= 5;
    }
}


function carCamera() { //set the camera to the car
    camera.position.x = rallyCar.position.x;
    camera.position.y = rallyCar.position.y;
    camera.zoom = 2.5;
}


function drawCrowd() { //draw the crowd around the perimeter
    for (let i = -100; i < width; i += 100) {
        crowd = createSprite(i, -75);
        crowd.addImage(crowdImage);

        crowd = createSprite(-75, i)
        crowd.addImage(crowdImage);
        crowd.rotation = 270;

        crowd = createSprite(width, i)
        crowd.addImage(crowdImage);
        crowd.rotation = 90;

        crowd = createSprite(i, height)
        crowd.addImage(crowdImage);
        crowd.rotation = 180;
    }
}