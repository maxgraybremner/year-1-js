//Milestone 2, Question 1.1, Max Bremner, s5262372
//---------------------Draw functions------------------------//
function setup() {
    createCanvas(600, 400);
    sectionOne();
    sectionTwo();
    sectionThree();
    sectionFour();
    sectionFive();
    sectionSix();
    border();
}



//---------------------Section Functions------------------------//
function border() {
    //draw the section borders
    stroke(0);
    strokeWeight(8);
    line(width / 3, 0, width / 3, height);
    line(width - width / 3, 0, width - width / 3, height);
    line(0, height / 2, width, height / 2);
}

function sectionOne() {
    let radius = 50;
    let yPos;
    //draw the 1st section
    strokeWeight(3);
    fill(255, 0, 0);
    rect(0, 0, width / 3, height / 2);
    stroke(0, 0, 255);

    //draw blue horozontal lines
    for (let i = 0; i < height / 2; i += 10)
        line(0, i, width / 3, i);


    //move circle to centre of box
    push()
    translate(width / 6, height / 4);

    //draw the circle
    noStroke();
    fill(0);
    ellipse(0, 0, 100, 100);

    strokeWeight(1);
    stroke(255, 255, 0);

    //draw lines in circle
    for (let i = 2.5; i <= 50; i += 5) {
        x = (radius ** 2) - (i ** 2); //a^2 = c^2 - b^2
        yPos = Math.sqrt(x); //squareroot to get y coordinate
        line(i, yPos, i, -yPos);
        line(-i, yPos, -i, -yPos);
    }
    pop()
}



function sectionTwo() {
    //move the origin  
    push();
    translate(width / 3, 0);


    //draw the box
    noStroke();
    fill(255, 255, 0);
    rect(0, 0, width / 3, height / 2);

    //draw the horrozontal lines
    stroke(255, 0, 0);
    for (let i = 0; i < height / 2; i += 15)
        line(0, i, width / 3, i);

    pop();

    //centre rectangle inside canvas
    push();
    translate(width / 2, height / 4)

    //draw the square
    fill(0);
    rectMode(CENTER);
    noStroke();
    rect(0, 0, 100, 100);

    //draw the verticle lines
    stroke(0, 0, 255);
    strokeWeight(2);

    for (let x = -50; x < 50; x += 8)
        line(x, -49, x, 49);

    pop();
}



function sectionThree() {
    //move the origin
    push();
    translate(width - width / 3, 0)

    //draw the box
    fill(0, 0, 255);
    noStroke();
    rect(0, 0, width / 3, height / 2);

    //draw the horozontal lines
    stroke(255, 255, 0);
    strokeWeight(1.5);
    for (let i = 0; i < height / 2; i += 5)
        line(0, i, width / 3, i);

    //draw the triangle 
    fill(0);
    noStroke();
    triangle(100, 50, 150, 151, 50, 151);

    //draw the verticle lines
    stroke(255, 0, 0);

    //solve for the bottom angle
    let theta = Math.atan(100 / 50) * (180 / PI);

    //used to find the length of each line
    let angle = tan(theta * (Math.PI / 180));

    //draw line in the triangle
    for (let i = 50; i < 100; i += 4)
        line(i, 150, i, 150 - (i - 50) * angle);

    for (let t = 150; t > 99; t -= 4)
        line(t, 150, t, 150 + (t - 150) * angle);
    pop();
}

function sectionFour() {
    //move the origin
    push();
    translate(0, height / 2);

    //draw the box 
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, width / 3, height / 2);

    //draw the horozontal lines
    stroke(255, 255, 0);
    strokeWeight(2);
    for (let i = 0; i < height / 2; i += 10)
        line(0, i, width / 3, i);

    //move the origin to the centre of the box
    push();
    translate(width / 6, height / 4);

    //draw the rectangle
    fill(0);
    rectMode(CENTER);
    noStroke();
    rect(0, 0, 150, 104);

    //draw the verticle lines
    stroke(0, 0, 255);
    strokeWeight(4);

    for (let i = 5; i < 150; i += 10)
        line(i - 75, 50, i - 75, -50);

    pop();
    pop();
}

function sectionFive() {
    //move the origin point
    push();
    translate(width / 3, height / 2);

    //draw the background
    fill(255, 255, 0);
    noStroke();
    rect(0, 0, width / 3, height / 2);
    stroke(0, 0, 255);

    //draw the blue verticle lines
    for (let i = 0; i < height / 2; i += 12)
        line(0, i, width / 3, i);

    //draw the trapezoid
    fill(0);
    noStroke();
    quad(75, 49, 150, 49, 175, 151, 25, 151);

    //draw the lines for the centre of the trap
    stroke(255, 0, 0);
    strokeWeight(2);
    for (let t = 75; t < 150; t += 10)
        line(t, 50, t, 150);

    //solve for the start angle
    let theta1 = Math.atan(100 / 50) * (180 / PI);

    //used to find the length of each line
    let angle1 = tan(theta1 * (Math.PI / 180));

    //draw lines for the first triangle
    for (let i = 25; i < 75; i += 10)
        line(i, 150, i, 150 - (i - 25) * angle1);

    //solve for the end angle
    let theta2 = Math.atan(100 / 25) * (180 / PI);

    //used to find the length of each line
    let angle2 = tan(theta2 * (Math.PI / 180));

    //draw lines for the last triangle
    for (let t = 175; t > 150; t -= 10)
        line(t, 150, t, 50 + (t - 150) * angle2);

    pop();
}

function sectionSix() {
    //move the origin
    push();
    translate(width - width / 3, height / 2);

    //draw the box
    noStroke();
    fill(0, 0, 255);
    rect(0, 0, width / 3, height / 2);

    //draw the horozontal lines
    stroke(255, 0, 0);
    strokeWeight(2.5)
    for (let i = 0; i < height / 2; i += 10)
        line(0, i, width / 3, i);

    //draw the quadrelateral
    fill(0);
    noStroke();
    quad(25, 49, 175, 49, 125, 151, 75, 151);

    //draw lines for the centre of the shape 
    stroke(255, 255, 0);
    for (let t = 75; t < 125; t += 8)
        line(t, 50, t, 150);

    //solve for the start angle
    let theta = Math.atan(100 / 50) * (180 / PI);

    //used to find the length of each line
    let angle = tan(theta * (Math.PI / 180));

    //draw lines for the first triangle
    for (let e = 27; e < 75; e += 8)
        line(e, 50, e, e * angle);

    //draw lines for the last triangle
    for (let r = 131; r < 175; r += 8)
        line(r, 50, r, 50 - (r - 175) * angle);


    pop();
}