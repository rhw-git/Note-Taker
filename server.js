// loal express package
const express = require("express");
// add router
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
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
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// make our server listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
