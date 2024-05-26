const users=require('../Models/userModel')


exports.register=async(req,res)=>{
    const {email,password}=req.body
    try{
        const existuser=await users.findOne({email})
        if(existuser){
            res.status(400).json("user exist")
        }
        else{
            const newuser = new users({
                email,password
            })
           await newuser.save()
           res.status(200).json(newuser)
        }
    }
    catch{
        res.status(401).json(`Api failed`)
    }
}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await users.findOne({email,password})
        if(user){
            res.status(200).json("login success")
        }else{
            res.status(400).json("invalid email/pass")
        }
    }
    catch{
        res.status(401).json("api failed")
    }
}

exports.update=async(req,res)=>{
    const {email,password}=req.body
    const {_id}=req.params
    try{
      const updateemail= await users.findByIdAndUpdate({_id},{email,password},{new:true})

             await updateemail.save()
             res.status(200).json("updated")
    }
    catch{
        res.status(401).json("api failed")
    }
}