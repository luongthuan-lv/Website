const {SignIn, SignUp, dashboard} = require("./../controllers/adminController/index")
const {registerValidation} = require("./../validation/index")
const express = require("express")
const router = express.Router()

let initRouter = (app) => {
    // DASHBOARD
    router.get('/', dashboard.getDashboard)
    // SignIN-SingUP
    // SignIN
    router.get('/signin', SignIn.getSignIn )
    // SignUp-Register
    router.get('/signup', SignUp.getSignUp)
    router.post('/register', registerValidation.register ,SignUp.postRegister)
    return app.use('/', router)
}

module.exports = initRouter