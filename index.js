//require("./models/db");
require("dotenv/config");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//code to connect Mongodb
const port = 5000;
app.listen(port, () => {
    console.log(`Express Server Started At Port : ${port}`);
});

/* const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, "");
    },
}); */

mongoose.connect("mongodb://localhost:27017/Flutter", (err) => {
    if (!err) {
        console.log("MongoDB Connection Succeeded");
    } else {
        console.log("Error In Db Connection" + err);
    }
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
//Route For Users sends to UserController
app.use("/user", require("./controllers/userController"));
app.use("/patient", require("./controllers/patientController"));
//Route for Posts sends to PostController
//app.use("/post", require("./controllers/postController"));
//error Handling Middleware

app.get("/sp", (req, res) => {
    return res.send("Hello Worlds");
});

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
    //console.log(err);
});