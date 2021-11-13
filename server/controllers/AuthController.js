const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController{

    async login(req, res){
        const {email, password} = req.body;
        try {
            // Input Validation
            if(!(email && password)){
                return res.status(400).json({
                    message: 'Email and Passord are required.'
                })
            }

            // Check if email already exists
            const user = await User.findOne({email: email.toLowerCase()});
            if(!user){
                return res.status(400).json({
                    message: 'User not found with the given credential.'
                })
            }

            // Compare password
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if(!isPasswordCorrect){
                return res.status(400).json({
                    message: 'Incorrect password.'
                })
            }

            const token = jwt.sign({user_id: user._id, email}, process.env.JWT_SECRET, {expiresIn: "24h"});

            res.status(200).json({token, user_id: user._id});
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Something went wrong.'});           
        }
    }

    async register(req, res){
        const {firstname, lastname, email, password} = req.body;
        const photo = req.file.path;

        try {
            // Input Validation
            if(!(email && password)){
                return res.status(400).json({
                    message: 'Email and Passord are required.'
                })
            }

            // Check if email already exists
            const oldUser = await User.findOne({email});
            if(oldUser){
                return res.status(400).json({
                    message: 'Email already exists.'
                })
            }

            // Encrypt Password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create User
            const user = await User.create({
                firstname,
                lastname,
                email: email.toLowerCase(),
                password: hashedPassword,
                photo
            })

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({error: 'Something went wrong.'});
        }
    }
}

module.exports = AuthController;