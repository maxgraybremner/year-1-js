//Milestone 2, Question 2, Max Bremner, s5262372
//This is not the best way to do this!

//but it works :`)

let ang = 0;
let xPos, yPos;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background(50, 113, 181, 50)
    drawBackground();

    //move origin point
    translate(width / 2, height / 2);

    //create multiple points along a equation
    strokeWeight(5);
    stroke(255)
    for (let i = 0; i < 300; i += 0.2) {
        //calculate the movement
        let xPos = 173 * cos((ang + i) + 10);
        let yPos = 173 * sin(3 * (ang + i) + 30);

        //draw points
        point(xPos, yPos);
    }

    //increment the angle value
    ang += 2;
}


function drawBackground() {
    //draw border
    noFill();
    stroke(200);
    strokeWeight(25)
    rect(width / 2, height / 2, 400, 400, 5);

    //draw grid
    noFill()
    stroke(0)
    strokeWeight(0.5)
    for (let i = 25; i < 376; i += 35) {
        line(i, 25, i, 375);
        line(25, i, 375, i);
    }
}