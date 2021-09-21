const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//const User = require("../models/user.model");
const Patient = require("../models/addpatient.model");
const jwt = require("jsonwebtoken");
const check = require("../middleware/check-auth");
const Imageurl = require("../models/image.model");
const upload = require("../aws/multerr");

router.get("/getpatient", check, async(req, res, next) => {
    try {
        const result = await Patient.find();
        res.status(200).send(result);
    } catch (error) {
        res.send(error);
    }
});

router.post("/addpatient", check, (req, res, next) => {
    Patient.create(req.body)
        .then((patient) => {
            res.send(patient);
        })
        .catch(next);
});

router.post("/upload", upload.array("filename", 5), (req, res, next) => {
    // const imagecollection = req.app.locals.imagecollection;
    const uploadedfile = req.file.location;
    try {
        Imageurl.create({ photourl: uploadedfile }).then((result) =>
            console.log(result)
        );
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;