const router = require("express").Router();
// import function from notes.js
const {
  filterByQuery,
  findByTitle,
  findById,
  createNewNote,
  validateNote,
} = require("../../lib/notes");
// link to the db.json
let { notes } = require("../../db/db.json");

// add the route to db.json
router.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
// handle requests for a specific notes
router.get("/notes/:title", (req, res) => {
  const result = findByTitle(req.params.title, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
// define route that listens for user's post requests
router.post("/notes", (req, res) => {
  //req.body is where our incoming content will be
  // set id based on what the next index of the arry will be
  req.body.id = notes.length.toString();
  // validate and store user input
  if (!validateNote(req.body)) {
    res.status(400).send(`The new note is not properly formatted`);
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});
// define route that listens for user's delete requests
router.delete("/notes/:id", (req, res) => {
  // test for the delete api connection
  // res.send("Got a delte request at user");
  const requestDeleteId = req.params.id;
  let deleteNote = findById(requestDeleteId, notes);
  const index = notes.indexOf(deleteNote);
  if (index) {
    notes.splice(index, 1);
    notes.forEach((note) => {
      note.id = notes.indexOf(note).toString();
    });
    res.json(notes);
  } else {
    res.send(404);
  }
});

module.exports = router;
