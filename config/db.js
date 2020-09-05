const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

// creating a function promise that connects to db
const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(console.log(error.message, "abyy oo error hai"));
    // exiting if db not connected
    process.exit(1);
  }
};

module.exports = connectDb;
