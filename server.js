const express = require("express")
const path = require("path");

const htmlDir = path.resolve(__dirname, "html-assets");


// Sets up the Express server
// =============================================================
const server = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express server to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// reservation array to store current reservations
const reservationList = [];
const availableTables = 5;

// function to check if any tables are avaible or not before making another reservation
const isAvailableTables = () => reservationList.length < availableTables;



// =============================================================


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

server.get("/", function(request, response) {
    response.sendFile(path.join(htmlDir, "index.html"));
});

server.get("/api/reserve", function(request, response) {
    response.sendFile(path.join(htmlDir, "reservation.html"));
});

server.get("/api/tables", function(request, response) {
    response.sendFile(path.join(htmlDir, "tables.html"));
});

server.get("/api/tables/waitList", function(request, response) {
    response.json(reservationList.slice(availableTables));
});

server.get("/api/tables/reservationList", function(request, response) {
    console.log(JSON.stringify(reservationList.slice(0, availableTables)))
    response.json(reservationList.slice(0, availableTables));
});

server.post("/api/reserve", function(request, response) {
    let reservationStatus = {};

    if (isAvailableTables()) {
        reservationStatus.booked = true;
    } else {
        reservationStatus.booked = false;
    }
    reservationList.push(request.body);
    response.send(reservationStatus);
});









// Starts the server to begin listening
// =============================================================
server.listen(PORT, function() {
    console.log("server listening on PORT " + PORT);
});