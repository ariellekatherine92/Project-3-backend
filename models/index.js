require('dotenv').config();
const mongoose = require('mongoose');

// Comment out the below line to move DB into production env

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// });
    
//const db = mongoose.connect;

// Add this section for production DB env
let connectionString = "";

if (process.env.NODE_ENV === "production") {
  connectionString = process.env.DB_URL;
} else {
  connectionString = process.env.MONGO_URI;
}
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

//Set up event for db to print connection
db.once('open', () => {
    console.log(`Connect to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database error`, error);
});

//import all of models
const User = require('./User');
const Favorite = require('./Favorite')

//export all models from this file
module.exports = {
    User,
    Favorite
}
