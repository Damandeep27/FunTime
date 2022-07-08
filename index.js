// Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const { errorHandler } = require('#middlewares/errorHandler.js');

// Database
const connection = require("./connection.js");

// Cors
const corsOption = {
    origin: ['http://localhost:3000', 'https://fun--time.herokuapp.com'],
    optionsSuccessStatus: 200
}

// Express Config
app.options(cors(corsOption));
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if(corsOption.origin.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }       

    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
})
app.use(express.static("public"));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

// Connection
connection.once('open', () => {
    console.log("[FunTime] Connected to MongoDB")
    app.listen(8080, () => {
        console.log(`[FunTime] listening at http://localhost:${8080}`)
    })
});