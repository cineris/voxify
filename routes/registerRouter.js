const express = require('express')
const User = require('../models/user.js')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages-register')
})

router.post('/',async (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        category: req.query.category
    })
    try {
        await user.save()
        session = req.session
        session.userid = user.username
        session.category = user.category
        console.log(req.session)
        res.redirect(`/dashboard?category=${session.category}`)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router