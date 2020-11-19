const ConnectDB = require("./src/config/connectDB")
const initRoute = require("./src/routes/web")
const configViewEngine = require("./src/config/viewEngine")
const bodyParser = require("body-parser")
const configSession = require("./src/config/session")
const connectFlash = require("connect-flash")
const passport = require("passport")
// passport thi giua flash va initroutes
// session thi phai duoi connectDB
// flash giua bodyparser va initroutes

const express = require('express')
const app = express()


// connect DB
ConnectDB()
// config session
configSession(app)
// config views engine
configViewEngine(app)
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
//connect flash
app.use(connectFlash())
//passport
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));
// routes
initRoute(app)


// app.listen(process.env.APP_PORT, () => {
//     console.log('Server listening at port 8017')
// })

app.listen(process.env.PORT ||8017, () => {
    console.log('Server listening at port 8017')
});

// lây danh sách tour
