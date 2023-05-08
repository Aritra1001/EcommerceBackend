const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        console.log("Trying to connect to database...");
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database`);
    } catch (error) {
        console.log("Error occurred while connecting to database ", error.message);
    }
}

module.exports = connectToDB;
