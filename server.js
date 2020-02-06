// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
// var characters = [
//   {
//     routeName: "yoda",
//     name: "Yoda",
//     role: "Jedi Master",
//     age: 900,
//     forcePoints: 2000
//   },
//   {
//     routeName: "darthmaul",
//     name: "Darth Maul",
//     role: "Sith Lord",
//     age: 200,
//     forcePoints: 1200
//   },
//   {
//     routeName: "obiwankenobi",
//     name: "Obi Wan Kenobi",
//     role: "Jedi Master",
//     age: 55,
//     forcePoints: 1350
//   }
// ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
// Sets the default root page to display view.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});
app.get("/api/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./tables.json"));
});
app.get("/api/wait", function(req, res) {
  res.sendFile(path.join(__dirname, "./wait.json"));
});
app.post("/make", function(req, res) {
  let reservation = {
    customerName: "Tyler Pho",
    phoneNumber: "8019465454",
    customerEmail: "Tyler.phopho@gmail.com",
    customerID: "3675"
    }
  //pull in database
  fs.readFile('./tables.json', "utf-8", (err, data) => {
    if (err) throw err;
    // console.log(data);
    let tables = JSON.parse(data);
    console.log(tables);
     //data manipulation
  if(tables.length > 4){


    fs.readFile('./wait.json', "utf-8", (err,data)=>{
      // console.log(data);
      let wait = JSON.parse(data) 
      // console.log(wait);
      wait.push(reservation);
      console.log(wait);
    })
    console.log("No tables available", tables.length);
      
     tables.push(reservation);
    fs.writeFile("./tables.json", JSON.stringify(tables), function(err){
      if (err) throw err;
      //returns status and message as response
      return res.status(200).send("reservation received");
    })
  }else{
    console.log("Tables are available", tables.length);
    tables.push(reservation);
    fs.writeFile("./tables.json", JSON.stringify(tables), function(err){
      if (err) throw err;
      //returns status and message as response
      return res.status(200).send("reservation received");
    })
  }
  });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
