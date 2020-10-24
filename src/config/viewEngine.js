const express = require("express")
const ejs = require("express-ejs-extend")

let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.engine("ejs", ejs)

    app.set("view engine", "ejs")
    app.set("views", "./src/views")
}
module.exports = configViewEngine