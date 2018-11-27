var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var ejs = require('ejs');
var fs = require('fs');
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

app.post('/eventSubmission.html', function(req, res) {
    var eventName = JSON.stringify(req.body['event']);
    var time = JSON.stringify(req.body['time']);
    var location = JSON.stringify(req.body['location']);
    var date = JSON.stringify(req.body['date']);
    var type = JSON.stringify(req.body['types[]']);
    var club = JSON.stringify(req.body['club']);
    var link = JSON.stringify(req.body['link']);
    var imgPath = JSON.stringify(req.body['image']);
    var trimmedPath = imgPath.replace('\"', '').replace('\"', '');
    var contentType;
    if (imgPath.search('.png') || imgPath.search('.PNG') ) {
        contentType = 'image/png';
    } else if (imgPath.search('.jpg') || imgPath.search('.JPG')) {
        contentType = 'image/jpg';
    } else if (imgPath.search('.jpeg') || imgPath.search('.JPEG')) {
        contentType = 'image/jpeg';
    }

    var fullPath = __dirname + "/static/uploads/" + trimmedPath;

    var event = new Event({
        name: eventName,
        time: time,
        location: location,
        date: date,
        eventType: type,
        club: club,
        link: link,
        imagePath: fullPath
    });

// store binary data of image in mongoDB
    event.image.data = fs.readFileSync(fullPath);
    event.image.contentType = contentType;

    // Save movie to database
    event.save(function(err) {
        if (err) throw err;

        console.log(`${eventName} saved`);
    });

    res.render('eventSubmission', {event: event, imagePath: "../uploads/" + trimmedPath});
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


app.listen(3000, () => console.log('Example app listening on port 3000!'));
