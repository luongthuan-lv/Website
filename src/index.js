const ConnectDB = require("./config/connectDB")
const initRoute = require("./routes/web")
const configViewEngine = require("./config/viewEngine")
const express = require('express')
const app = express()



ConnectDB()
configViewEngine(app)
initRoute(app)

app.listen(process.env.APP_PORT, () => {
    console.log('Server listening at port 8017')
})
