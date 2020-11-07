const SignInController = require("./signInController")
const signUpController = require("./signUpController")
const dashboardController = require("./dashboardController")
const logoutController = require("./logoutController")
const UserController = require("./userController")

const SignIn = SignInController
const SignUp = signUpController
const dashboard = dashboardController
const logout = logoutController
const User = UserController

module.exports = {
    SignIn: SignIn,
    SignUp: SignUp,
    dashboard: dashboard,
    logout: logout,
    User: User
}