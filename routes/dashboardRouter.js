const express = require('express')
const Project = require('../models/project.js')
const User = require('../models/user.js')
const router = express.Router()

router.get('/', async (req, res) => {
    session = req.session
    console.log('dashboardRouter logs')
    console.log(session)
    var project = await Project.find()
    if (session.category == 'Management') res.render('dashboard/management-dashboard', { projects: project })
    if (session.category == 'Production') res.render('dashboard/production-dashboard', { projects: project })
    if (session.category == 'Artist') res.render('dashboard/artist-dashboard', { projects: project })
    else res.write('Session Timed Out: Login Again')
})

module.exports = router