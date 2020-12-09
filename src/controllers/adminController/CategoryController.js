const CategoryModel = require("./../../models/categoryModel")
const VehicleModel = require("./../../models/vehicleModel")
const ReportModel = require("./../../models/reportModels")
const { transCategory } = require("./../../../lang/vi")
const { validationResult } = require("express-validator/check")
const LanguageModel = require("./../../models/languageModel")
let getCategory = (req, res) => {
    return new Promise(async (resolve, reject) => {
        if (req.query.page) {
            var page = parseInt(req.query.page)
        } else {
            page = 1
        }
        if (req.query.page === 0) {
            page = 1
        }

        const perpage = 10;
        const start = (page - 1) * perpage;
        //const end = page * perpage

        const totalRows = await CategoryModel.find();
        const totalPage = Math.ceil(totalRows.length / perpage);

        let pagePrev, pageNext;
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
        let lang = await LanguageModel.listAll()
        la = JSON.parse(JSON.stringify(lang))
        let Cate = await CategoryModel.find().skip(start).limit(perpage).populate("languages").populate("vehicles").exec()
        cate = JSON.parse(JSON.stringify(Cate))
        cate.forEach(item => {
            let id = item._id
            item.vehicles.forEach(async (o) => {
                let x = {
                    starCate: o.StarVehicle
                }
                await CategoryModel.updateItem(id, x)
            })
        })
        // search theo key=language
        if (req.query.key) {
            let x = await LanguageModel.findOne().where({ lang_name: req.query.key }).exec()
            x = JSON.parse(JSON.stringify(x))

            var item = await CategoryModel.find().populate("languages").populate("vehicles").where({ lang_id: x._id })
            var list = JSON.parse(JSON.stringify(item))
        }
        return res.render('admin/category/category', {
            success: req.flash("success"),
            errors: req.flash("errors"),
            cate: cate,
            data: { pageNext: pageNext, pagePrev: pagePrev, totalPage: totalPage },
            la: la,
            list: list
        })
    })
}
let getRemoveCategory = async (req, res) => {
    const id = req.params.id
    await CategoryModel.removeById({ _id: id })
    req.flash("success", transCategory.deleteSuccess)
    res.redirect('/category')
}
let getAddCategory = async (req, res) => {
    let Vehicle = await VehicleModel.listAll()
    Vehicle = JSON.parse(JSON.stringify(Vehicle))
    let lang = await LanguageModel.listAll()
    la = JSON.parse(JSON.stringify(lang))
    res.render("admin/category/add_category", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        la: la,
        Vehicle: Vehicle
    })
}

let postAddCategory = async (req, res) => {
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
        res.redirect('/category/add')
    }
    try {
        var pathss = '/images/category/' + req.file.filename;
        let item = {
            vehicle_id: (req.body.vehicle_id).match(/^[0-9a-fA-F]{24}$/),
            cate_name: req.body.cate_name,
            router: req.body.router,
            avatar: pathss,
            lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
        }

        await CategoryModel.createNew(item)
        // update moi dung thoi
        //fs.remove(`./src/public/images/category/${req.file.filename}`)
        req.flash("success", transCategory.createSuccess)
        res.redirect('/category')

    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)

    }
}

let getEditCategory = async (req, res) => {
    let Vehicle = await VehicleModel.listAll()
    Vehicle = JSON.parse(JSON.stringify(Vehicle))
    let id = req.params.id
    let lang = await LanguageModel.listAll()
    la = JSON.parse(JSON.stringify(lang))
    let item = await CategoryModel.findItemById({ _id: id })
    item = JSON.parse(JSON.stringify(item))
    return res.render("admin/category/edit_category", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        item: item,
        la: la,
        Vehicle: Vehicle
    })
}
let postEditCategory = async (req, res) => {
    if (req.uploadErrors) {
        console.log(req.uploadErrors)
    }
    let id = req.params.id
    let errorArr = []
    let validaionErrors = validationResult(req)
    if (!validaionErrors.isEmpty()) {
        let errors = Object.values(validaionErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        res.redirect(`/category/edit/${id}`)
    }

    try {
        
        let pathss = '/images/category/' + req.file.filename;
        let item = {
            vehicle_id: (req.body.vehicle_id).match(/^[0-9a-fA-F]{24}$/),
            cate_name: req.body.cate_name,
            router: req.body.router,
            avatar: pathss,
            lang_id: (req.body.lang_id).match(/^[0-9a-fA-F]{24}$/),
        }

        await CategoryModel.updateItem(id,item)
        // update moi dung thoi
        //fs.remove(`./src/public/images/category/${req.file.filename}`)
        req.flash("success", "Sửa danh mục thành công")
        return res.redirect('/category')

    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)

    }
  

}


module.exports = {
    getCategory: getCategory,
    getRemoveCategory: getRemoveCategory,
    getAddCategory: getAddCategory,
    postAddCategory: postAddCategory,
    getEditCategory: getEditCategory,
    postEditCategory: postEditCategory
}