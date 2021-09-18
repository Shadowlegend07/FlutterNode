const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//const User = require("../models/user.model");
const Patient = require("../models/addpatient.model");
const jwt = require("jsonwebtoken");
const check = require("../middleware/check-auth");

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

module.exports = router;