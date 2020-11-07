const UserModel = require("./../../models/userModels")
const {transUser} = require("./../../../lang/vi")
const { validationResult } = require("express-validator/check")
const bcrypt = require("bcrypt")
let getUser = async (req,res) => {
    let user = await UserModel.find()
    user = JSON.parse(JSON.stringify(user))
    return res.render("admin/user/user", {
        success: req.flash("success"),
        data: {user: user}
    })
}
let removeUser = async (req,res) => {
    const id = req.params.id
    await UserModel.removeById({_id: id})
    res.redirect('/user')
    req.flash("success", transUser.deleteSuccess)
}
let getEdit = async (req,res) => {
    let id = req.params.id
    let user = await UserModel.findUserById({_id: id})
    return res.render("admin/user/edit-user", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        data: {user: user}
    })
}
let postEditUser = async (req,res) => {
    let id = req.params.id
    if(req.body.email == ""){
            req.flash("errors", "Bạn không thể đổi Email này, chúng tôi chỉ chấp nhận 1 tài khoản 1 Email !<br>Chính vì vậy, bạn chỉ có thể thay đổi mật khẩu hiện tại của bạn !")
            return res.redirect(`/user/edit/${id}`)
    }
    // let id = req.params.id
    // let userByEmail = await UserModel.findByEmail(req.body.email)
    // if(userByEmail){
    //     req.flash("errors", transUser.email_in_use)
    // }
    // let saltRound = 7
    // let salt = bcrypt.genSaltSync(saltRound)
    // let newUser = {
    //     username: req.body.email.split("@")[0],
    //     local: {
    //         email: req.body.email,
    //         password: bcrypt.hashSync(req.body.password, salt)
    //     }
    // }
    // await UserModel.updateUser(id, newUser)
}
module.exports = {
    getUser: getUser,
    removeUser: removeUser,
    getEdit: getEdit,
    postEditUser: postEditUser
}