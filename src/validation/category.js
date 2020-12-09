const {check} = require("express-validator/check")

let categoryValidation = [
    check("cate_name", "Không được để trống tên danh mục!").not().isEmpty(),
    check("router", "Không được để trống router").not().isEmpty()
]

module.exports = {
    categoryValidation: categoryValidation
}