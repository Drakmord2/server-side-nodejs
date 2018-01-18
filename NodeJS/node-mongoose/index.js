
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');
const Dishes        = require('./models/dishes');

const url       = 'mongodb://mongo:27017/conFusion';
const connect   = mongoose.connect(url);

connect.then((conn) => {
    const db        = conn.connections[0].db;
    const client    = conn.connections[0].client;

    console.log('\n- Connected correctly to server\n');

    Dishes.create(
        {
            name: "Pizza",
            description: "Cheese and Pepperoni"
        }
    )
    .then((result) => {
        console.log('- Inserted dish:\n', result);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log('\n- Found dishes:\n', dishes);

        return db.collection('dishes').drop();
    })
    .then(() => {
        console.log('\n- Dropped collection and closed connection\n');
        return client.close();
    })
    .catch(console.log);

}).catch(console.log);
