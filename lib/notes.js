// import fs library
const fs = require("fs");
// import path library
const path = require("path");
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
function findById(id, notesObj) {
  const result = notesObj.filter((notes) => notes.id === id)[0];
  return result;
}
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
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

module.exports = {
  filterByQuery,
  findByTitle,
  findById,
  createNewNote,
  validateNote,
};
