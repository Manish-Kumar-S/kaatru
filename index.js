const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const router = require("./router");

app.use(bodyParser.json())

app.use("/",router);

// app.use((req, res) => {
//     return res.status(404).send({ message: "Not Found" });
// });

app.listen(3000,()=>{
    console.log("App listening on : http//localhost:3000");
})