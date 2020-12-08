const TourModel = require("./../../models/tourModel")
const {transTour} = require("./../../../lang/vi")
const CategoryModel = require("./../../models/categoryModel")
const LanguageModel = require("./../../models/languageModel")
const VehicleModel = require("./../../models/vehicleModel")
const multer = require("multer")
let getTour = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 9
    let perRow = page * perpage - perpage

    let productAll = await TourModel.find()
    let totalPage = Math.ceil(productAll.length / perpage)

    let pagePrev, pageNext
    // pagePrev
    if (page - 1 <= 0) {
        pagePrev = 1
    } else {
        pageNext = page - 1
    }
    // pageNext
    if (page + 1 >= totalPage) {
        pageNext = totalPage
    } else {
        pageNext = page + 1
    }
    let tour = await TourModel.find().skip(perRow).limit(perpage).populate("languages").exec()
    tour = JSON.parse(JSON.stringify(tour))
    return res.render("admin/tour/tour", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        tour: tour,
        data: {pageNext: pageNext, pagePrev: pagePrev, totalPage: totalPage}
    })
}
let getRemoveTour = async (req, res) => {
    const id = req.params.id
    await TourModel.removeById({_id: id})
    req.flash("success", transTour.deleteSuccess)
    res.redirect('/tour')
}
let getAddTour = async (req, res) => {
    let Vehicle = await VehicleModel.listAll()
    Vehicle = JSON.parse(JSON.stringify(Vehicle))
    let cate = await CategoryModel.listAll()
    ca = JSON.parse(JSON.stringify(cate))
    let lang = await LanguageModel.listAll()
    la = JSON.parse(JSON.stringify(lang))
    return res.render("admin/tour/add_tour", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        ca: ca,
        la: la,
        Vehicle: Vehicle
    })
}
let storage = multer.diskStorage({
    destination: (req, res, callback) => {
        const dir = "./src/public/images/tour"
        callback(null, dir)
    },
    filename: (req, file, callback) => {
        let math = ["image/png", "image/jpeg", "image/jpg"]
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transTour.avatar_type, null)
        }
        let filename = `${Date.now()}-image-${file.originalname}`;
        callback(null, filename);
    }
})
let avatarUploadFile = multer({
    storage: storage
}).array("avatar", 17)
let postAddTour = async (req, res) => {

    avatarUploadFile(req, res, async (error) => {
        if (req.body.cate_id == "") {
            req.flash("errors", transTour.category_not_empty)
            res.redirect("/tour/add")
        } else if (req.body.place == "") {
            req.flash("errors", transTour.place_not_empty)
            res.redirect("/tour/add")
        } else if (req.body.lon == "") {
            req.flash("errors", transTour.lon_not_empty)
            res.redirect("/tour/add")
        } else if (req.body.lat == "") {
            req.flash("errors", transTour.lat_not_empty)
            res.redirect("/tour/add")
        } else if (req.body.information == "") {
            req.flash("errors", transTour.info_not_empty)
            res.redirect("/tour/add")
        } else if (error) {
            req.flash("errors", transTour.avatar_type)
            res.redirect("/tour/add")
        } else {
            // try {
            var list_picture = req.files.map(item => {
                return '/images/tour/' + item.filename;
            })
            let item = {
                cate_id: req.body.cate_name,
                waypoint:req.body.waypoint,
                place: req.body.place,
                location: {
                    lon: req.body.lon,
                    lat: req.body.lat
                },
                information: req.body.information,
                avatar: list_picture,
                lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
                // cate_id: (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/)
            }
            await TourModel.createNew(item)
            req.flash("success", transTour.createSuccess)
            res.redirect('/tour')

        }


    })

}


module.exports = {
    getTour: getTour,
    getRemoveTour: getRemoveTour,
    getAddTour: getAddTour,
    postAddTour: postAddTour
}