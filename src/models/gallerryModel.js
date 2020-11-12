const mongoose = require("mongoose")

const Schema = mongoose.Schema

const GalleryModel = new Schema({
    avatar: {
        _id: Schema.Types.ObjectId,
        image: { type: String, default: null }
    }
})
GalleryModel.statics = {
    createNew(item) {
        return this.create(item)
    },
    listAll() {
        return this.find()
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec()
    },
}

module.exports = mongoose.model("gallery", GalleryModel)