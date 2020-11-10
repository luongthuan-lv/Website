const mongoose = require("mongoose")

const Schema = mongoose.Schema

const LanguageModel = new Schema({
    lang_name: String,
    created_at: {type: Number, default: Date.now},
    deleted_at: {type: Number, default: null}
})
LanguageModel.statics = {
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
module.exports = mongoose.model("language", LanguageModel)