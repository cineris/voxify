const express = require('express')
const Project = require('../models/project.js')
const router = express.Router()

// for predictive
const { PythonShell } = require('python-shell')


router.get('/', async (req, res) => {
    var project = await Project.find()
    console.log("projectRouter logs")
    console.log(req.session)
    if (req.query.new == 'true') res.render('addproject', { projects: project })
    else if (req.query.new == 'false') res.redirect('/dashboard')
    else {
        var currProject = await Project.findOne({title: req.query.title})
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
            res.render('project', { projects: project, currProject, pred })
        })
    }
})

router.post('/', async (req, res) => {
    if (req.query.new == 'true') {
        var project = new Project({
            title: req.body.title,
            type: req.body.type,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description
        })
        try {
            await project.save()
            res.redirect('/dashboard')
        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        let temp = await Project.findOne({title: req.query.title})
        temp = temp.shots
        console.log(temp)
        var shot = {
            shotCode: req.body.shotCode,
            description: req.body.description,
            taskTemplate: req.body.taskTemplate,
            status: req.body.status
        }
        await Project.findOneAndUpdate(
            {title: req.query.title},
            {shots: [ ...temp, shot]}
        )
        res.redirect('back')
        console.log(shot)
    }
})

module.exports = router