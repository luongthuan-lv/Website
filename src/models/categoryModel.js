const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategoryModel = new Schema({
    cate_name: String,
    router: String,
    avatar: { type: String, default: null },
    lang_id: {
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    created_at: { type: Number, default: Date.now },
    deleted_at: { type: Number, default: null }
}, {
    toJSON: { virtuals: true },
    //toObject: { virtuals: true }
})
CategoryModel.virtual("languages", {
    ref: "language",
    localField: "lang_id",
    foreignField: "_id"
})
CategoryModel.statics = {
    createNew(item){
        return this.create(item)
    },
    listAll() {
        return this.find().limit(7).populate("languages").exec()
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
    countItem(){
        return this.countDocuments({}).exec()
    }
}


module.exports = mongoose.model("category", CategoryModel)