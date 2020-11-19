const CategoryModel = require("./../../models/categoryModel")
const {transCategory} = require("./../../../lang/vi")
const multer = require("multer")
const LanguageModel = require("./../../models/languageModel")
const uuid = require("uuid/v4")
const fs = require("fs-extra")
let getCategory = async (req, res) => {
    if (req.query.page) {
        var page = parseInt(req.query.page)
    } else {
         page = 1
    }
    if(req.query.page == 0) {
        page = 1
    }
    const perpage = 10
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
    if(page >= totalPage){
        pageNext = totalPage
    }else{
        pageNext = page + 1
    }

    

    let Cate = await CategoryModel.find().skip(start).limit(perpage).populate("languages").exec()
    cate = JSON.parse(JSON.stringify(Cate))
    return res.render('admin/category/category', {
        success: req.flash("success"),
        errors: req.flash("errors"),
        cate: cate,
        data: {pageNext: pageNext,pagePrev:pagePrev,totalPage:totalPage}
    
    })
}
let getRemoveCategory = async (req, res) => {
    const id = req.params.id
    await CategoryModel.removeById({_id: id})
    req.flash("success", transCategory.deleteSuccess)
    res.redirect('/category')
}
let getAddCategory = async (req, res) => {
    let lang = await LanguageModel.listAll()
    la = JSON.parse(JSON.stringify(lang))
    res.render("admin/category/add_category", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        la: la
    })
}

let storage = multer.diskStorage({
    destination: (req, res, callback) => {
        const dir = "./src/public/images/category"
        callback(null, dir)
    },
    filename: (req, file, callback) => {
        let math = ["image/png", "image/jpeg", "image/jpg"]
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transCategory.avatar_type, null)
        }
        let filename = `${Date.now()}-image-${file.originalname}`;
        // var pathss = '/images/category' + filename;
        // console.log(pathss);
        callback(null, filename);
    }
})
let avatarUploadFile = multer({
    storage: storage
}).single("avatar")


let postAddCategory = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if (req.body.cate_name == "") {
            req.flash("errors", transCategory.cate_not_empty)
            res.redirect("/category/add")
        } else if (req.body.router == "") {
            req.flash("errors", transCategory.router_not_empty)
            res.redirect("/category/add")
        } else if (error) {
            req.flash("errors", transCategory.avatar_type)
            res.redirect("/category/add")
        } else {
            try {
                var pathss = '/images/category/' + req.file.filename;
                let item = {
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
                req.flash("errors", transCategory.cate_avatar_not_empty)
                res.redirect("/category/add")
            }
        }


    })
}


module.exports = {
    getCategory: getCategory,
    getRemoveCategory: getRemoveCategory,
    getAddCategory: getAddCategory,
    postAddCategory: postAddCategory
}