const fs = require("fs");
const {
  filterByQuery,
  findByTitle,
  findById,
  createNewNote,
  validateNote,
} = require("../lib/notes");
const { notes } = require("../db/db.json");

jest.mock("fs");
test("filterByQuery", () => {
  const startingNotes = [
    {
      title: "TBRC meeting notes",
      text: "Test text",
      id: "0",
    },
    {
      title: "Moving notes",
      text: "sample notes",
      id: "1",
    },
  ];
  const updatedNotes = filterByQuery(
    { title: "TBRC meeting notes" },
    startingNotes
  );
  expect(updatedNotes.length).toEqual(1);
});
test("findByTitle", () => {
  const startingNotes = [
    {
      title: "TBRC meeting notes",
      text: "Test text",
      id: "0",
    },
    {
      title: "Moving notes",
      text: "sample notes",
      id: "1",
    },
  ];
  const result = findByTitle("Moving notes", startingNotes);
  expect(result.id).toBe("1");
});
test("findById", () => {
  const startingNotes = [
    {
      title: "TBRC meeting notes",
      text: "Test text",
      id: "0",
    },
    {
      title: "Moving notes",
      text: "sample notes",
      id: "1",
    },
  ];
  const result = findById("0", startingNotes);
  expect(result.title).toBe("TBRC meeting notes");
});
test("createNewNote", () => {
  const note = createNewNote(
    {
      title: "TBRC meeting notes",
      text: "Test text",
      id: "0",
    },
    notes
  );
  expect(note.title).toBe("TBRC meeting notes");
  expect(note.text).toBe("Test text");
  expect(note.id).toBe("0");
});
test("validateNote", () => {
  const validNote = {
    title: "TBRC meeting notes",
    text: "Test text",
    id: "0",
  };
  const invalidNote = {
    title: "TBRC meeting notes",
    id: "0",
  };
  const result0 = validateNote(validNote);
  const result1 = validateNote(invalidNote);
  expect(result0).toBe(true);
  expect(result1).toBe(false);
});
