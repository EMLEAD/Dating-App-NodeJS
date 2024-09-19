const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    Firstname:{
        type:String,
        required:[true, 'Firstname is required']
    },
    Lastname:{
        type:String,
        required:[true, 'Lastname is required']
    },
    Email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    PhoneNo:{
        type:Number,
        required:[true, 'Phone Number is required'],
        minLength:[10, 'insert your country code first'],
        unique:true
    },
    Username:{
        type:String,
        required:[true, 'Username is required'],
        minLength:[6, 'Username wil be displayed to other users, therefore, must be your Known name'],
        unique:true
    },
    DateOfBirth:{
        type:String,
        required:[true, 'You Must Be 18+ years']
    },
    Gender:{
        type:String,
        required:[true, 'Male or Female Only']
    },
    Password:{
        type:String,
        required:[true,'password is required'],
        minLength:[8,'password must not be less than 8 characters']
    },
    Interests:[{
        type:String,
        enum:[
         
        ],
        // default:[],
        required:[true, ' You Must Select At Least Three Of The Following Interests.']
    }]
})

const User = mongoose.model('user',UserSchema)

module.exports = User 