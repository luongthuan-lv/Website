const ConnectDB = require("./config/connectDB")
const UserModel = require("./models/userModels")
const express = require('express')
const app = express()



ConnectDB()

app.get('/', (req,res) => {
    res.send('Hello World')
})
app.get('/test', async (req,res) => {
    try{
        let item = {
            username: "name",
            gender: "male"
        }
        //console.log(UserModel.createNew(item))
        let user = await UserModel.createNew(item)
        res.send(user)
    }catch(err){
        console.log(err)
    }
})

app.listen(process.env.APP_PORT, () => {
    console.log('Server listening at port 8017')
})
