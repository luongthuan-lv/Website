const ConnectDB = require("./config/connectDB")
const initRoute = require("./routes/web")
const configViewEngine = require("./config/viewEngine")
const bodyParser = require("body-parser")
const configSession = require("./config/session")
const connectFlash = require("connect-flash")
const passport = require("passport")
// passport thi giua flash va initroutes
// session thi phai duoi connectDB
// flash giua bodyparser va initroutes

const express = require('express')
const app = express()


// connect DB
ConnectDB()
// config session
configSession(app)
// config views engine
configViewEngine(app)
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
//connect flash
app.use(connectFlash())
//passport
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));
// routes
initRoute(app)


// app.listen(process.env.APP_PORT, () => {
//     console.log('Server listening at port 8017')
// })

app.listen(8017, () => {
    console.log('Server listening at port 8017')
});

// lây danh sách tour
// app.get('/get-tour-list',async (req,res)=>{
//    let vi="5fb29dcf5fea350ad4f00734";
//    let en="5fb29ddc5fea350ad4f00735";
//    let ko="5fb29de95fea350ad4f00736";
//    let ch="5fb29df35fea350ad4f00737";
//    let fr="5fb29dfd5fea350ad4f00738";
//    let ind="5fb29e0a5fea350ad4f00739";
//    let ja="5fb29e155fea350ad4f0073a";
//    let ge="5fb29e1d5fea350ad4f0073b";
//    let ru="5fb29e285fea350ad4f0073c";
//
//    let list_tour=await Category.find({lang_id:vi});
//    res.send(list_tour);
// });