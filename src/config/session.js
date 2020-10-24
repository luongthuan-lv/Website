const session = require("express-session")
const connectMongo = require("connect-mongo")

let MongoStore = connectMongo(session)

let sessionStore = new MongoStore({
    url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect: true
})

let configSession = (app) => {
    app.use(session({
        key: "express.$id",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
}

module.exports = configSession