const express = require('express')
const Project = require('../models/project.js')
const User = require('../models/user.js')
const router = express.Router()

// for predictive
const { PythonShell } = require('python-shell')

router.get('/', async (req, res) => {
    session = req.session
    console.log('dashboardRouter logs')
    console.log(session)
    var project = await Project.find()

    let pred = {
        days: [],
        YTS: [],
        WIP: [],
        APPROVED: []
    }
    let x = [
        {
            'YTS': '10',
            'WIP': '0',
            'APPROVED': '0' 
        },
        {
            'YTS': '9',
            'WIP': '1',
            'APPROVED': '0' 
        },
        {
            'YTS': '8',
            'WIP': '2',
            'APPROVED': '0' 
        },
        {
            'YTS': '7',
            'WIP': '2',
            'APPROVED': '1'
        },
        {
            'YTS': '5',
            'WIP': '4',
            'APPROVED': '1'
        },
        {
            'YTS': '4',
            'WIP': '3',
            'APPROVED': '3'
        },
        {
            'YTS': '3',
            'WIP': '4',
            'APPROVED': '3'
        },
        {
            'YTS': '1',
            'WIP': '6',
            'APPROVED': '3'
        },
        {
            'YTS': '0',
            'WIP': '5',
            'APPROVED': '5'
        },
        {
            'YTS': '0',
            'WIP': '3',
            'APPROVED': '7'
        },
        {
            'YTS': '0',
            'WIP': '1',
            'APPROVED': '9'
        },
        {
            'YTS': '0',
            'WIP': '0',
            'APPROVED': '10'
        },
    ]

    var json_string = JSON.stringify(x)

    const options = {
        scriptPath: 'public/assets/python',
        pythonOptions: ['-u'],
        args: json_string
    }
    PythonShell.run('test.py', options).then( (messages) => {
        result = JSON.parse(messages)
        result.forEach(element => {
            pred.days.push(element.Day)
            pred.YTS.push(element.YTS)
            pred.WIP.push(element.WIP)
            pred.APPROVED.push(element.APPROVED)
            console.log(pred)
        })
        if (session.category == 'Management') return res.render('dashboard/management-dashboard', { projects: project, pred })
        if (session.category == 'Production') return res.render('dashboard/production-dashboard', { projects: project, pred })
        if (session.category == 'Artist') return res.render('dashboard/artist-dashboard', { projects: project })
        else return res.write('Session Timed Out: Login Again')
    })

    
})

module.exports = router