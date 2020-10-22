const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(8017, () => {
    console.log('Server listening at port 8017')
})