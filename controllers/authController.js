import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import usersModel from '../models/model.js'

dotenv.config()

const key = process.env.JWT_SECRET;

export const register = async(req, res) => {
    try {
        const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new usersModel({
            username,
            password : hashedPassword, 
            role
        })
        await newUser.save();
        res.status(201).json({message: `User registered with username ${username}`})
    } catch (error) {
        console.error(error);
    }
}

export const login = async(req, res) => {
    try {

        const {username, password} = req.body
        const user = await usersModel.findOne({username});
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match){
            return res.status(400).json({message: "Wrong password"})
        }
        const token = jwt.sign({id: user._id, role: user.role}, key, {expiresIn: "1hr"})
        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}