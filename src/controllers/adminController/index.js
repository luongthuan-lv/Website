const SignInController = require("./signInController")
const signUpController = require("./signUpController")
const dashboardController = require("./dashboardController")
const logoutController = require("./logoutController")
const UserController = require("./userController")
const CategoryController  = require('./CategoryController')
const LanguageController = require("./LanguageController")
const TourController = require("./TourController")


const SignIn = SignInController
const SignUp = signUpController
const dashboard = dashboardController
const logout = logoutController
const User = UserController
const Cate = CategoryController
const Lang = LanguageController
const Tour = TourController


module.exports = {
    SignIn: SignIn,
    SignUp: SignUp,
    dashboard: dashboard,
    logout: logout,
    User: User,
    Cate: Cate,
    Lang: Lang,
    Tour: Tour
}