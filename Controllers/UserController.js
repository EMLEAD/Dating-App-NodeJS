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
  try {
    if(!Email || !Password){
      res.status(400).json('Both fields are required')
    }
    const userExist = await User.findOne({Email});
    if(userExist){
      res.status(200).json(userExist)
    }else{
      res.status(400).json('User not found')
    }
  } catch (error) {
    res.status(400).json(error.message) 
  }
 }

 //find all users within a particular age bracket, interests and gender
 const searchAllUsers = async(req,res)=>{
const {DateOfBirth,Gender,Interests}= req.body
 const userExist = await User.find({DateOfBirth,Gender,Interests});
 try {
  if(userExist && DateOfBirth >18 && DateOfBirth<65 && (Gender = 'Male'|| Gender == 'Female') && Interests===Interests ){
      res.status(200). json(userExist)
  }else{
    res.status(400).json("No User Found")
  }
 } catch (error) {
  res.status(400).json(error.message)
 }
 }


 // searching for Only one user Controller
 const searchOneUsers = async(req,res)=>{
  const {Username}= req.body
   const userExist = await User.findOne({Username});
   try {
    if(userExist&&(Username===Username)){
        res.status(200). json(userExist)
    }else{
      res.status(400).json("No User Found")
    }
   } catch (error) {
    res.status(400).json(error.message)
   }
   }

   const deleteMyAccount = async(req,res) =>{
    const {id} =req.params
    try {
       const deletedAccount = await User.findByIdAndDelete(id)
      if(deletedAccount){
        res.status(200).json('Account Deleted Successfully')
      }

    } catch (error) {
        res.status(500).json(error.message)
    }
}
const UpdateUserIdentity = async(req,res)=>{
  
try {
  const {PhoneNo,Email}= req.params
  const updatedUser = await User.findOneAndUpdate(
    { Email: Email }, // Find by email (not just _id)
    { PhoneNo: PhoneNo},         // Update fullName field
    { new: true},
    { runValidators: true } // Return updated document, run validation
  );
if( updatedUser){
  res.status(200).json("User Identity Updated Successfully")
}
else{
  res.status(400).json(' User Identity Cannot Be Updated.')
}

} catch (error) {
  
}

}
module.exports = {CreateUserController,UserLogin,searchAllUsers,searchOneUsers,deleteMyAccount,UpdateUserIdentity}