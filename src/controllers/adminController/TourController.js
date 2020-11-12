const TourModel = require("./../../models/tourModel")
const { transTour } = require("./../../../lang/vi")
const CategoryModel = require("./../../models/categoryModel")
const LanguageModel = require("./../../models/languageModel")
const multer = require("multer")
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
let getAddTour = async (req, res) => {
    let cate = await CategoryModel.listAll()
    ca = JSON.parse(JSON.stringify(cate))
    let lang = await LanguageModel.listAll()
    la = JSON.parse(JSON.stringify(lang))
    return res.render("admin/tour/add_tour", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        ca: ca,
        la: la
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
}).single("avatar")
let postAddTour = async (req, res) => {

    avatarUploadFile(req, res, async (error) => {
        if (req.body.router == "") {
            req.flash("errors", transTour.router_not_empty)
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
            let item = {
                router: req.body.router,
                place: req.body.place,
                location: {
                    lon: req.body.lon,
                    lat: req.body.lat
                },
                information: req.body.information,
                avatar: req.file.filename,
                lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
                cate_id: (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/)
            }
            await TourModel.createNew(item)
            // update moi dung thoi
            //fs.remove(`./src/public/images/category/${req.file.filename}`)
            req.flash("success", transTour.createSuccess)
            res.redirect('/tour')

            // } catch (error) {
            //     req.flash("errors", transTour.tour_avatar_not_empty)
            //     res.redirect("/tour/add")
            // }
        }



    })

}


module.exports = {
    getTour: getTour,
    getRemoveTour: getRemoveTour,
    getAddTour: getAddTour,
    postAddTour: postAddTour
}