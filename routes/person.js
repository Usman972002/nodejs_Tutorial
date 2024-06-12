const express = require('express');
const router = express.Router();

const person = require('../models/Person');
const {jwtMiddleWare,generateToken} = require('../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('New Person Saved');
        const token = generateToken(response.email);
        res.status(200).json({"response":response,"token":token});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;

        const user = await person.findOne({username:username});
        if(!user){
            res.status(401).json({message:"Invalid UserName"});
        }else{
            const passwordMatch = await user.comparePassword(password);
            if(!passwordMatch){
                res.status(401).json({message:"Invalid Password"});
            }else{
                const token = generateToken(user.email);
                res.status(200).json(token);
            }
        }
    }catch(err){
        res.status(501).json({message :"Internal Server Error"});
    }
})

// Get Request 
router.get('/',jwtMiddleWare, async(req,res)=>{
    try{
        const response = await person.find();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})

// Parametarized API 
router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType === 'chef' || workType === 'waiter' || workType === 'manager'){
            const response = await person.find({work:workType});
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid Work Type"});
        }

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})

module.exports = router;