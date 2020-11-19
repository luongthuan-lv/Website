const mongoose = require("mongoose")
const bluebird = require("bluebird")

let connectDB = () => {
    mongoose.Promise = bluebird

    //mongodb://localhost:27017/node-web

    // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    //let URI = "mongodb://duythai:thai123456@cluster0-shard-00-00.25fre.mongodb.net:27017,cluster0-shard-00-01.25fre.mongodb.net:27017,cluster0-shard-00-02.25fre.mongodb.net:27017/TourIntro?replicaSet=atlas-avym03-shard-0&ssl=true&authSource=admin"
    let URI="mongodb+srv://thuan:thuan123456@cluster0.25fre.mongodb.net/TourIntro?retryWrites=true&w=majority";

    return mongoose.connect(URI, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
}
module.exports = connectDB