//Assignment 2, Milestone 1, Question 2, Max Bremner, s5262372

//--------------- part 1 ------------------//
//load files and create objects and arrays to store data
let tspPath = "./TSP_EUC_Problems/a280.tsp";
let solPath = "./TSP_Solutions/a280.sol";
let fileTSP;
let fileSol;
let fileObj = {};
let cities = [];

class city {
    constructor(id, xPos, yPos) {
        this.id = id;
        this.x = xPos;
        this.y = yPos;
    }
}

function preload() {
    fileTSP = loadStrings(tspPath);
    fileSol = loadStrings(solPath);
}

function loadTSP(file) {
    let frst; //first coordinate
    let name; //name of file
    let totl; //number of cities
    let eof; //end of file
    let arrTrim = [];


    for (let i = 0; i < file.length; i++) {
        arrTrim = file[i].trim(); //trim white spaces 
        if (arrTrim.indexOf("NAME") === 0) {
            name = i; //index of the name
        }
        if (arrTrim.indexOf("DIMENSION") === 0) {
            totl = i; //index of the number of cities
        }
        if (arrTrim.indexOf("1 ") === 0) {
            frst = i; //index of the first coordinate
        }
        if (arrTrim.indexOf("EOF") === 0) {
            eof = i; //index of the end of the file
        }
        if (eof === undefined) {
            eof = file.length //if eof is not specified, set eof to the file.length
        }
    }

    //load the name
    let t = file[name].indexOf(":") + 2; //index of the start of the name
    fileObj.name = file[name].substring(t, file[name].length); //extract the name

    //load the total number of cities
    let e = file[totl].indexOf(":") + 2;
    fileObj.numOfCities = file[totl].substring(e, file[totl].length);

    for (let i = frst; i < eof; i++) {
        let newArray = file[i].split(" ") //split the index into an array
        newArray = newArray.filter(num => String(num).trim(" ")); //remove white space 

        //create a new city obj and push into array
        let id = newArray[0];
        let xPos = newArray[1];
        let yPos = newArray[2];
        cities.push(new city(id, xPos, yPos));
    }

    //scale points to the canvas
    //find the array min and max
    //apply is applying a function to the variables inside the brackets 
    let xmin = Math.min.apply(Math, cities.map(city => city.x));
    let xmax = Math.max.apply(Math, cities.map(city => city.x));
    let ymin = Math.min.apply(Math, cities.map(city => city.y));
    let ymax = Math.max.apply(Math, cities.map(city => city.y));

    //map the points to the canvas
    for (const city of cities) {
        city.x = map(city.x, xmin, xmax, 0, 800);
        city.y = map(city.y, ymin, ymax, 0, 800);
    }
}

//--------------- part 2 ------------------//
function showLoadedTSP() {
    textSize(16); //draw the name, number of cities, and the shortest distance
    fill(252, 232, 179);
    noStroke();
    text("Name: " + fileObj.name, 5, 20);
    text("Number of points: " + fileObj.numOfCities, 5, 40);
    text("Total Distance: " + fileSol[1], 5, 60)

    strokeWeight(2); //draw each point to the canvas 
    noFill();
    stroke(252, 232, 179);
    push();
    translate(50, 50);
    for (const city of cities) {
        ellipse(city.x, city.y, 8, 8);
    }
    pop()
}

//--------------- part 3 ------------------//
function showSolution() {
    push()
    translate(50, 50);
    noFill();
    strokeWeight(1);
    stroke(252, 232, 179, 100)
    beginShape();
    for (let i = 2; i < fileSol.length; i++) {
        let e = fileSol[i] - 1;
        vertex(cities[e].x, cities[e].y);
    }
    endShape();
    pop();
}

function fileErrorAlert() {
    if (fileObj.name.trim() != fileSol[0].trim()) {
        //throw new Error("file problem and file solution do not match.");
        alert("file problem and file solution do not match.")
    }
}


function setup() {
    createCanvas(900, 900);
    loadTSP(fileTSP);
    fileErrorAlert();
    strokeWeight(1)
    x1 = cities[fileSol[t] - 1].x;
    y1 = cities[fileSol[t] - 1].y;
    x = x1;
    y = y1;
}


function draw() {
    background(144, 66, 42, 100);
    showLoadedTSP();
    if (mouseIsPressed) {
        showSolution();
    }
    moveSalesPerson()
}

//--------------- bonus ------------------//
let current;
let next;
let x, x1, y1, y, xTar, yTar;
let t = 2;
let a = true;
let pathArray = []

class lineObj {
    constructor(x0, y0, x1, y1) {
        this.x0 = x0
        this.y0 = y0
        this.x1 = x1
        this.y1 = y1
    }
}

function moveSalesPerson() {
    if (t > cities.length) { //if the point reaches the end 
        a = false;
        if (x - xTar < 0.01 && x - xTar > -0.01 && y - yTar < 0.01 && y - yTar > -0.01)
            pathArray.splice(pathArray.length - 1, 1);
    } else if (t < 3) { // if the point reaches the start 
        a = true;
    }

    if (a === true) {
        next = fileSol[t + 1] - 1;
    } else if (a === false) {
        next = fileSol[t - 1] - 1;
    }
    current = fileSol[t] - 1;
    xTar = cities[next].x;
    yTar = cities[next].y;

    x = lerp(x, xTar, 0.3);
    y = lerp(y, yTar, 0.3);

    //draw the moving point 
    push();
    translate(50, 50);
    noFill();
    strokeWeight(4);
    stroke(121, 157, 249);
    ellipse(x, y, 20, 20);

    strokeWeight(3);
    stroke(252, 232, 179)

    if (a === true) {
        line(cities[current].x, cities[current].y, x, y);
    } else if (a === false) {
        line(xTar, yTar, x, y);
    }

    for (const p of pathArray) //draw a line for each point in the array
        line(p.x0, p.y0, p.x1, p.y1);

    //when the point reached the target
    if (x - xTar < 0.01 && x - xTar > -0.01 && y - yTar < 0.01 && y - yTar > -0.01) {
        if (a === true) {
            t++; //increment t value 
            pathArray.push(new lineObj(cities[current].x, cities[current].y, xTar, yTar));
        } else if (a === false) {
            pathArray.pop();
            t-- //decrement the t value 
        }
    }
    pop();
}