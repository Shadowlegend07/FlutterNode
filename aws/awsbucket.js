const AWS = require("aws-sdk");

//AWS.config.update({ region: "ap-south-1" });

s3 = new AWS.S3({
    apiVersion: "v1",
    accesskeyID: process.env.S3_ACCESS_KEY,
    secretaccesskey: S3_SECRETACCESS_KEY,
    region: S3__BUCKET_REGION,
});

s3.listObjects({
        Bucket: "",
    },
    function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    }
);

s3.getBucketAcl({
        Bucket: "",
    },
    function(err, data) {
        if (err) {
            console.log("Error", err);
        } else if (data) {
            console.log("Success", data.Grants);
        }
    }
);

module.exports = s3;