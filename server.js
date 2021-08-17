const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const db = require("./Develop/models")
const routes = require("./Develop/controllers");
const view = require("./Develop/controllers/view/viewRoutes");
const api = require("./Develop/controllers/api/apiRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(viewRoutes);
app.use(apiRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});