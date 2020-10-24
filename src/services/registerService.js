const UserModel = require("./../models/userModels")
const bcrypt = require("bcrypt")
const uuidv4 = require("uuid/v4")

let saltRound = 7
let register = async (email,password,gender) => {
    let salt = bcrypt.genSaltSync(saltRound)
    let item = {
        username: email.split("@")[0],
        gender: gender,
        local : {
            email: email,
            password: bcrypt.hashSync(password, salt),
            verifyToken: uuidv4()
        }
    }
    let user = await UserModel.createNew(item)
}
module.exports = {
    register: register
}