// link to the db.json
const { notes } = require("./db/db.json");
// loal express package
const express = require("express");
// set up port for both localhost and heroku
const PORT = process.env.PORT || 3002;
// instanitate the server
const app = express();
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
app.post("/api/notes", (req, res) => {});
