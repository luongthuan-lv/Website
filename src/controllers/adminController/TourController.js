const TourModel = require("./../../models/tourModel")
const { transTour } = require("./../../../lang/vi")
const CategoryModel = require("./../../models/categoryModel")
const LanguageModel = require("./../../models/languageModel")
const multer = require("multer")
let getTour = async (req, res) => {
    if (req.query.page) {
        var page = parseInt(req.query.page)
    } else {
        page = 1
    }
    if (req.query.page === 0) {
        page = 1
    }
    const perpage = 90
    const start = (page - 1) * perpage
    //const end = page * perpage

    const totalRows = await CategoryModel.find()
    const totalPage = Math.ceil(totalRows.length / perpage)

    let pagePrev, pageNext
    if (page <= 1) {
        pagePrev = 1
    } else {
        pagePrev = page - 1
    }
    if (page >= totalPage) {
        pageNext = totalPage
    } else {
        pageNext = page + 1
    }
    let tour = await TourModel.find().skip(start).limit(perpage).populate("categories").populate("languages").exec()
    tour = JSON.parse(JSON.stringify(tour))
    return res.render("admin/tour/tour", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        tour: tour,
        data: { pageNext: pageNext, pagePrev: pagePrev, totalPage: totalPage }
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
}).array("avatar", 17)
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
            var list_picture= req.files.map(item=>{
                return '/images/tour/'+item.filename;
            })
            let item = {
               
                place: req.body.place,
                location: {
                    lon: req.body.lon,
                    lat: req.body.lat
                },
                information: req.body.information,

                // avatar: req.files,
                avatar: list_picture,
                lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
                cate_id: (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/)
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