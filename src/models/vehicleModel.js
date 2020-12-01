const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleModel = new Schema({
    vehicle_name: String,
    created_at: {type: Number, default: Date.now},
    deleted_at: {type: Number, default: null}
});
VehicleModel.statics = {
    createNew(item){
        return this.create(item)
    },
    listAll() {
        return this.find()
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    },
    findVehicleByIdAndUpdate(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    }
};
module.exports = mongoose.model("vehicle", VehicleModel);