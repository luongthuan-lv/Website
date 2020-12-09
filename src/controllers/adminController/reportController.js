const ReportModel = require("./../../models/reportModels")
const VehicleModel = require("./../../models/vehicleModel")
const CategoryModel = require("./../../models/categoryModel")
const multer = require("multer")
let getReport =  (req, res) => {
    return new Promise(async (resolve,reject) => {
        let report = await ReportModel.listAll()
        report = JSON.parse(JSON.stringify(report))
        return res.render("admin/report/report", {
            success: req.flash('success'),
            errors: req.flash("errors"),
            report: report
        })
    })
}
let getRemoveReport = async (req,res) => {
    let id = req.params.id
    await ReportModel.removeById(id)
    req.flash("success", "Xoá thành công!")
    return res.redirect('/report')
}
let getAddReport = async (req,res) => {
    let Vehicle = await VehicleModel.listAll()
    Vehicle = JSON.parse(JSON.stringify(Vehicle))
    return res.render("admin/report/add", {
        success: req.flash('success'),
        errors: req.flash("errors"),
        Vehicle: Vehicle
    })
}
let storage = multer.diskStorage({
    destination: (req, res, callback) => {
        const dir = "./src/public/images/report"
        callback(null, dir)
    },
    filename: (req, file, callback) => {
        let math = ["image/png", "image/jpeg", "image/jpg"]
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transCategory.avatar_type, null)
        }
        let filename = `${Date.now()}-image-${file.originalname}`;
        callback(null, filename);
    }
})
let avatarUploadFile = multer({
    storage: storage
}).single("avatar")
let postAddReport = async (req,res) => {
    avatarUploadFile(req, res, async (error) => {
    
                var pathss = '/images/report/' + req.file.filename;
                let item = {
                    vehicle_id: (req.body.vehicle_id).match(/^[0-9a-fA-F]{24}$/),
                    user: req.body.user,
                    username: req.body.username,
                    star: req.body.star,
                    avatar: pathss,
                    report: req.body.report
                }

                await ReportModel.createNew(item)
                // update moi dung thoi
                //fs.remove(`./src/public/images/category/${req.file.filename}`)
            
                res.redirect('/report')

            
        })

}
module.exports = {
    getReport: getReport,
    getAddReport: getAddReport,
    postAddReport: postAddReport,
    getRemoveReport: getRemoveReport
};