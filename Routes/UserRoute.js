const express = require('express')
const {CreateUserController,UserLogin,searchAllUsers,searchOneUsers,deleteMyAccount,UpdateUserIdentity} = require('../Controllers/UserController')

const router = express.Router()

router.post('/create',CreateUserController)
router.get('/login',UserLogin)
router.get("/search",searchAllUsers)
router.get("/searchOne",searchOneUsers)
router.delete('/delete/:id',deleteMyAccount)
router.patch("/update",UpdateUserIdentity)



module.exports = router