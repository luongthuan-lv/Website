const { validationResult } = require("express-validator/check")
const {registerService} = require("./../../services/index")
let getSignUp = (req, res) => {
    return res.render('admin/login-register/signUp',{
        errors: req.flash("errors")
    })
}

let postRegister = (req, res) => {
    let errorArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/signup")
    }
    registerService.register(req.body.email, req.body.password, req.body.gender)
}

module.exports = {
    getSignUp: getSignUp,
    postRegister: postRegister
}