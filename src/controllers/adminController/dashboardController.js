const UserModel = require("./../../models/userModels")
const TourModel = require("./../../models/tourModel")
const LanguageModel = require("./../../models/languageModel")
const CategoryModel = require("./../../models/categoryModel")
let getDashboard = async (req,res) => {
    let user = await UserModel.countItem()
    let tour = await TourModel.countItem()
    let language = await LanguageModel.countItem()
    let category = await CategoryModel.countItem()
    return res.render('admin/dashboard/dashboard', {
        success: req.flash("success"),
        user: user,
        tour: tour,
        language:language,
        category: category
    })
}
module.exports = {
    getDashboard: getDashboard
}