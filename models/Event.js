var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    location: {
        type: String
    },
    time: {
        type: String
    },
    eventType: {
        type: String
    },
    club: {
        type: String
    },
    link: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    },
    imagePath: {
        type: String
    }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
