//Milestone 1, Question 4, Max Bremner, s5262372

//create sizing and angle variables
let diameter, half, quarter, slider;
let angle = 0;

//declare slider variables
let sizeSlider;
let speedSlider;


function setup() {
    createCanvas(400, 450);
    noStroke();
    angleMode(DEGREES);

    //create a size slider
    sizeSlider = createSlider(100, 400, 200);
    sizeSlider.position(0, 425);

    //create a speed slider 
    speedSlider = createSlider(0, 50, 2);
    speedSlider.position(270, 425);
}

function draw() {
    background(100);

    //define the sizing variables based on the slider
    diameter = sizeSlider.value();
    half = diameter / 2;
    quarter = diameter / 4;

    //add labels 
    noStroke();
    fill(255);
    textSize(16);
    text("Size", 50, 425);
    text("Speed", 325, 425)

    //draw ying yang simbol
    yingYangSimbol();

    //increment the speed of rotation by the slider value
    angle += speedSlider.value();
}

function yingYangSimbol() {
    //move canvas to centre
    translate(width / 2, height / 2);

    //rotating x and y coordinates
    let x1 = quarter * cos(angle);
    let x2 = -quarter * cos(angle);
    let y1 = quarter * sin(angle);
    let y2 = -quarter * sin(angle)

    //draw each section of the ying yang simbol
    fill(0);
    noStroke()
    arc(0, 0, diameter, diameter, angle, angle + 180, PIE);
    fill(255);
    arc(0, 0, diameter, diameter, angle + 180, angle, PIE);


    ellipse(x1, y1, half, half);
    fill(0);
    ellipse(x2, y2, half, half);
    ellipse(x1, y1, half / 3, half / 3);
    fill(255);
    ellipse(x2, y2, half / 3, half / 3);
    fill(0);

}