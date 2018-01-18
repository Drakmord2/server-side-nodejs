
// Models
const Dishes = require('./models/dishes');

// Methods
function start (conn) {
    console.log('\n- Connected correctly to server\n');

    const db        = conn.db;
    const client    = conn.client;

    const data = {
        name:           "Pizza",
        description:    "Cheese and Pepperoni"
    };

    Dishes.create(data)
        .then((dish) => {
            console.log('- Inserted dish:\n', dish);

            const fields = {description: "Chikon, bacon, ranch"};
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

            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log('\n- Found dishes:\n', dishes);

            return db.collection('dishes').drop();
        })
        .then(() => {
            console.log('\n- Dropped collection\n');
            return client.close();
        })
        .catch((err) => {
            console.error('- Error:\n', err.message);

            conn.disconnect();
        });
}

function onError (err) {
    if (err) {
        console.log('MongoDB connection error: [%s]\n', err);
        process.exit(1);
    }
}

// Export Module
module.exports = { start, onError };
