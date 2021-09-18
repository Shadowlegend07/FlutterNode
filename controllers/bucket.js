const express = require("express");
const {
    getAllItems,
    createFoodItem,
} = require("../Controllers/foodItemController");
const upload = require("../multer");

const router = express.Router();

router.route("/").get(getAllItems).post(upload.single("photo"), createFoodItem);

module.exports = router;