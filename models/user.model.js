const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "Name field is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});

userSchema.pre("save", async function(next) {
    try {
        //console.log("CAlled Before Saving a User");
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("userid", userSchema);

module.exports = User;