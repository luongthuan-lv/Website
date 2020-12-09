const {check} = require("express-validator/check")

let vehicleValidation = [
    check("vehicle_name", "Không được để trống tuyến xe!").not().isEmpty(),
]
module.exports = {
    vehicleValidation: vehicleValidation
}