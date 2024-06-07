const express = require('express');
const router = express.Router();

const person = require('../models/Person');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('New Person Saved');
        res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// Get Request 
router.get('/', async(req,res)=>{
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