const mongoose = require('mongoose');
let mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}cluster0.sm6ne.mongodb.net/ToDoList?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology:true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connection;