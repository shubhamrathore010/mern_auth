import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.model.js';
import verifyToken from '../middleware/auth.js';  
 
const router = express.Router();

// for testing api only
router.get('/test',(req, res)=> {
    res.send("User router working");
    
} )

router.get('/', verifyToken, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

    router.post('/register', async(req, res) =>{
    const { name , email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists ) return res.status(400).json({ msg: "User already exist"});
    const hashed= await bcrypt.hash(password, 10)
    const newUser = new User({name, email , password: hashed });
    await newUser.save(); 

    res.status(201).json({ msg: "User registerd"})
    
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({msg : "Invalid email"});
    const match = await bcrypt.compare(password, user.password);
    if(!match ) return res.status(400).json({ msg: "Wrong password"})
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"})
    res.json( { token })
    
})

export default router;