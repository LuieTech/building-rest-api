const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/building-rest-api";

mongoose.connect(mongodbUri)
  .then(() => console.info(`Successfully connected to database ${mongodbUri}`))
  .catch((error) => console.error(`An error occured trying to connect to database ${mongodbUri}`))