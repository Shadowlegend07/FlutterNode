const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Patient = require("../models/addpatient.model");
const jwt = require("jsonwebtoken");
const check = require("../middleware/check-auth");
const upload = require("../aws/multerr");
const router = express.Router();
//const upload = require("../multer");
/*Code for Aws */
//const express = require("express");
const Imageurl = require("../");

const {
    getAllItems,
    createFoodItem,
} = require("../Controllers/foodItemController");

router.route("/").get(getAllItems).post(upload.single("photo"), createFoodItem);

module.exports = router;

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