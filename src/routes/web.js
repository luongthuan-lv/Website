const {SignIn, SignUp, dashboard, logout, User, Cate, Lang, Tour,Vehicles} = require("./../controllers/adminController/index")
const {registerValidation} = require("./../validation/index")
const initPassportLocal = require("./../controllers/passportController/local")
const passport = require("passport")
const express = require("express")
const router = express.Router()

initPassportLocal()
let initRouter = (app) => {
    // DASHBOARD
    router.get('/', logout.checkLoggedIn, dashboard.getDashboard)
    // LOGOUT
    router.get('/logout', logout.checkLoggedIn, logout.getLogout)
    // SignIN-SingUP
    // SignIN
    router.get('/signin', logout.checkLoggedOut, SignIn.getSignIn)
    router.post('/signin', logout.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin",
        successFlash: true,
        failureFlash: true
    }))
    // SignUp-Register
    router.get('/signup', logout.checkLoggedOut, SignUp.getSignUp)
    router.post('/register', logout.checkLoggedOut, registerValidation.register, SignUp.postRegister)
    router.get('/verify/:token', logout.checkLoggedOut, SignUp.verifyAccount)
    //
    //
    // -------------------User-------------------
    router.get('/user', logout.checkLoggedIn, User.getUser)
    router.get('/user/remove/:id', logout.checkLoggedIn, User.removeUser)
    router.get('/user/edit/:id', logout.checkLoggedIn, User.getEdit)
    router.post('/user/edit-user/:id', logout.checkLoggedIn, User.postEditUser)
    // ------------------Category----------------
    router.get('/category', logout.checkLoggedIn, Cate.getCategory)
    router.get('/category/remove/:id', logout.checkLoggedIn, Cate.getRemoveCategory)
    router.get('/category/add', logout.checkLoggedIn, Cate.getAddCategory)
    router.post('/category/add/post', logout.checkLoggedIn, Cate.postAddCategory)
    router.get('/category/edit/:id', logout.checkLoggedIn, Cate.getEditCategory)
    router.post('/category/edit/:id', logout.checkLoggedIn, Cate.postEditCategory)
    // ------------------Language---------------
    router.get('/language', logout.checkLoggedIn, Lang.getLanguage)
    router.get('/language/remove/:id', logout.checkLoggedIn, Lang.getRemoveLanguage)
    router.get('/language/add', logout.checkLoggedIn, Lang.getAddLanguage)
    router.post('/language/add/post', logout.checkLoggedIn, Lang.postAddLanguage)
    //------------------Tour-------------------
    router.get('/tour', logout.checkLoggedIn, Tour.getTour)
    router.get('/tour/remove/:id', logout.checkLoggedIn, Tour.getRemoveTour)
    router.get('/tour/add', logout.checkLoggedIn, Tour.getAddTour)
    router.post('/tour/add/post', logout.checkLoggedIn, Tour.postAddTour)
    //---------------Vehicle----------------
    router.get('/vehicle', logout.checkLoggedIn, Vehicles.getVehicle)
    router.get('/vehicle/remove/:id', logout.checkLoggedIn, Vehicles.getRemoveVehicle)
    router.get('/vehicle/add', logout.checkLoggedIn, Vehicles.getAddVehicle)
    router.post('/vehicle/add/post', logout.checkLoggedIn, Vehicles.postAddVehicle)
    router.get('/vehicle/edit/:id', logout.checkLoggedIn, Vehicles.getEdit)
    router.post('/vehicle/edit/:id', logout.checkLoggedIn, Vehicles.postEdit)


    return app.use('/', router)
}

module.exports = initRouter