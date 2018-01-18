
// Modules
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// Schema
const dishSchema = new Schema({
    name: {
        type:       String,
        required:   true,
        unique:     true
    },
    description: {
        type:       String,
        required:   true
    }
}, {
    timestamps: true
});

// Model
let Dishes = mongoose.model('Dish', dishSchema);

// Export module
module.exports = Dishes;
