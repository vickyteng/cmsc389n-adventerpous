module.exports = {
    eventName: function () {
        return document.getElementById("event").value;
    },
    time: function () {
        return document.getElementById("time").value;
    },
    location: function () {
        return document.getElementById("location").value;
    },
    date: function () {
        return document.getElementById("date").value;
    }
};
