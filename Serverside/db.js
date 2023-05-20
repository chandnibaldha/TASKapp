const mongoose = require("mongoose");
const ConnectionURL =
  "mongodb+srv://chandnibaldha:KlPrMMFqO4k84s2h@cluster0.opvar4j.mongodb.net/?retryWrites=true&w=majority";

const ConnectDatabase = async () => {
  try {
  await  mongoose.connect(ConnectionURL);
    console.log("Db connected");
  } catch (error) {
    console.log(error)
  }
};

module.exports = ConnectDatabase;
