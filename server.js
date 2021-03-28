// NPM Modules
const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// creates an express server
const app = express();

// Port
const PORT = process.env.PORT || 8080;

// creates a global variable for reading our db
// async function, waits until we read our DB file, then parses it.
let notes = (async function () {
  const data = await fs.promises.readFile("./db/db.json", "utf8");
  notes = JSON.parse(data);
})();

// Middleware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file hosting for public directory
app.use(express.static("public"));

// HTML Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API Routes
app.get("/api/notes", async function (req, res) {
  // responds with our database
  res.json(notes);
});

app.post("/api/notes", async function (req, res) {
  // Takes the body of the request and puts it in a variable
  const newNote = req.body;
  // adds on a unique identifier to our new note object
  newNote.id = uuidv4();
  // pushes the newly made note object to our notes array
  notes.push(newNote);
  // Writes our updated notes list to file
  const posted = await fs.promises.writeFile(
    "./db/db.json",
    JSON.stringify(notes)
  );
  // sends back "Ok" server code and the updated notes array.
  res.status(200).json(posted);
});

// Deletes our notes based off the url sent with the req
app.delete("/api/notes/:id", function (req, res) {
  //Pulls the id off the request and saves it to a variable
  const { id } = req.params;

  // Filters our notes function for ID and excludes it from array and gives us back a copy
  let filtered = notes.filter(function (notes) {
    return notes.id != id;
  });
  
  //overwrites our old array with our filtered array.
  notes = filtered;

  // Writes our new array to file.
  fs.writeFile(__dirname + "/./db/db.json", JSON.stringify(filtered), function (err) {
    if (err) throw err;
  });
  res.end();
});

// Listener
app.listen(PORT, () => console.log("App listening on port " + PORT));
