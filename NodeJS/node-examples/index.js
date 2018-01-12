
let rect = require('./rectangle.js');

async function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    try {
        let rectangle = await rect(l, b);
        console.log("This statement after the call to rect()");

        getProps(rectangle);
    } catch (err) {
        getError(err);
    }
}

function getProps(rectangle) {
    console.log("The area of the rectangle is " + rectangle.area());
    console.log("The perimeter of the rectangle is " + rectangle.perimeter());
}

function getError(err) {
    console.log(err.message);
}

solveRect(2,6);
solveRect(-3,5);
