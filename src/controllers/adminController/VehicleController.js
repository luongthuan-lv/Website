const VehicleModel = require("./../../models/vehicleModel")
const ReportModel = require("./../../models/reportModels")
const { transVehicle } = require("./../../../lang/vi")
const { validationResult } = require("express-validator/check")
let getVehicle = (req, res) => {
    return new Promise(async (resolve, reject) => {
        let Report = await ReportModel.aggregate([{
            $group: {
                _id: '$vehicle_id',
                "ratingAvg": { "$avg": "$star" }
            }
        }])
        Report = JSON.parse(JSON.stringify(Report))

        let Vehicle = await VehicleModel.listAll()
        Vehicle = JSON.parse(JSON.stringify(Vehicle))
        Vehicle.forEach(x => {
            Report.forEach(async (item) => {
                let id
                if (item._id == x._id) {
                    id = x._id
                }
                let c = {
                    StarVehicle: item.ratingAvg
                }
                await VehicleModel.findVehicleByIdAndUpdate(id, c)
            })
        })
        return res.render('admin/vehicles/vehicle', {
            success: req.flash("success"),
            errors: req.flash("errors"),
            Vehicle: Vehicle,
            Report: Report
        })
    })
}
let getRemoveVehicle = async (req, res) => {
    let id = req.params.id;
    await VehicleModel.removeById({ _id: id })
    req.flash("success", transVehicle.deleteSuccess)
    res.redirect('/vehicle')

}
let getAddVehicle = (req, res) => {
    return res.render("admin/vehicles/add_vehicle", {
        success: req.flash("success"),
        errors: req.flash("errors")
    })
}
let postAddVehicle = async (req, res) => {
    let errorArr = []
    let validaionErrors = validationResult(req)
    if (!validaionErrors.isEmpty()) {
        let errors = Object.values(validaionErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        res.redirect('/vehicle/add')
    }
    try {
        let item = {
            vehicle_name: req.body.vehicle_name
        }
        await VehicleModel.createNew(item)
        req.flash("success", transVehicle.createSuccess)
        res.redirect('/vehicle')
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
    }
}
let getEdit = async (req, res) => {
    let id = req.params.id
    let vehicel = await VehicleModel.findById({ _id: id }).exec()
    vehicel = JSON.parse(JSON.stringify(vehicel))
    return res.render('admin/vehicles/edit', {
        success: req.flash("success"),
        errors: req.flash("errors"),
        vehicel: vehicel
    })
}
let postEdit = async (req, res) => {
    let errorArr = []
    let id = req.params.id
    let validaionErrors = validationResult(req)
    if (!validaionErrors.isEmpty()) {
        let errors = Object.values(validaionErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        res.redirect(`/vehicle/edit/${id}`)
    }
    try {
        let item = {
            vehicle_name: req.body.vehicle_name
        }
        await VehicleModel.findVehicleByIdAndUpdate(id, item)
        req.flash("success", "Sửa thành công")
        res.redirect('/vehicle')
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
    }




}
module.exports = {
    getVehicle: getVehicle,
    getRemoveVehicle: getRemoveVehicle,
    getAddVehicle: getAddVehicle,
    postAddVehicle: postAddVehicle,
    getEdit: getEdit,
    postEdit: postEdit
}