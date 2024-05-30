const express = require("express")
const router = express.Router();
const {Login,Register,logout} = require("../controllers/Register")
const {createTodo,updateTodo,deleteTodo} = require('../controllers/Todo')
const auth = require("../middlewares/auth")

router.post("/register",Register);
router.post("/login",Login);
router.post("/logout",auth,logout);
router.post("/createTodo",auth,createTodo)
router.post("/updateTodo/:id",auth,updateTodo)
router.delete("/deleteTodo/:id",auth,deleteTodo)

module.exports = router;