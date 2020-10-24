const SignInController = require("./signInController")
const signUpController = require("./signUpController")
const dashboardController = require("./dashboardController")

const SignIn = SignInController
const SignUp = signUpController
const dashboard = dashboardController

module.exports = {
    SignIn: SignIn,
    SignUp: SignUp,
    dashboard: dashboard
}