const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

// database connection
mongoose.connect(process.env.MONGO_URI)
 
// for sessions
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const MongoStore = require('connect-mongodb-session')(sessions)

app.use(sessions({
    secret: "hehe",
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: true,
    store: new MongoStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions',
        ttl: 24 * 60 * 60 // Keeps session open for 1 day
    })
}))


app.use(cookieParser())

var session

// routers
const registerRouter = require('./routes/registerRouter')
const loginRouter = require('./routes/loginRouter')
const projectRouter = require('./routes/projectRouter')
const dashboardRouter = require('./routes/dashboardRouter')
const profileRouter = require('./routes/profileRouter')


app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

// dashboard
app.use('/dashboard', dashboardRouter)

// login
app.use('/login', loginRouter)

// register
app.use('/register', registerRouter)

// projects
app.use('/project', projectRouter)

// profile
app.use('/profile', profileRouter)

// logout
app.get('/logout',(req,res) => {
    
    req.session.destroy()
    console.log(session)
    res.redirect('/')
})

app.listen(process.env.PORT, (err) => {
    try {
        console.log("Server running on port " + process.env.PORT );
    } catch (err) {
        throw err;
    }
})