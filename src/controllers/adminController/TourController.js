const TourModel = require("./../../models/tourModel")
const {transTour} = require("./../../../lang/vi")
let getTour = async (req, res) => {
    let tour = await TourModel.listAll()
    tour = JSON.parse(JSON.stringify(tour))
    return res.render("admin/tour/tour", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        tour: tour
    })
}
let getRemoveTour = async (req, res) => {
    const id = req.params.id
    await TourModel.removeById({ _id: id })
    req.flash("success", transTour.deleteSuccess)
    res.redirect('/tour')
}

module.exports = {
    getTour: getTour,
    getRemoveTour: getRemoveTour
}