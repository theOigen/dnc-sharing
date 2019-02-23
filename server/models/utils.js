const sha256 = require("sha256");
const config = require("../config")

class Utils{
    static hash(str){
        let saltedStr = str + config.salt;
        return sha256(saltedStr).toString("hex");
    }
}

module.exports = {Utils};