//Milestone 1, Question 1, Max Bremner, s5262372
// draw 5 rectangles with varing opacity.


//create a variable for the alpha value
let alphaVal

function setup() {
    createCanvas(500, 100);
}

function draw() {
    //set the background color
    background(81, 93, 238);

    //call rectangle function
    rectangles();
}

function rectangles() {
    //draw 5 rectangles with increasing opacity 
    for (let i = 0; i <= 4; i++) {
        //increment the alpha value
        alphaVal = 30 + (30 * i);

        //set the fill colour
        fill(107, 255, 40, alphaVal)

        //draw rectangles
        rect((i * 100) + 20, 20, 60, 60, 10);
    }

}