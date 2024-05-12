/* these all are the features (12)
Register
Login
Forget password
Reset password
Change password
Verify token
Change status of user
Delete user
List users
Update user
Update my profile
get one user
*/

/* const router = require("express").Router();

// 1. List users
router.get("/", (req, res, next) => {
    try{
        res.json({msg: "All users list"});
    } catch (e) {
        next(e);
    }
});

// 2. Update users
router.put("/:id", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Update one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 3. Delete user
router.delete("/:id", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Delete one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 4. Get one user
router.get("/:id", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Read one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 5. Update my profile
router.patch("/:id", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Update my profile by ${id}`});
    } catch(e) {
        next(e)
    }
});

// 6. Change status of user
router.patch("/:id/status", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Change the status of one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 7. Change password
router.patch("/:id/password", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Change the password of one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 8. Reset password
router.patch("/:id/reset", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Reset the password of one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 9. Forget password
router.patch("/:id/forget", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Forget the password of one user by ${id}`});
    } catch(e) {
        next(e);
    }
});

// 10. Register
router.post("/", (req, res, next) => {
 try{
    res.json({msg: "Create the new id for login"});
 } catch(e) {
    next(e);
 }
});

// 11. Login
router.post("/:id", (req, res, next) => {
    try{
        const{id} = req.params;
        res.json({msg: `Sign in the id on movieMate`});
    } catch(e) {
        next(e);
    }
});

// 12. Verify token
router.post("/verify", (req, res, next) => {
    try{
        // Logic to verify authentication token
        res.json({"message": "Token verified successfully!"});
    }catch(e){
        next(e);
    }
});

module.exports = router;
*/

const event = require("events");
const router = require("express").Router();
const { generateToken } = require("../../utils/token");
const { secure } = require("../../utils/secure");
const { sendMail } = require("../../services/mailer");

const { validator } = require("./user.validator");

const eventEmitter = new event.EventEmitter();
eventEmitter.addListener("signup", (email) => 
    sendMail({
        email,
        subject: "MovieMate Signup",
        htmlMsg: "<b>Thank you for joining Moviemate</b>",
    })
);

router.get("/", secure(["admin"]), (req, res, next) => {
  try {
    res.json({ msg: "User List generated", data: [] });
  } catch (e) {
    next(e);
  }
});

router.post("/register", validator, (req, res, next ) => {
    try{
        const { email} = req.body;
        if(!email) throw new Error("Email is missing");
        // call the nodemailer
        eventEmitter.emit("signup", email);
        res.json({msg: "User Registered Successfully"}); 
    }catch(e){
        next(e);
    }
});

router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or password is missing");
    if (email === "chaudharyajit7172@gmail.com" && password === "123") {
      // generate the jwt token
      const payload = {
        email,
        roles: ["admin"],
      };
      const token = generateToken(payload);
      res.json({ msg: "User logged in sucessfully", data: token });
    } else {
      res.json({ msg: "Email or Password Invalid", data: "" });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
