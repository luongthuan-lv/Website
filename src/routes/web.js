const {SignIn, SignUp, dashboard} = require("./../controllers/adminController/index")
const express = require("express")
const router = express.Router()

let initRouter = (app) => {
    // DASHBOARD
    router.get('/', dashboard.getDashboard)
    // SignIN-SingUP
    router.get('/signin', SignIn.getSignIn )
    router.get('/signup', SignUp.getSignUp)
    return app.use('/', router)
}

module.exports = initRouter