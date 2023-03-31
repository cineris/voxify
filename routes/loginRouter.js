const express = require('express')
const User = require('../models/user.js')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages-login')
})

router.post('/', async (req, res) => {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    })
    try {
        var auth = await User.findOne({username: user.username})
        if (auth.password==user.password) {
            session = req.session
            session.userid = auth.username
            session.category = auth.category
            console.log("loginRouter logs")
            console.log(req.session)
            res.redirect(`/dashboard?category=${session.category}`)
        }
        else res.send("login failed: try again")
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router