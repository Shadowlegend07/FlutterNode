const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../aws/awsbucket");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "clover-carte",
        //  acl: "public-read",
        key: function(req, file, cb) {
            const fileName = `foodItem-${Date.now()}.${
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      }`;

            cb(null, fileName);
        },
    }),
});

module.exports = upload;