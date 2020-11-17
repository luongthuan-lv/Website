const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategoryModel = new Schema({
    cate_name: String,
    router: String,
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
    countItem(){
        return this.countDocuments({}).exec()
    }
}

module.exports = mongoose.model("category", CategoryModel)