const mongoose = require("mongoose");

const image = new mongoose.Schema({
    photourl: {
        type: String,
    },
});

const Imageurl = mongoose.model("ImageUrl", image);

module.exports = Imageurl;