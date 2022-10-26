//Milestone 1, Question 2, Max Bremner, s5262372
//create a pie chart which can be changed with any value inputs.

//create an array for genre's and values 
const genre = ["Comedy", "Action", "Romance", "Drama", "Sci-Fi"];
const values = [4, 5, 20, 1, 4];

//assign variable for the diameter, array total and angle integer
let totalSum = 0;
let rad = 300;
let angle = 0;

function setup() {
    createCanvas(500, 500);
    background(0);
    angleMode(DEGREES);
    colorMode(HSB);
    noLoop();
}

function draw() {
    //convert values to a percentage
    percentageOfArray();

    //draw the piechart
    pieChart();

}

function percentageOfArray() {
    //find the total sum of the values
    for (let i = 0; i < values.length; i++) {
        totalSum += values[i];
    }
    //find the percentage of each value 
    for (let i = 0; i < values.length; i++) {
        values[i] = values[i] / totalSum * 100;
    }

}

function pieChart() {
    //move pirchart to centre
    push();
    translate(width / 2, height / 2);

    for (let i = 0; i < values.length; i++) {
        //create a random hsb colour pallette 
        fill(random(0, 360), 90, 90);

        //draw each pie piece 
        strokeWeight(1);
        noStroke();

        //start from the center 
        //each section has the size of rad
        //the initial angle is incremented by the previous angle in degrees 
        //the magnitude of the angle is calculated by multiplying the current value by 3.6
        arc(0, 0, rad, rad, angle, angle += values[i] * 3.6);

        //draw the text figures
        textSize(16);
        textAlign(CENTER, CENTER);

        //draw the genre 
        //space text out by 200px and find half of the degree value to place text in center  
        text(genre[i], 200 * cos(angle - (values[i] * 3.6) / 2), 200 * sin(angle - (values[i] * 3.6) / 2));
        //move the y pos down 
        text(Math.floor(values[i]) + "%", 200 * cos(angle - (values[i] * 3.6) / 2), 178 * sin(angle - (values[i] * 3.6) / 2));
    }
    pop();
}