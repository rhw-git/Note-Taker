// link to the db.json
const { notes } = require("./db/db.json");
// loal express package
const express = require("express");
// instanitate the server
const app = express();
// make our server listen
app.listen(3002, () => {
  console.log(`API server now on port 3002!`);
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
// add the route to db.json
app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
