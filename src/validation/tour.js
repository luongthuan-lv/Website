const {check} = require("express-validator/check")

let tourValidation = [
    check("place", "Không được để trống place!").not().isEmpty(),
    //check("way", "Không được để trống way").not().isEmpty(),
    check("lon", "Không được để trống lon").not().isEmpty(),
    check("lat", "Không được để trống lat").not().isEmpty(),
    check("information", "Không được để trống thông tin").not().isEmpty(),
]

module.exports = {
    tourValidation: tourValidation
}