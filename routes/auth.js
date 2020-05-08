const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User')


//get logged in user
 router.get('/',auth,async(req,res) => {

     try {
         const user = await   User.findById(req.user.id).select('-password')
         res.json(user)
         
     } catch (error) {
         console.error(error.message);
         res.status(500).send('server error')
         
     }
 })

 //auth user and get token
 router.post('/',[
     check('email','please include valid email').isEmail(),
     check('password','password is required' ).exists()

 ],async (req,res) => {
    const errors =  validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }

     const {email,password} = req.body;
     try {
         let user = await User.findOne({email})
         console.log("userrrrrrr",user);
         
         if(!user){
             res.status(400).json({mssg:"invalid credentials"})
         }

         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
             return res.status(400).json({mssg:'invalid credentials'})
         }
         const payload = {
            user: {
                id:user.id
            }
        }
       
        

        jwt.sign(payload,config.get('jwtSecret'), {
            expiresIn:360000
        },(err,token) =>{
            if(err) throw err;
            res.json({token})
        })
         
     } catch (error) {
         console.error(error.message);
         res.status(500).send('server error')
         
         
     }
     
})




 module.exports = router