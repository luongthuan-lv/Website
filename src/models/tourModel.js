const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TourSchema = new Schema({
    place: {type: String, default: null},
    location: {
        lon: {type: String, default: null},
        lat: {type: String, default: null}
    },
    information: {type: String, default: null},
    avatar: {
        type: Array, default: null
    },
    lang_id: {
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    cate_id: {
        type: mongoose.Types.ObjectId,
        ref: 'categorys'
    },
    way: String,
    vehicle_id: {
        type: mongoose.Types.ObjectId,
        ref: "vehicles"
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
}, {
    toJSON: {virtuals: true},
    //toObject: { virtuals: true }
})
TourSchema.virtual("categories", {
    ref: "category",
    localField: "cate_id",
    foreignField: "_id"
})
TourSchema.virtual("languages", {
    ref: "language",
    localField: "lang_id",
    foreignField: "_id"
})
TourSchema.virtual("vehicles", {
    ref: "vehicle",
    localField: "vehicle_id",
    foreignField: "_id"
})
TourSchema.statics = {
    createNew(item) {
        return this.create(item)
    },
    listAll() {
        return this.find().populate("categories").populate("languages").populate("vehicles").exec()
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec()
    },
    countItem() {
        return this.countDocuments({}).exec()
    },
    findVehicleByIdAndUpdate(id,item){
        return this.findByIdAndUpdate(id,item).exec()
    }
}
module.exports = mongoose.model("tour", TourSchema)
