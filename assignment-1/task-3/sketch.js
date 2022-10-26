//Milestone 1, Question 3, Max Bremner, s5262372

//define the size of the road
let diameterX = 200;
let diameterY = diameterX / 2;

//declare the position and angle variables for both cars
let x1, x2, y1, y2;
let angle1 = 0;
let angle2 = 0;

//declare speed variables
let speed1 = 0.0;
let speed2 = 0.0;
let xoff = 0.0;

function setup() {
    createCanvas(400, 400);
    colorMode(HSB);
}

function draw() {
    background(100, 100, 50);

    //set the vehicle speed to a noise value between 0, 1.
    speed1 = noise(xoff) * 0.03;
    speed2 = noise(xoff + 10000) * 0.03;

    //draw the road
    road();

    //draw the players
    players();

    //increment the speed and set it to the angle 
    angle1 += speed1;
    angle2 += speed2;
    xoff += 0.02;
}

function road() {
    //draw the road
    noFill();
    strokeWeight(50);
    stroke(70);
    ellipse(width / 2, height / 2, diameterX, diameterY);

    //draw the road lines
    strokeWeight(2);
    stroke(50, 100, 100);
    ellipse(width / 2, height / 2, diameterX - 4, diameterY - 4);
    ellipse(width / 2, height / 2, diameterX + 4, diameterY + 4);

}

function players() {
    //move canvas to centre
    translate(width / 2, height / 2);

    //outer player
    //x and y movement 
    x1 = ((diameterX / 2) + 13) * sin(angle1);
    y1 = ((diameterY / 2) + 13) * cos(angle1);

    //draw the player
    fill(0, 100, 100);
    noStroke();
    ellipse(x1, y1, 20, 20);

    //inner player
    //x and y movement
    x2 = ((diameterX / 2) - 13) * sin(angle2);
    y2 = ((diameterY / 2) - 13) * cos(angle2);

    //draw the player
    fill(220, 100, 100);
    ellipse(x2, y2, 20, 20);

}