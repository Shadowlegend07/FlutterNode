const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const patientSchema = new mongoose.Schema({
    patientname: {
        type: String,
        required: [true, "Patient Name is required"],
    },
    doadmit: {
        type: Date,
        default: Date.now,
    },
    dodischarge: {
        type: Date,
        default: Date.now,
    },

    age: {
        type: Number,
        required: [true, "Age Required"],
    },
    sex: {
        type: String,
    },
    dob: {
        type: String,
        required: [true, "Date of Birth Is Required"],
    },

    occupation: {
        type: String,
    },
    policethana: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    City: {
        type: String,
    },
    nationality: {
        type: String,
        default: "INDIA",
    },
    consultant: {
        type: String,
    },
});

const Patient = new mongoose.model("Patient", patientSchema);

module.exports = Patient;