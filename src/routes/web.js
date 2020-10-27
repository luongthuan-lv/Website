const {SignIn, SignUp, dashboard} = require("./../controllers/adminController/index")
const {registerValidation} = require("./../validation/index")
const initPassportLocal = require("./../controllers/passportController/local")
const passport = require("passport")
const express = require("express")
const router = express.Router()

initPassportLocal()
let initRouter = (app) => {
    // DASHBOARD
    router.get('/', dashboard.getDashboard)
    // SignIN-SingUP
    // SignIN
    router.get('/signin', SignIn.getSignIn )
    router.post('/signin', passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin",
        successFlash: true,
        failureFlash: true
    }))
    // SignUp-Register
    router.get('/signup', SignUp.getSignUp)
    router.post('/register', registerValidation.register ,SignUp.postRegister)
    router.get('/verify/:token', SignUp.verifyAccount)
    return app.use('/', router)
}

module.exports = initRouter