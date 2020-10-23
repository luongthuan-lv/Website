const mongoose = require("mongoose")

let Schema = mongoose.Schema

let UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: null},
    role: {type: String, default: 'user'},
    local: {
        email: {type: String, trim:true},
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    google: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
})
UserSchema.statics = {
    createNew(item){
        return this.create(item)
    }
}
module.exports = mongoose.model("user", UserSchema)