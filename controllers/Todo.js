const User = require("../models/User")
const Todo = require("../models/Todo")
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.createTodo = async(req,res)=>{
    try {
        //data fetching
        const{title,description} = req.body
          if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"all fields are requires"
            })
          }
          const user = await User.findById(req.user.userId)
          
           
          const newTodo = await Todo.create({title,description,user:user._id})
          if(!newTodo){
            return res.send("database error")
        }

        

       



        return res.status(200).json({
            success:true,
            message:"todo created successfully",
            newTodo,
          
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"all fields are requires",
            error
        })
    }
}

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Error updating todo', error: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting todo', error: err.message });
    }
};