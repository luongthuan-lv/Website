const UserModel = require("./../models/userModels")
const { Registererrors, Registersuccess } = require("./../../lang/vi")
const bcrypt = require("bcrypt")
const uuidv4 = require("uuid/v4")

let saltRound = 7
let register = (email, password, gender) => {
    return new Promise(async (resolve, reject) => {
        // kiểm tra xem email tạo đã tồn tại hay chưa
        let userByEmail = await UserModel.findByEmail(email)
        if (userByEmail) {
            // Kiểm tra tài khoản này đã xóa hay chưa
            if (userByEmail.deletedAt != null) {
                return reject(Registererrors.account_removed)
            }
            // Kiểm tra tài khoản đã active chưa
            if (!userByEmail.local.isActive) {
                return reject(Registererrors.account_not_active)
            }
            return reject(Registererrors.email_in_use)
        }

        // tạo 1 tài khoản mới
        let salt = bcrypt.genSaltSync(saltRound)
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        }
        let user = await UserModel.createNew(userItem)
        resolve(Registersuccess.userCreated(user.local.email))
    })

}
module.exports = {
    register: register
}