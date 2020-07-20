// Dependencies
// =============================================================
const express = require ("express");
const bodyParser = require ("body-parser")
const path = require ("path");
const { dirname } = require("path");
const { application } = require("express");
const { json } = require("body-parser");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}))

// Set up Array for customers and Waiting List
const customers = [];
const waitList = [];

// Routes
// =============================================================
// Basics rout that sends the user first to the AJAX Page

// res.send (Welcome Page)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// app.get("/index.html", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "index.html"), {dotfiles: "allow"});
// });
// res.send (Booked tables)
app.get("/tables", (req, res, next) => {
    res.sendFile(path.join(__dirname, "tables.html"), {dotfiles: "allow"});
});

// res.send (Make Reservation)
app.get("/reserve", (req, res, next) => {
    res.sendFile(path.join(__dirname, "reserve.html"), {dotfiles: "allow"});
});


app.get("/api/tables", (req, res) => {
    res.json (customers);
});

app.get("/api/waitList", (req, res) =>{
    res.json (waitList);
});

// Creating Clear function
app.post("/api/clear", (req, res) => {
    customers = [];
    waitList = [];
})

app.post("/api/new", (req, res) => {
    const newCustomer = req.body;
    if (customers.length <= 5) {
        customers.push(newCustomer);
    } else {
        waitList.push(newCustomer);
    }
    res.json(newCustomer);
})

// res.send (Make error webpage)
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "error.html"), {dotfiles: "allow"});
});

// Starts the server to begin listening
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});