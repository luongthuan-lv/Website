const {SignIn, SignUp, dashboard, logout} = require("./../controllers/adminController/index")
const {registerValidation} = require("./../validation/index")
const initPassportLocal = require("./../controllers/passportController/local")
const passport = require("passport")
const express = require("express")
const router = express.Router()

initPassportLocal()
let initRouter = (app) => {
    // DASHBOARD
    router.get('/', logout.checkLoggedIn , dashboard.getDashboard)
    // LOGOUT
    router.get('/logout', logout.checkLoggedIn ,logout.getLogout)
    // SignIN-SingUP
    // SignIN
    router.get('/signin', logout.checkLoggedOut ,SignIn.getSignIn )
    router.post('/signin', logout.checkLoggedOut ,passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin",
        successFlash: true,
        failureFlash: true
    }))
    // SignUp-Register
    router.get('/signup', logout.checkLoggedOut ,SignUp.getSignUp)
    router.post('/register', logout.checkLoggedOut, registerValidation.register ,SignUp.postRegister)
    router.get('/verify/:token', logout.checkLoggedOut ,SignUp.verifyAccount)
    return app.use('/', router)
}

module.exports = initRouter