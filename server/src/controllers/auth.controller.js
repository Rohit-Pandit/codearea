import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const register = async (req, res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        const exist = await User.findOne({email});
        if(exist) {
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hash
        });
        res.status(201).json({
            success: true,
            data : user,
            message : 'User created successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                    message: error.message,
                    code : error.code

            }
        });
    }
}

const login = async(req,res)=>{
    try{
         const {email,password} = req.body;
            if(!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please enter all fields'
                });
            }
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User does not exist'
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = generateToken(user._id);
            res.status(200).json({
                success: true,
                data: { 
                    token : token,
                    user : {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                },
                message: 'Login successful'
            });

    }
    catch(error){
        res.status(500).json({
            success: false,
            error: {
                    message: error.message,
                    code : error.code
            }
        });
    }
}

const getMe = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select('-password');
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user,
            message: 'User fetched successfully'
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: {
                    message: error.message,
                    code : error.code
            }        });
    }   
}

export {register, login, getMe};