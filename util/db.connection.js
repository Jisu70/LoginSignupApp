const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://flashshorts010:SSjimS97gIp621wm@cluster0.c5sr3qh.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected successfully to the database!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDB;
// SSjimS97gIp621wm
