const express = require('express')
const router = express.Router();


 router.get('/',(req,res) => {
     res.send('Get logged in user')
 })

 //auth user and get token
 router.post('/',(req,res) => {
    res.send(' log in user')
})




 module.exports = router