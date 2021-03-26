const express = require("express");
const path = require("path");
const app = express();

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
app.get("/api/notes", function(req, res){
    // Retrieve all notes and res.json them back to the front end
})

app.post("/apir/notes", function(req, res){
    // create a note from req.body
})

app.delete("/api/notes:id", function(req, res){
    // Delete a note based off id
    const { id } = req.params;
    
})

// Listener
app.listen(PORT, () => console.log("App listening on port " + PORT));
