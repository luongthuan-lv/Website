const x = require("./../../models/galleryModel")
const y = require("./../../models/tourModel")
const { transGallery } = require("./../../../lang/vi")
const multer = require("multer")
const fs = require("fs-extra")
let getGallery = async (req, res) => {
    let GalleryModel = await x.listAll()
    Tour = JSON.parse(JSON.stringify(GalleryModel))
    return res.render("admin/gallery/gallery", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        Tour: Tour
    })
}

let getAddGallery = async (req, res) => {
    let cate = await y.listAll()
    tour = JSON.parse(JSON.stringify(cate))
    return res.render("admin/gallery/add_gallery", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        tour: tour
    })
}
let storage = multer.diskStorage({
    destination: (req, res, callback) => {
        const dir = "./src/public/images/gallery"
        callback(null, dir)
    },
    filename: (req, file, callback) => {
        let math = ["image/png", "image/jpeg", "image/jpg"]
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transGallery.avatar_type, null)
        }
        let filename = `${Date.now()}-image-${file.originalname}`;
        callback(null, filename);
    }
})
let avatarUploadFile = multer({
    storage: storage
}).array("avatar", 17)

let getRemoveGallery = async (req, res) => {
    const id = req.params.id
    await x.removeById({ _id: id })
    //fs.remove(`./src/public/images/gallery/${req.files.filename}`)
    req.flash("success", transGallery.deleteSuccess)
    res.redirect('/gallery')
}
let postAddTour = (req, res) => {

    avatarUploadFile(req, res, async (error) => {
        let item = {
            tour_id: (req.body.tour_id).match(/^[0-9a-fA-F]{24}$/),
            avatar:  req.files
        }
        await x.createNew(item)
        // update moi dung thoi
        //fs.remove(`./src/public/images/category/${req.file.filename}`)
        req.flash("success", transGallery.createSuccess)
        res.redirect('/gallery')

    })
}
module.exports = {
    getGallery: getGallery,
    getRemoveGallery: getRemoveGallery,
    getAddGallery: getAddGallery,
    postAddTour: postAddTour
}