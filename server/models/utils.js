const sha256 = require("sha256");
const config = require("../config")
const cloudinary = require('cloudinary');
const util = require('util');
cloudinary.config({
    cloud_name: process.env.cloud_name || config.cloudinary.cloud_name,
    api_key: process.env.api_key || config.cloudinary.api_key,
    api_secret: process.env.api_secret || config.cloudinary.api_secret
});
const handle_file_upload_promised = util.promisify(handleFileUpload);
const delete_file_promised = util.promisify(deleteFile);
function handleFileUpload(fileBuffer, callback) {
    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' },
        function (error, result) {
            console.log(result, error)
            if (error) callback(error)
            else callback(null, result);
        })
        .end(fileBuffer);
}
function deleteFile(id, callback) {
    console.log(id);
    cloudinary.uploader.destroy(id, function (info) {
        let result, err;
        err = info.error;
        result = info.result;
        console.log(err, result);
        if (err) callback(err)
        else if (result != "ok") callback(new Error("No file to delete"))
        else callback(null, result);
    }, { resource_type: 'raw' });
}

class Utils {
    static hash(str) {
        let saltedStr = str + config.salt;
        return sha256(saltedStr).toString("hex");
    }
    static handle_file_upload_promised(fileBuffer) {
        return handle_file_upload_promised(fileBuffer);
    }
    static delete_file_promised(id) {
        return delete_file_promised(id);
    }
}

module.exports = { Utils };