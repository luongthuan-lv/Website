const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategoryModel = new Schema({
    cate_name:String,
    router: String,
    avatar: { type: String, default: null },
    lang_id: {
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    vehicle_id: {
        type: mongoose.Types.ObjectId,
        ref: 'vehicles'
    },
    starCate: { type: Number, default: null },
    created_at: { type: Number, default: Date.now }
}, {
    toJSON: { virtuals: true },
    //toObject: { virtuals: true }
})
CategoryModel.virtual("languages", {
    ref: "language",
    localField: "lang_id",
    foreignField: "_id"
})
CategoryModel.virtual("vehicles", {
    ref: "vehicle",
    localField: "vehicle_id",
    foreignField: "_id"
})
CategoryModel.statics = {
    createNew(item){
        return this.create(item)
    },
    listAll() {
        return this.find().limit(7).populate("languages").populate("vehicles").exec()
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    },
    findItemById(id){
        return this.findById(id).populate("languages").populate("vehicles").exec()
    },
    updateItem(id,item){
        return this.findByIdAndUpdate(id,item).populate("languages").populate("vehicles").exec()
    }
}


module.exports = mongoose.model("category", CategoryModel)