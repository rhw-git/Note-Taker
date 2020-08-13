// import fs library
const fs = require("fs");
// import path library
const path = require("path");
// link to the db.json
const { notes } = require("./db/db.json");
// loal express package
const express = require("express");
// set up port for both localhost and heroku
const PORT = process.env.PORT || 3002;
// instanitate the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// route to all the link css and js file
app.use(express.static("public"));
// route to index html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// route to index html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// make our server listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
// select by filter with parameter
function filterByQuery(query, notesObj) {
  let filterResults = notesObj;
  if (query.title) {
    filterResults = filterResults.filter(
      (notes) => notes.title === query.title
    );
  }
  return filterResults;
}
// select a single note
function findByTitle(title, notesObj) {
  const result = notesObj.filter((notes) => notes.title === title)[0];
  return result;
}
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}
// validate user input
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}
// add the route to db.json
app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
// handle requests for a specific notes
app.get("/api/notes/:title", (req, res) => {
  const result = findByTitle(req.params.title, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
// define route that listens for user's post requests
app.post("/api/notes", (req, res) => {
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
