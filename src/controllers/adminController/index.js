const SignInController = require("./signInController")
const signUpController = require("./signUpController")
const dashboardController = require("./dashboardController")
const logoutController = require("./logoutController")

const SignIn = SignInController
const SignUp = signUpController
const dashboard = dashboardController
const logout = logoutController

module.exports = {
    SignIn: SignIn,
    SignUp: SignUp,
    dashboard: dashboard,
    logout: logout
}