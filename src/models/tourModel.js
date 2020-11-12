const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TourSchema = new Schema({
    router: { type: String, default: null },
    place: { type: String, default: null },
    location: {
        lon: { type: String, default: null },
        lat: { type: String, default: null }
    },
    information: { type: String, default: null },
    avatar: [{ type: String, default: null }],
    lang_id: {
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    cate_id: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
}, {
        toJSON: { virtuals: true },
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
TourSchema.statics = {
    createNew(item) {
        return this.create(item)
    },
    listAll() {
        return this.find().populate("categories").populate("languages").exec()
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec()
    },
}
module.exports = mongoose.model("tour", TourSchema)
