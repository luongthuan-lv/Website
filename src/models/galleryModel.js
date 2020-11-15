const mongoose = require("mongoose")

const Schema = mongoose.Schema

const GallerySchema = new Schema({
    avatar: {
        type: Array, default: null
    },
    tour_id: {
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
}, {
        toJSON: { virtuals: true },
        //toObject: { virtuals: true }
    })
GallerySchema.virtual("tours", {
    ref: "tour",
    localField: "tour_id",
    foreignField: "_id"
})

GallerySchema.statics = {
    createNew(item) {
        return this.create(item)
    },
    listAll() {
        return this.find().populate("tours").exec()
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec()
    },
}
module.exports = mongoose.model("gallery", GallerySchema)
