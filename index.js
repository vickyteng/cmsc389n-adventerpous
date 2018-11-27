var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var ejs = require('ejs');
var Event = require('./models/Event');

// Load envirorment variables
dotenv.load();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});
mongoose.connection.once('open', function() {
  console.log("Connection Successful!");
});

// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// redirect static files, i.e. css
app.use(express.static(path.join(__dirname, "static")));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/submitForm.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/submitForm.html'));
});

app.get('/eventSubmission.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/eventSubmission.html'));
});

app.post('/viewEvents.html', function(req, res) {
    var eventName = JSON.stringify(req.body['event']);
    var time = JSON.stringify(req.body['time']);
    var location = JSON.stringify(req.body['location']);
    var date = JSON.stringify(req.body['date']);
    var type = JSON.stringify(req.body['types[]']);

    var event = new Event({
        name: eventName,
        time: time,
        location: location,
        date: date,
        eventType: type
    });

    // Save movie to database
    event.save(function(err) {
        if (err) throw err;

        console.log(`${eventName} saved`);
    });

// currently doesn't display most recent saved event
    Event.find({}, function(err, events) {
        if (err) throw err;

        res.render('viewEvents', {events: events});
    });
});

app.get('/viewEvents.html', function(req, res) {
    Event.find({}, function(err, events) {
        if (err) throw err;

        console.log("PROCESSING VIEW EVENTS PAGE...");
        //return res.json(events);
        res.render('viewEvents', {events: events});
   });
});

function main() {
    document.getElementById("submit").onclick = submitEvent;
}

function submitEvent() {
    // Verify valid phone number
    var eventName = eventInfo.eventName;
    var time = eventInfo.time;
    var location = eventInfo.location;
    var date = eventInfo.date;

    var event = new Event({
        name: eventName,
        time: time,
        location: location,
        date: date
    });

    // Save movie to database
    event.save(function(err) {
        if (err) throw err;

        console.log("New event entered");
    });
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));
