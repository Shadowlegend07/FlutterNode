const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const check = require("../middleware/check-auth");
const upload = require("../aws/multerr");
const router = express.Router();

router.post("/uploadimage", (req, res, next) => {
    const uploadfile = upload.single("filename");

    uploadfile(req, res, (err) => {
        if (err)
            return res.status(400).json({ success: false, message: err.message });

        console.log(req.files);
        res.status(200).json({ data: req.file });
    });

    Imageurl.create({ photourl: req.file.location });
    console.log(req.file.location);
});
//  bucketName: clover-carte

/**/
router.get("/retry", check, async(req, res, next) => {
    try {
        const result = await User.find();
        res.status(200).send(result);
    } catch (error) {
        res.send(error);
    }
});

router.post("/signup", (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.send(user);
        })
        .catch(next);
    /*    var user = new User(req.body);
                                                                                                                                                                                                                            user.save() */
});

//code for posting data to Database

router.post("/login", (req, res, next) => {
    User.find({ userid: req.body.userid })
        .exec()
        .then((userid) => {
            if (userid.length > 1) {
                return res.status(401).send("Data doesnt exist");
            }

            bcrypt.compare(req.body.password, userid[0].password, (err, result) => {
                if (!result) {
                    return res.status(402).send("Password Doesn't Match");
                } //this runs if password doesnt matches

                if (result) {
                    const token = jwt.sign({
                            userid: userid[0].userid,
                        },
                        "this is Dummy Text"
                    );
                    res.status(200).json({
                        userid: userid[0].userid,
                        token: token,
                    });
                }
            });
        })
        .catch((err) => {
            return res.status(404).send(err);
        });
});
module.exports = router;