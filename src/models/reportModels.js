const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ReportModel = new Schema({
    user: String,
    username:String,
    report: String,
    vehicle_id: {
        type: mongoose.Types.ObjectId,
        ref: 'vehicles'
    },
    star: { type: Number, default: null },
    date: { type: Number, default: Date.now }
}, {
    toJSON: { virtuals: true },
    //toObject: { virtuals: true }
})
ReportModel.virtual("vehicles", {
    ref: "vehicle",
    localField: "vehicle_id",
    foreignField: "_id"
})
ReportModel.statics = {
    createNew(item){
        return this.create(item)
    },
    listAll() {
        return this.find().populate("vehicles").exec()
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    },
    findItemById(id){
        return this.findById(id).populate("vehicles").exec()
    },
    updateItem(id,item){
        return this.findByIdAndUpdate(id,item).populate("vehicles").exec()
    }
}


module.exports = mongoose.model("report", ReportModel)