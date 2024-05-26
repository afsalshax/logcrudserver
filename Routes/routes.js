const express=require('express')

const router=new express.Router()
const user=require('../controllers/userControl')

router.post('/user/register',user.register)

router.post('/user/login',user.login)

router.put('/user/update/:_id',user.update)

module.exports=router    