const User = require('../Models/User')
const expressHandler = require('express-async-handler')


// const DateOfBirth = new Date().getFullYear()+"/"
// console.log(DateOfBirth);

const CreateUserController = expressHandler(async(req,res)=>{
    const {Firstname,Lastname,Email,Password,DateOfBirth,PhoneNo,Gender,ConfirmPassword,Interests,Username} = req.body
  
  //Validations
    try {
       if(!Firstname||!Lastname||!Email||!Password||!DateOfBirth||!PhoneNo || !Gender||!ConfirmPassword||!Interests||!Username){
        return res.status(400).json('Field Cannot Be Empty')
       }
       if(Password.length <=8){
        return res.status(400).json('Password Characters Must Be More Than 8')
       }
       if(Password!==ConfirmPassword){
        return res.status(400).json('Passwords Do Not Match')
       }
       if(DateOfBirth < 18){
        return res.status(400).json('This App is Not For You, You Are Below 18 Years')
       }
       if( DateOfBirth >65){
        return res.status(400).json('This App is Not For You, You Are Above 65 Years')
       }
       if (Interests.length < 3) {
        return res.status(400).json( 'You must select at least 3 interests.' );
      }
      
       const UserExist = await User.findOne({
        $or: [
          { Email: Email },
          { PhoneNo: PhoneNo}
        ]
      });
             if(UserExist){
          res.status(400).json('User already existed')}
       

       const CreateUser = await User.create({
        Firstname,
        Lastname,
        Email,
        Password,
        DateOfBirth,
        PhoneNo,
        Gender,
        Interests,
        Username
       });  
       if(CreateUser){
        const{Firstname,Lastname,Email,Password,DateOfBirth,PhoneNo,Gender,_id,Interests,Username} = CreateUser
        return res.status(200).json(
            {Firstname,Lastname,Email,Password,DateOfBirth,PhoneNo,Gender,_id,Interests,Username})
       }
    
    } catch (error) {
        return res.status(400).json(error.message)
    }
});

//User Login Controller
 const UserLogin = async(req, res) =>{
  const {Email, Password} = req.body;
  if(!Email || !Password){
    res.status(400).json('Both fields are required')
  }
  const userExist = await User.findOne({Email});
  if(userExist){
    res.status(200).json(userExist)
  }else{
    res.status(400).json('User not found')
  }
 }

 //find all users within a particular age bracket, interests and gender
 const searchAllUsers = async(req,res)=>{
const {DateOfBirth,Gender,Interests}= req.body
 const userExist = await User.find({DateOfBirth,Gender,Interests});
 if(userExist && DateOfBirth >18 && DateOfBirth<65 && Gender === 'Male'||Gender === 'Female'|| Interests===Interests ){
     res.status(200). json(userExist)
 }else{
   res.status(400).json("No User Found")
 }
 }

 const searchOneUsers = async(req,res)=>{
  const {Username}= req.body
   const userExist = await User.findOne({Username});
   if(userExist&&(Username===Username)){
       res.status(200). json(userExist)
   }else{
     res.status(400).json("No User Found")
   }
   }


module.exports = {CreateUserController,UserLogin,searchAllUsers,searchOneUsers}