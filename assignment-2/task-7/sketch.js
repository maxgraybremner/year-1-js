//Milestone 2, Question 3, Max Bremner, s5262372

//variables for sun images 
let sunImg, moonImg, font;

//empty star and cloud array
let stars = [];
let clouds = [];

//click counter for day/night cycles
//press space bar to move stars
let counterClick = 0;
let counterPress = 0;

//sun, moon, and sky effect variables 
let brightness = 100;
let angle = 0;
let radius = 0;
let xoff = 0.01;
let shadeTarget = 100;

//mountain variables
let z1 = 80;
let z2 = 60;
let z3 = 75;
let targetz1 = 80;
let targetz2 = 60;
let targetz3 = 75;



//create sun and moon objects
class Cycle {
    constructor(x, y, xTarget, yTarget) {
        this.xPos = x;
        this.yPos = y;
        this.xTarget = xTarget;
        this.yTarget = yTarget;
    }
}
const sun = new Cycle(550, 600, 555, 40);
const moon = new Cycle(550, -100, 530, -100);

//create star objects
class Star {
    constructor(x, y, xOrigin, yOrigin) {
        this.xHome = x;
        this.yHome = y;
        this.xOrigin = xOrigin;
        this.yOrigin = yOrigin;
        this.x = xOrigin;
        this.y = yOrigin;
    }
}
//cerate stars 
function dots() {
    stroke(255);
    for (let star of stars) {
        strokeWeight(random(0, 2))
        star.xOrigin;
        let tx = star.xHome;
        let ty = star.yHome;
        let targetx = tx;
        let targety = ty;


        if (counterPress % 2 === 0) {
            targetx = tx;
            targety = ty;
        } else if (counterPress % 2 === 1) {
            targetx = star.x;
            targety = star.y;
        }
        star.xOrigin = lerp(star.xOrigin, targetx, 0.02);
        star.yOrigin = lerp(star.yOrigin, targety, 0.02)
        point(star.xOrigin, star.yOrigin);
    }
}


//create cloud objects 
class cloud {
    constructor(x, y, size, speed, colour) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.colour = colour;
    }
}
//create clouds
function cloudySky() {
    noStroke();
    for (let obj of clouds) {
        fill(obj.colour);
        //console.log(obj.colour)
        ellipse(obj.x, obj.y, obj.size, obj.size / 3)
        ellipse(obj.x, obj.y - obj.size / 10, obj.size / 2, obj.size / 2);
        obj.x += obj.speed;
        if (obj.x > width + obj.size) {
            obj.x = -100;
        }
    }
}

//load images 
function preload() {
    sunImg = loadImage('images/Sun.png');
    moonImg = loadImage('images/Moon.png');
    font = loadFont('font/Rubik_Burned/RubikBurned-Regular.ttf');
}


function setup() {
    imageMode(CENTER);
    createCanvas(600, 300);
    colorMode(HSB);
    angleMode(DEGREES);
    noStroke();

    //call function to get points for star coordinates
    findTextPoints();

    //create 5 cloud objects and push into array 
    for (let i = 0; i < 5; i++) {
        clouds.push(new cloud(random(0, width), random(25, 150), random(50, 100), random(0.15, 0.5), random(40, 255)))
    }
}


function draw() {
    //day/night effets
    dayNight();
    sunLight();
    moonLight();
    if (counterClick % 2 === 1) {
        dots();
    } else if (counterClick % 2 === 0) {
        cloudySky()
    }
    land();
}

//draw mountains
function land() {
    noStroke()

    //change the colour based on night/day cycle
    z1 = lerp(z1, targetz1, 0.2)
    z2 = lerp(z2, targetz2, 0.2);
    z3 = lerp(z3, targetz3, 0.2);
    fill(120, z1, z1);
    triangle(-50, height, 20, 200, 75, height);
    fill(120, z2, z2)
    triangle(45, height, 90, 175, 125, height);
    fill(100, z3, z3)
    triangle(100, height, 150, 215, 200, height);
}


//find the points for the text
function findTextPoints() {
    let coding = font.textToPoints('Coding', 25, 200, 100, {
        sampleFactor: 0.14
    });
    let creative = font.textToPoints('Creative', 25, 100, 100, {
        sampleFactor: 0.14
    });

    //for each point create an object and push into empty array
    for (let i = 0; i < creative.length; i++) {
        let pts = creative[i];
        let xOrigin = random(0, width);
        let yOrigin = random(0, height);
        stars.push(new Star(pts.x, pts.y, xOrigin, yOrigin));
    }
    for (let i = 0; i < coding.length; i++) {
        let pts = coding[i];
        let xOrigin = random(0, width);
        let yOrigin = random(0, height);
        stars.push(new Star(pts.x, pts.y, xOrigin, yOrigin));
    }
}

//create a counter for star function
function keyReleased() {
    if (key === ' ') {
        counterPress++
    }
}

//change sun/moon/colour depending on mouse clicks
function mouseClicked() {
    counterClick++
    if (counterClick % 2 === 0) {
        shadeTarget = 100;
        sun.yTarget = 40;
        moon.yTarget = -100;
        targetz1 += 40;
        targetz2 += 40;
        targetz3 += 40;
    } else if (counterClick % 2 === 1) {
        shadeTarget = 20;
        sun.yTarget = 600;
        moon.yTarget = 50;
        targetz1 -= 40;
        targetz2 -= 40;
        targetz3 -= 40;
    }
}


function moonLight() {
    //move the moon up and down
    moon.xPos = lerp(moon.xPos, moon.xTarget, 0.03);
    moon.yPos = lerp(moon.yPos, moon.yTarget, 0.03);

    //draw the moon
    push();
    translate(moon.xPos, moon.yPos);
    image(moonImg, 0, 0, 50 * 2, 50 * 2);
    pop();
}


function sunLight() {
    //make the sun oscilate and rotate and move up and down
    radius = map(noise(xoff), 0, 1, 50, 75);
    sun.xPos = lerp(sun.xPos, sun.xTarget, 0.03);
    sun.yPos = lerp(sun.yPos, sun.yTarget, 0.03);

    push();
    translate(sun.xPos, sun.yPos);
    noStroke();
    //make the sun spikes 
    fill(20, 100, 100);
    beginShape();
    for (let i = 0; i < 360; i += 20) {
        let x1 = radius / 2 * cos(angle + i);
        let y1 = radius / 2 * sin(angle + i);
        let x2 = (radius - (radius / 3)) * cos(angle + i + 10);
        let y2 = (radius - (radius / 3)) * sin(angle + i + 10);
        stroke(0);
        vertex(x1, y1);
        vertex(x2, y2);
    }
    endShape();

    //draw the centre image
    image(sunImg, 0, 0, radius * 2.5, radius * 2.5);
    angle += 0.2;
    xoff += 0.01;

    pop();
}


function dayNight() {
    //change the brighness of the background
    brightness = lerp(brightness, shadeTarget, 0.05);
    background(200, 100, brightness, 80);
}