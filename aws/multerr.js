const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../aws/awsbucket");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },

        key: (req, file, cb) => {
            cb(null, "filename");
            //const ext = Path.extname(file.originalname);
        },
    }),
});

module.exports = upload;

//  acl: "public-read",
/*         key: function(req, file, cb) {
            const fileName = `foodItem-${Date.now()}.${
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      }`;

            cb(null, fileName);
        }, */

/** metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },

        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
        }, */