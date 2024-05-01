require('dotenv').config();
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT);

app.get("/", (req, res) => {
    res.json({msg: "Hello world by Ajit"});
});

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});