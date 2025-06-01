const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let notes = [];
let idCounter = 1;

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add a note
app.post("/notes", (req, res) => {
  const { text } = req.body;
  const newNote = { id: idCounter++, text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
