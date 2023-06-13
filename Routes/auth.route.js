const express = require('express');
const router = express.Router();
const creatError = require('http-errors');
const User = require('../Models/User.model');

router.post('/register' , async (req, res , next) => { 
    console.log(req.body);
   try {
      const {email , password} = req.body;
      if (!email || !password)  throw creatError.BadRequest()
     const dejaexist = await User.findOne( { email: email});
      if (dejaexist) throw creatError.Conflict(`${email} already exists`)
      const user = new User({email, password})

      const saveduser = await user.save() ;
      res.send(saveduser);

   } catch (error) {
     next(error);
   }
})
router.post('/login' , async (req, res) => { 
    res.send('login route')
})
router.post('/refresh-token' , async (req, res) => { 
    res.send('refresh token route')
})
router.delete('/logout' , async (req, res) => { 
    res.send('logout route')
})









module.exports = router ;
