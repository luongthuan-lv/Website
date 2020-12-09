const registerValidation = require("./registerValidation")
const categoryValidation = require("./category")
const tourValidation = require("./tour")
const vehicleValidation = require("./vehicle")
module.exports = {
    registerValidation: registerValidation,
    categoryValidation: categoryValidation,
    tourValidation: tourValidation,
    vehicleValidation: vehicleValidation
}