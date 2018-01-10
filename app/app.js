// Node.js Project

const express   = require('express');
const mongoose  = require('mongoose');
const app	    = express();

const PORT = 9090;

app.get('/', (req, res, next) => {
    let date = new Date();
    let msg = `<h1>NodeJS application running on port: ${PORT}</h1>
               <br>
               <h2>${date.toDateString()}</h2>`;

    res.send(msg);

    logRequest(req);
});

app.get('/mongo', (req, res, next) => {

        mongoose.connect('mongodb://mongo:27017');
        mongoose.Promise = global.Promise;

        let Cat = mongoose.model('Cat', {name: String});

        let kitty = new Cat({name: 'Zildjian'});
        kitty.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('meow');
            }
        });

        res.send('Mongo working!');
});

app.listen(PORT, () => {
    console.log(`Node and Express running on port: ${PORT}`);
});

function logRequest(req) {
    console.log(`Request received. Method: ${req.method} | Route: ${req.url}`);
}


