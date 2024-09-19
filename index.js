const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const UserRoute = require('./Routes/UserRoute')

const app = express()

app.get('/', (req,res) =>{
  res.send('This Is My Server Homepage')
})

app.use(express.urlencoded({extended:true}))

const port = 7200
mongoose.connect(process.env.MONGODB_PASS)
.then(()=>{
    app.listen(port, () =>{
        console.log(`Server is running on Port ${port}`);

    })
}).catch((error)=>{
console.log(error.message);

})

app.use('/',UserRoute)
