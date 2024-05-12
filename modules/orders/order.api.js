const { secure } = require("../../utils/secure");

const router = require("express").Router();

router.get("/", secure(["admin"]), (req, res, next) => {
    try{
        res.json({msg: "List all orders", data:req.body});
    } catch(e) {
        next(e);
    }
});

router.post("/", (req, res, next) => {
    try{
        res.json({msg: "Created one order"});
    } catch(e) {
        next(e);
    }
});



router.get("/:id", (req, res, next) => {
    try{
        const { id } = req.params;
        res.json({msg: `Get one order by ${id}`});
    } catch(e) {
        next(e);
    }
});

router.delete("/:id", (req, res, next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Delete one order by ${id}`});
    } catch(e) {
        next(e);
    }
});

router.patch("/:id/status", (req, res, next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Change status of one order by ${id}`});
    } catch(e) {
        next(e);
    }
});

router.put("/:id", (req, res, next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Update  one order by ${id}`});
    } catch(e) {
        next(e);
    }
});

module.exports = router;

/* (6)
Create
List
read one order
delete the order
change the status of order
update the order
*/