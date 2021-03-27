// NPM Modules
const fs = require("fs")
const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require('uuid');


// Port
const PORT = process.env.PORT || 8080;

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
app.get("/api/notes", async function(req, res){
// create a variable that is an await function. function calls on our database to send us it's contents
  let parsedNotes= 
  await fs.promises.readFile("./db/db.json", "utf8", function (err, data){})
// responds with the contents of our parsed database
  res.json(JSON.parse(parsedNotes))
})



app.post("/api/notes", function(req, res){
    // create a note from req.body
})

app.delete("/api/notes:id", function(req, res){
    // Delete a note based off id
    const { id } = req.params;
    
})

// Listener
app.listen(PORT, () => console.log("App listening on port " + PORT));
