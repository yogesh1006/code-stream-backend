const User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
var {decrypt} = require('../utils/encrypt')

module.exports ={


    signup: async (req, res) => {
        try {
            let oldUser= await User.findOne({ email: req.body.email})
            if(oldUser){
                throw { message: 'User already exist.'}
            }
            let user = new User(req.body)
            let result = await user.save();
            res.json({
                status: 'success',
                message: 'User created successfully.',
                data: result
            })

        } catch (error) {
           res.status(400).json({
               message: (error && error.message) || 'Oops! Failed to create user.'
           })
        }
    },

    login: async (req,res)=>{
        try {
            let user= await User.findOne({email: req.body.email})
            if(!user){
                return res.status(400).json({
                    message: 'Please check your email or password.'
                })
            } else{
                let result= decrypt(req.body.password,user.password)
                if(result){
                    let jwtData = {
                        _id: user._id,
                        email: user.email,
                      }
                    token = jwt.sign(jwtData,config.secret , {
                        expiresIn: 60 * 60 * 24 
                      })
                    let userObj= {
                        name: user.name,
                        email: user.email,
                        username:user.username,
                        token
                    }
                    res.json({
                        status: 'success',
                        message: 'Logged in successfully.',
                        data: userObj
                    })
                } else{
                    return res.status(400).json({
                        message: 'Please check your email or password.'
                    })
                }
            }
            
        } catch (error) {
            res.status(400).json({
               message: (error && error.message) || 'Oops! Failed to login.' 
            })
        }
    },

    getUserData: async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.user.email })
            .populate({ path: 'likedVideos', populate: 'Video' })
            .populate({ path: 'savedVideos', populate: 'Video' })
            .populate({ path: 'playlist', populate: { path: 'videos', populate: 'Video' } })

        res.json({
            status: 'success',
            result: userData
        })
    } catch (error) {
         res.status(400).json({
               message: (error && error.message) || 'Oops! Unable to fetch data.' 
            })
    }
  }
}