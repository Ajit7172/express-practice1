const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.json({msg:"hello ajit"})
}); 

router.post("/register", (req, res, next) => {
    try{
    res.json({ msg:"register user"});
    }catch (e) {
        next(e);
    }
    });

// login scenario
router.post("/login", (req, res, next) => {
    try{
    const { email, password} = req.body;
    console.log({ email, password});
    //logic
   if (email !== "chaudharyajit7172@gmail.com" || password !== "123") {
    throw new Error("Invalid Credentials");
   } else {
res.json({ msg:"login user"});
    }
} catch (error) {
    next(error);
}
});

module.exports = router;