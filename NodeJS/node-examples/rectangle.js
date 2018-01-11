
module.exports = rectangle;

function rectangle (x, y) {

    let rectPromise = function (resolve, reject) {
        if (x <= 0 || y <= 0) {
            let err = new Error("Rectangle dimensions should be greater than zero:  l = " + x + ",  and b = " + y);

            return setTimeout( reject(err), 1000);
        }

        const prop = {
            perimeter:  () => (2*(x+y)),
            area:       () => (x*y)
        };

        return setTimeout( resolve(prop), 2000);
    };

    return new Promise(rectPromise);
}
