const mongoose = require("mongoose");

const getConnection = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Ninja");
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getConnection
}