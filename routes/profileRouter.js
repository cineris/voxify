const express = require('express')
const Project = require('../models/project.js')
const User = require('../models/user.js')
const router = express.Router()

router.get('/', async (req, res) => {
    var project = await Project.find()
    let currUser = await User.findOne({ username: req.session.userid })
    console.log("profileRouter logs")
    res.render('profile', { projects: project, currUser })
})

module.exports = router