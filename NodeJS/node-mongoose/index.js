
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
    .then((dish) => {
        console.log('- Inserted dish:\n', dish);

        const fields = {description: "Updated"};
        const opts   = {new: true};

        return Dishes.findByIdAndUpdate(dish._id, {$set: fields}, opts).exec();
    })
    .then((dish) => {
        console.log('\n- Updated dish:\n', dish);

        const comment = {
            rating:     5,
            comment:    "Really good",
            author:     "Me"
        };

        dish.comments.push(comment);

        return dish.save();
    })
    .then((dish) => {
        console.log('\n- Inserted comment in dish:\n', dish);

        return db.collection('dishes').drop();
    })
    .then(() => {
        console.log('\n- Dropped collection and closed connection\n');
        return client.close();
    })
    .catch(console.log);

}).catch(console.log);
