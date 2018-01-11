
let rect = require('./rectangle.js');

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    rect(l, b)
        .then(getProps, getError)
        .catch(console.error);

    console.log("This statement after the call to rect()");
}

function getProps(rectangle) {
    console.log("The area of the rectangle is " + rectangle.area());
    console.log("The perimeter of the rectangle is " + rectangle.perimeter());
}

function getError(err) {
    console.log(err.message);
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);
