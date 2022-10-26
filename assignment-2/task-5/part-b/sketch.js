//Milestone 2, Question 1.2, Max Bremner, s5262372

//empty arrays the curve coordinated will be stored
let curveX = [];
let curveY = [];

function setup() {
    createCanvas(600, 360);
    noFill();

    //create the points for the curve
    createCurvePoints();

    //move the canvas up and across
    strokeWeight(25);
    push();
    translate(-200, -height / 2);

    //draw the lines
    drawLines();
    pop();
}

//creates curve coordinates 
function createCurvePoints() {

    //create random x coordinated and push to empty array
    for (let i = 0; i < width; i += random(0, 100)) {
        curveX.push(i);
    }

    //for each point in x array, make a random y coordinate and push to y array
    for (let i = 0; i < curveX.length; i++) {
        let rand = random(-200, 200);
        curveY.push(rand);
    }
}

//draw the line 
function drawLines() {

    //create lines down the screen
    for (let i = 0; i <= height * 2; i += 10) {

        //random HSB colour
        colorMode(HSB);
        stroke(random(0, 360), random(50, 100), random(50, 100));


        beginShape(); //start point
        curveVertex(-width, i);
        curveVertex(-width, i);

        //create curve vertex's based on amount of values in x array
        for (let t = 0; t < curveX.length; t++) {
            curveVertex(curveX[t] + i, curveY[t] + i);
        }

        curveVertex(width * 2, i);
        curveVertex(width * 2, i);
        endShape(); //end point
    }
}