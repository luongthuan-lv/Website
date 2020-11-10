const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategoryModel = new Schema({
    cate_name: String,
    avatar: { type: String, default: null },
    created_at: { type: Number, default: Date.now },
    deleted_at: { type: Number, default: null }
})
CategoryModel.statics = {
    createNew(item){
        return this.create(item)
    },
    listAll() {
        return this.find()
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec()
    },
}

module.exports = mongoose.model("category", CategoryModel)