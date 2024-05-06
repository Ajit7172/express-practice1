const express = require("express");
const router = express.Router();

router.post("/register", (req, res, next) => {
    try{
    res.json({ msg:"register user"});
    }catch (e) {
        next(e);
    }
    });

// login scenario
router.post("/", (req, res, next) => {
    try {
    const { email, password} = req.body;
    console.log({ email, password});
    //logic
   if (email !== "chaudharyajit7172@gmail.com" || password !== "123") {
    throw new Error("Invalid Credentials");
   } 
res.json({ msg:"login user"});
    } catch (error) {
       next(error);
    }
});

module.exports = router;