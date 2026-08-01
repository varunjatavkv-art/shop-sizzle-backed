const mongoose = require("mongoose");
const mongodbConnect = async(uri) => {
    try {
        const response = await mongoose.connect(uri);
        console.log("Database Connected Successfully!!");
    } catch (error) {
        console.log(error);
    }
};
module.exports = {mongodbConnect};