const express=require("express");
const router=express.Router();

const {login,signup}=require("../controllers/authController");
const authLimiter=require("../middleware/authLimiter");

router.post("/login", authLimiter, login);
router.post("/signup", authLimiter, signup);


module.exports=router;