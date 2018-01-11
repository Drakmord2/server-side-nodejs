
module.exports = rectangle;

function rectangle (x, y, callback) {

    if (x <= 0 || y <= 0) {
        setTimeout(
            () => callback(
                    new Error("Rectangle dimensions should be greater than zero:  l = " + x + ",  and b = " + y),
                    null
                ),
            1000
        );

    } else {

        let prop = {
            perimeter:  () => (2*(x+y)),
            area:       () => (x*y)
        };

        setTimeout( () => callback(null, prop), 2000);
    }
}
