const express =require("express");
const {stateManager} =require("../controllers");
const router = express.Router();

router.post("/ticket",(req,res,next)=>{
    let ticket = {
        "user_id" : req.body.user_id,
        "issue" : req.body.issue
    }
    res.locals.ticket = ticket;
    next();
},stateManager.updateCurrentManager);

router.use((req,res)=>{
    return res.status(404).send({message : "Page not Found"});
});

module.exports = router;