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
        
        var predicted
        // Get data inputs from the request body
        let { x } = { x: 10 }
        // Load the saved linear regression model
        const options = {
                pythonOptions: ['-u'],
                scriptPath: 'public/assets/python',
                args: [x]
            }
        PythonShell.run('test.py', options, (err, result) => {
            if (err) throw err
            // Send the prediction results back to the frontend
            // res.send({ prediction: result })
            if (result) console.log(result)
        })
        res.render('project', { projects: project, currProject })
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