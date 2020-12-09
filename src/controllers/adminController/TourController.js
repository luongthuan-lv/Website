const TourModel = require("./../../models/tourModel")
const { transTour } = require("./../../../lang/vi")
const CategoryModel = require("./../../models/categoryModel")
const LanguageModel = require("./../../models/languageModel")
const VehicleModel = require("./../../models/vehicleModel")
const { validationResult } = require("express-validator/check")
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


    let tour = await TourModel.find().skip(perRow).limit(perpage).populate("vehicles").populate("languages").exec()
    tour = JSON.parse(JSON.stringify(tour))


    let Vehicle = await VehicleModel.find()
    Vehicle = JSON.parse(JSON.stringify(Vehicle))

    return res.render("admin/tour/tour", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        tour: tour,
        data: { pageNext: pageNext, pagePrev: pagePrev, totalPage: totalPage },
        Vehicle: Vehicle,

    })
}
let getRemoveTour = async (req, res) => {
    const id = req.params.id
    await TourModel.removeById({ _id: id })
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
let postAddTour = async (req, res) => {
    if (req.uploadErrors) {
        console.log(req.uploadErrors)
    }
    let errorArr = []
    let validaionErrors = validationResult(req)
    if (!validaionErrors.isEmpty()) {
        let errors = Object.values(validaionErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        res.redirect('/tour/add')
    }
    try {
        let list_picture = req.files.map(item => {
            return '/images/tour/' + item.filename;
        })
        let item = {
            place: req.body.place,
            location: {
                lon: req.body.lon,
                lat: req.body.lat
            },
            information: req.body.information,
            way: req.body.way,
            avatar: list_picture,
            lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
            vehicle_id: (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/)
        }
        await TourModel.createNew(item)
        req.flash("success", "Tạo tour mới thành công")
        return res.redirect('/tour')
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
    }
}
let geteditTour = async (req, res) => {
    let id = req.params.id
    let Tour = await TourModel.findById({_id:id})
        item = JSON.parse(JSON.stringify(Tour))
    let la = await LanguageModel.listAll()
    la = JSON.parse(JSON.stringify(la))
    let Vehicle = await VehicleModel.find()
    Vehicle = JSON.parse(JSON.stringify(Vehicle))
    return res.render("admin/tour/edit", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        item: item,
        la: la,
        Vehicle: Vehicle
    })
}
let posteditTour = async (req,res) => {
    let id = req.params.id
    if (req.uploadErrors) {
        console.log(req.uploadErrors)
    }
    let errorArr = []
    let validaionErrors = validationResult(req)
    if (!validaionErrors.isEmpty()) {
        let errors = Object.values(validaionErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        res.redirect(`/tour/edit/${id}`)
    }
    try {
        let list_picture = req.files.map(item => {
            return '/images/tour/' + item.filename;
        })
     
        let item = {
            place: req.body.place,
            location: {
                lon: req.body.lon,
                lat: req.body.lat
            },
            information: req.body.information,
            way: req.body.way,
            avatar: list_picture,
            lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
            vehicle_id: (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/)
        }
        await TourModel.findVehicleByIdAndUpdate(id,item)
        req.flash("success", "Edit tour thành công")
        return res.redirect('/tour')
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
    }
}
module.exports = {
    getTour: getTour,
    getRemoveTour: getRemoveTour,
    getAddTour: getAddTour,
    postAddTour: postAddTour,
    geteditTour: geteditTour,
    posteditTour: posteditTour
}