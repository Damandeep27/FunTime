const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

const connected = require("./connection.js");

connected 
.then(()=>{
    console.log("connected!");
    app.set('port',process.env.PORT||8080);
    const server = app.listen(app.settings.port, ()=>console.log("Listening"));
});

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());//parse JSON requests made using axios

app.get('/',(req,res)=>{
    res.send("testing0");
});

const router=require("./routes/index.js");

app.use('/api/v1',router);








