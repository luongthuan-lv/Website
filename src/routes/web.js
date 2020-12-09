const { SignIn, SignUp, dashboard, logout, User, Cate, Lang, Tour, Vehicles, Report } = require("./../controllers/adminController/index")
const { registerValidation, categoryValidation, tourValidation, vehicleValidation } = require("./../validation/index")
const initPassportLocal = require("./../controllers/passportController/local")
const passport = require("passport")
const express = require("express")
const router = express.Router()
const uploadMultipleFile = require("./../middleware/tour/gallery")
const uploadFiles = require("./../middleware/category/cate")

initPassportLocal()
let initRouter = (app) => {
    // DASHBOARD
    router.get('/', logout.checkLoggedIn ,dashboard.getDashboard)
    // LOGOUT
    router.get('/logout', logout.checkLoggedIn , logout.getLogout)
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
    router.get('/user', logout.checkLoggedIn , User.getUser)
    router.get('/user/remove/:id', logout.checkLoggedIn , User.removeUser)
    router.get('/user/edit/:id',  logout.checkLoggedIn ,User.getEdit)
    router.post('/user/edit-user/:id',  logout.checkLoggedIn ,User.postEditUser)
    // ------------------Category----------------
    router.get('/category',  logout.checkLoggedIn ,Cate.getCategory)
    router.get('/category/remove/:id', logout.checkLoggedIn , Cate.getRemoveCategory)
    router.get('/category/add', logout.checkLoggedIn , Cate.getAddCategory)
    router.post('/category/add/post', logout.checkLoggedIn ,uploadFiles, categoryValidation.categoryValidation, Cate.postAddCategory)
    router.get('/category/edit/:id', logout.checkLoggedIn , Cate.getEditCategory)
    router.post('/category/edit/:id', logout.checkLoggedIn ,uploadFiles, categoryValidation.categoryValidation, Cate.postEditCategory)
    // ------------------Language---------------
    router.get('/language',  logout.checkLoggedIn ,Lang.getLanguage)
    router.get('/language/remove/:id', logout.checkLoggedIn , Lang.getRemoveLanguage)
    router.get('/language/add', logout.checkLoggedIn , Lang.getAddLanguage)
    router.post('/language/add/post', logout.checkLoggedIn , Lang.postAddLanguage)
    //------------------Tour-------------------
    router.get('/tour',  logout.checkLoggedIn ,Tour.getTour)
    router.get('/tour/remove/:id', logout.checkLoggedIn , Tour.getRemoveTour)
    router.get('/tour/add',  logout.checkLoggedIn ,Tour.getAddTour)
    router.post('/tour/add/post', logout.checkLoggedIn ,uploadMultipleFile, tourValidation.tourValidation, Tour.postAddTour)
    router.get('/tour/edit/:id',  logout.checkLoggedIn ,Tour.geteditTour)
    router.post('/tour/edit/:id', logout.checkLoggedIn ,uploadMultipleFile, tourValidation.tourValidation, Tour.posteditTour)
    //---------------Vehicle----------------
    router.get('/vehicle', logout.checkLoggedIn , Vehicles.getVehicle)
    router.get('/vehicle/remove/:id',  logout.checkLoggedIn ,Vehicles.getRemoveVehicle)
    router.get('/vehicle/add', logout.checkLoggedIn , Vehicles.getAddVehicle)
    router.post('/vehicle/add/post', logout.checkLoggedIn , vehicleValidation.vehicleValidation ,Vehicles.postAddVehicle)
    router.get('/vehicle/edit/:id', logout.checkLoggedIn , Vehicles.getEdit)
    router.post('/vehicle/edit/:id', logout.checkLoggedIn ,vehicleValidation.vehicleValidation ,Vehicles.postEdit)

    router.get('/report', logout.checkLoggedIn , Report.getReport)
    router.get('/report/remove/:id',logout.checkLoggedIn, Report.getRemoveReport )
    router.get('/report/add', logout.checkLoggedIn , Report.getAddReport)
    router.post('/report/add/post', logout.checkLoggedIn , Report.postAddReport)


    return app.use('/', router)
}

module.exports = initRouter