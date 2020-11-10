const {SignIn, SignUp, dashboard, logout, User, Cate, Lang, Tour} = require("./../controllers/adminController/index")
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
    //
    //
    // -------------------User-------------------
    router.get('/user', User.getUser)
    router.get('/user/remove/:id', User.removeUser)
    router.get('/user/edit/:id', User.getEdit)
    router.post('/user/edit-user/:id', User.postEditUser)
    // ------------------Category----------------
    router.get('/category', Cate.getCategory)
    router.get('/category/remove/:id', Cate.getRemoveCategory)
    router.get('/category/add', Cate.getAddCategory)
    router.post('/category/add/post', Cate.postAddCategory)
    // ------------------Language---------------
    router.get('/language', Lang.getLanguage)
    router.get('/language/remove/:id', Lang.getRemoveLanguage)
    router.get('/language/add', Lang.getAddLanguage)
    router.post('/language/add/post', Lang.postAddLanguage)
    //------------------Tour-------------------
    router.get('/tour', Tour.getTour)
    router.get('/tour/remove/:id', Tour.getRemoveTour)


    return app.use('/', router)
}

module.exports = initRouter