const VehicleModel = require("./../../models/vehicleModel")
const { transVehicle } = require("./../../../lang/vi")
let getVehicle = async (req, res) => {
    let Vehicle = await VehicleModel.listAll()
    vehicle = JSON.parse(JSON.stringify(Vehicle))
    return res.render('admin/vehicles/vehicle', {
        success: req.flash("success"),
        errors: req.flash("errors"),
        vehicle: vehicle
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

    if (req.body.vehicle_name == "") {
        req.flash("errors", transVehicle.vehicle_not_empty)
        res.redirect('/vehicle/add')
    } else {
        let item = {
            vehicle_name: req.body.vehicle_name
        }
        await VehicleModel.createNew(item)
        req.flash("success", transVehicle.createSuccess)
        res.redirect('/vehicle')

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

    if (req.body.vehicle_name == "") {
        req.flash("errors", transVehicle.vehicle_not_empty)
        res.redirect(`/vehicle/edit/${id}`)
    } else {
        let id = req.params.id
        let item = {
            vehicle_name: req.body.vehicle_name
        }
        await VehicleModel.findVehicleByIdAndUpdate(id, item)
        req.flash("success", transVehicle.editSuccess)
        res.redirect('/vehicle')
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