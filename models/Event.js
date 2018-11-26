var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
