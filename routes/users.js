const express = require('express')
const UserModel = require('../models//usersModel')

const router = express.Router()

//getting user
router.get('/:userid', getUser, async (req, res) => {
    res.send(res.user)
})
//creating user
router.post('/', async (req, res) => {
    const user = new UserModel({
        userid: req.body.userid,
        watchList: req.body.watchList
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (error){
        //bad data from user input
        res.status(400).json({message: error.message})
    }

})
//delete user
router.delete('/:userid', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({message: 'User deleted'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//updating user
router.patch('/:userid', getUser, async (req, res) => {
    if(req.body.watchList != null){
        res.user.watchList = req.body.watchList 
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//function to get user
async function getUser(req, res, next){
    let user
    try{
        user = await UserModel.findOne({"userid": req.params.userid})
        if (user == null){
            return res.status(404).json({message: 'Cannot find user'})
        }
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
    res.user = user
    next()
}

module.exports = router