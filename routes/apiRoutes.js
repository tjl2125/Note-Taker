const express = require('express');
const app = express (); 
const fs = require ('fs');
const path = require ('path'); 
const db = require('../db/db.json');
const uuid = require("uuid");

module.exports = (app) => {

app.get('/api/notes', (req, res) => res.json(db));

//Display
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
  })
});

//New Note
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = uuid.v4();
      notes.push(newNote);

      const createNote = JSON.stringify(notes);
      fs.writeFile(path.join(__dirname, "../db/db.json"), createNote, (err) =>{
          if (err) throw err;
      });
      res.json(newNote);
  });
});

//Delete Saved Notes
app.delete("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const notesArray = notes.filter(item => {
            return item.id !== noteID
        });
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), (err, data) => {
            console.log("Deleted")
            if (err) throw err; 
            res.json(notesArray) 

        });
    });

});
};
