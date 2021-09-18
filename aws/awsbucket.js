const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

s3 = new AWS.S3({ apiVersion: "v1" });

s3.listObjects({
        Bucket: "clover-carte",
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
        Bucket: "clover-carte",
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