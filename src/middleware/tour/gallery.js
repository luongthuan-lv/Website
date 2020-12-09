const multer = require("multer")
const uuid = require("uuid/v4")

let storage = multer.diskStorage({
    destination: (req, res, callback) => {
        let dir = "./src/public/images/tour"
        callback(null, dir)
    },
    filename: (req, file, callback) => {
        let math = ['image/png', 'image/jpeg', 'image/jpg']
        if (math.indexOf(file.mimetype) === -1) {
            return callback("Định dạng ảnh không đúng", null)
        }
        let filename = `${Date.now()}-${uuid()}-${file.originalname}`
        callback(null, filename)
    }
})

let uploadFile = multer({
    storage: storage
}).array("avatar",17)

let uploadMultipleFile = (req,res,next) => {
    uploadFile(req,res,(err) => {
        req.uploadErrors = err
        next()
    })
}
module.exports = uploadMultipleFile