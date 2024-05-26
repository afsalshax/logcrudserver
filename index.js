require('dotenv').config()

const express=require('express')

const cors = require('cors')

const routes=require('./Routes/routes')

require('./db/connection')

const logcrudserver=express()
logcrudserver.use(cors())

logcrudserver.use(express.json())

logcrudserver.use(routes)

const PORT=4000||process.env.PORT 
logcrudserver.listen(PORT,()=>{
    console.log(`logcrudserver started at${PORT}`);
})

logcrudserver.get('/',(req,res)=>{
    res.send(`Project Server Started`)
})      


//connection mongoDb

// const mongoose = require('mongoose')
// const connectionString=process.env.DATABASE 
// mongoose.connect(connectionString).then(()=>{
//     console.log("MongoDB ATlas connected");
// }).catch((err)=>{
//     console.log(`connection failed__${err}`);
// })




//usermodel

// const mongoose=require('mongoose')

// const userSchema=new mongoose.Schema({

//  email:{
//     type:String,
//     required:true,
//     unique:true
//  },
//  password:{
//    type:String,
//    required:true
//  }

// })

// const users=mongoose.model("users",userSchema)
// module.exports=users   




//routes

// const express=require('express')

// //router object
// const router=new express.Router()
// const user=require('../Controllers/userControl')
// const upload = require('../middlewares/multerMiddleware')
// const { jwtMiddleware } = require('../middlewares/jwtmiddleware')

// //Sign up
// router.post('/user/register',user.register)

// //log in
// router.post('/user/login',user.login)

// //update profile
// router.put('/user/updateprofile/:_id',jwtMiddleware,upload.single("profile"),user.editProfile)

// //add new projects
// router.post('/user/addproject',jwtMiddleware,upload.single('projectImage'),user.addProject)

// //get user all projects 
// router.get('/user/get-user-projects/:id',jwtMiddleware,user.getUserProjects)

// //get all projects of users
// router.get('/user/get-all-projects',user.getAllProjects)


// //get 3 projects of users
// router.get('/user/get-home-projects',user.getHomeProjects)

// //edit project
// router.put('/user/edit-project/:_id',jwtMiddleware,upload.single('projectImage'),user.editProjects)

// //delete project
// router.delete('/user/delete-project/:_id',jwtMiddleware,user.deleteProject)


// module.exports=router




//multermiddleware

// const multer=require('multer')

// // storage- location and file name
// const storage=multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,'./uploads')
//     },
//     filename:(req,file,callback)=>{   //img123       image-datetime-img123
//         callback(null,`image-${Date.now()}-${file.originalname}`)
//     }

// })

// // file filter - jpg jpeg png 
// const fileFilter=(req,file,callback)=>{
//     if(file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype=='image/png' ){
//         callback(null,true)
//     }
//     else{
//         callback(null,false)
//     }
// }

// // multer middleware
// const upload=multer({storage,fileFilter})
// module.exports=upload





//jsonwebtoken


// const jwt=require('jsonwebtoken')

// exports.jwtMiddleware=(req,res,next)=>{
// console.log("inside middleware");
// //token access
// const token=req.headers['access_token'].split(" ")[1]

// //verify
// try{
//   const JWTresponse=jwt.verify(token,'saskey123')
// //   console.log(JWTresponse);
//   req.payload=JWTresponse._id
//   next()
// }
// catch{
//     res.status(401).json("authorization failed ! please login")
// }

// }



//userControlls


// const projects = require("../Models/projectModel");
// const users = require("../Models/userModels");
// const jwt = require('jsonwebtoken')





// exports.register = async (req,res) => {
//     const { userName, email, password } = req.body
//     // console.log(userName,email,password);
//     // res.status(200).json('register worked')


//     try {
//         const existingUser = await users.findOne({ email })
//         if (existingUser) {
//             res.status(400).json("user already exist !! please login..")
//         }
//         else {
//             const newUser = new users({
//                 userName, email, password, github: "", linkedIn: "", profile: ""
//             })
//             //store the new object in db collection 
//             await newUser.save()
//             res.status(200).json(newUser)

//         }
//     }
//     catch {
//         res.status(401).json(`Register Api Failed ${err}`)
//     }
// }


// exports.login = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const existingUser = await users.findOne({ email, password })
//         if (existingUser) {
//             //login success
//             const token = jwt.sign({ _id: existingUser._id }, "saskey123")
//             console.log(token);

//             res.status(200).json({
//                 user: existingUser,
//                 token

//             })
//         }
//         else {
//             res.status(404).json("incorrect email or password")
//         }

//     }

//     catch (err) {
//         res.status(401).json(`Login Api failed ${err}`)
//     }
// }


// exports.editProfile = async (req, res) => {
//     const { userName, Github, LinkedIn, profile } = req.body
//     const { _id } = req.params
//     const profile1 = req.file ? req.file.filename : profile

//     // console.log(userName);
//     // console.log(_id);
//     // console.log(profile);
//     // res.send("edit profile request recieved...")


//     try {
//         const selectedUser = await users.findOne({ _id })
//         if (selectedUser) {
//             selectedUser.userName = userName
//             selectedUser.github = Github
//             selectedUser.linkedIn = LinkedIn
//             selectedUser.profile = profile1

//             //save changes in mongoDB
//             await selectedUser.save()
//             res.status(200).json(selectedUser)
//         }
//         else {
//             res.status(404).json(`${userName} is not present`)
//         }
//     }
//     catch (err) {
//         res.status(404).json(`profile edit Api Failed ${err}`)
//     }
// }


// exports.addProject = async (req, res) => {
//     //access datas from body
//     const { title, languages, overView, github, website } = req.body

//     //image - from multer
//     const projectImage = req.file?.filename

//     //userId - access from jwt middleware
//     const userId = req.payload

//     try {
//         const existingProject = await projects.findOne({ github })
//         if (existingProject) {
//             res.status(400).json(`${existingProject.title} is already exist`)
//         }
//         else {
//             const newProject = new projects({
//                 title, languages, overView, github, website, projectImage, userId
//             })
//             //save mongodb
//             await newProject.save()
//             res.status(200).json(newProject)
//         }
//     }
//     catch (err) {
//         res.status(401).json(`project add api failed ${err}`)
//     }

// }


// exports.getUserProjects = async (req, res) => {
//     const { id } = req.params
//     try {
//         const projectsArray = await projects.find({ userId: id })
//         if (projectsArray) {
//             res.status(200).json(projectsArray)
//         }
//         else {
//             res.status(400).json("no projects uploaded yet")
//         }

//     }
//     catch (err) {
//         res.status(401).json(`projects get Api Failed ${err}`)

//     }
// }


// exports.getAllProjects = async (req,res) => {
//     //Query data
//     const searchQuery = req.query.search

//     const { id } = req.params
//     try {
//         //regex Query
//         const query = {
//             languages: { $regex: searchQuery, $options: "i" } //i=case-insensitive
//         }
//         const allprojectsArray = await projects.find(query)
//         if (allprojectsArray) {
//             res.status(200).json(allprojectsArray)
//         }
//         else {
//             res.status(400).json("no projects uploaded yet")
//         }

//     }
//     catch (err) {
//         res.status(401).json(`projects get Api Failed ${err}`)

//     }
// }


// exports.getHomeProjects = async (req, res) => {
//     try {
//         const homeprojectsArray = await projects.find().limit(3)
//         if (homeprojectsArray) {
//             res.status(200).json(homeprojectsArray)
//         }
//         else {
//             res.status(400).json("no projects uploaded yet")
//         }

//     }
//     catch (err) {
//         res.status(401).json(`projects get Api Failed ${err}`)

//     }
// }


// exports.editProjects=async(req,res)=>{
//     //access datas from body
//     const { title, languages, overView, github, website,projectImage } = req.body
//     const{_id}=req.params
//     const uploadImage=req.file?req.file.filename:projectImage

//     try{
//    const updatedProject = await projects.findByIdAndUpdate({_id},{title,languages,website,overView,github,
//                                        projectImage:uploadImage},{new:true})   //updated data will get as response

//          await updatedProject.save() 
//          res.status(200).json(updatedProject)                  
       
//     }
//     catch(err){
//        res.status(401).json(`project edit Api failed ${err}`)
//     }
// }


// exports.deleteProject=async(req,res)=>{
//     const {_id}=req.params
//     try{
//      const response= await  projects.deleteOne({_id})
//      if(response){
//         res.status(200).json("project deleted !")
//      }
//     }
//     catch(err){
//         res.status(401).json(`project delete Api failed ${err}`)
 
//     }
// }                                                                      



//frontend

//CommonApi

// import axios from "axios";

// export const commonApi=async(method,url,reqBody,reqHeader)=>{
//     const config={
//         method,
//         url,
//         data:reqBody,
//         headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
//     }
//     return await axios(config).then(result=>{
//         return result
//     }).catch(result=>{
//         return result
//     })
// }



//all Api

// import { BASE_URL } from "./baseUrl";
// import { commonApi } from "./commonApi";


// //register
// export const registerApi = async(body)=>{
//    return await commonApi('POST',`${BASE_URL}/user/register`,body,"")
// }

// //login
// export const loginApi = async(body)=>{
//     return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
//  }
 
//  //update profile 
//  export const updateprofile = async(body,headers,id)=>{
//    return await commonApi('PUT',`${BASE_URL}/user/updateprofile/${id}`,body,headers)
// }

// //getProfile
// export const getProfileApi = async(id,headers)=>{
//    return await commonApi('GET',`${BASE_URL}/user/getprofile/${id}`,{},headers)
// }







//auth


// import React, { useState } from 'react'
// import { Col, Row } from 'react-bootstrap'
// import './Auth.css'
// import { AlertCircle, BarChart } from 'react-feather'
// import Button from 'react-bootstrap/Button';
// import { Link,  useNavigate } from 'react-router-dom';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { loginApi, registerApi } from '../service/allApi';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function Auth({register}) {

//   const navigate = useNavigate()

//   //state to store inputs
//   const [user,setUser]=useState({
//     userName:"",email:"",password:""
//   })

//   //state to check validation
//   const [unameValid,setUnameValid]=useState(false)
//   const [emailValid,setemailValid]=useState(false)
//   const [passValid,setpassValid]=useState(false)


//   const setInputs=(e)=>{
//     const {name,value}=e.target



//     if(name=='userName'){
//       if(value.match(/^[a-zA-Z ]+$/)){
//         setUnameValid(false)
 
//       }
//       else{
//         setUnameValid(true)
//       }
//     }
//     // setUser({...user,[name]:value})
    

//     if(name=='email'){
//       if(value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)){
//         setemailValid(false)
 
//       }
//       else{
//         setemailValid(true)
//       }
//     }

//     if(name=='password'){
//       if(value.match(/^[0-9a-zA-z@]{3,8}$/)){
//         setpassValid(false)
 
//       }
//       else{
//         setpassValid(true)
//       }
//     }

//     setUser({...user,[name]:value})


//   }

//   console.log(user);

//   const handleRegister=async(e)=>{
//     e.preventDefault()
//     const {userName,email,password}=user
//     if(!userName || !email || !password){
//       toast.warn("please fill all the detas", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         });
//     }
//     else{
//       const result = await registerApi(user)
//       //console.log(result);
//       if(result.status==200){

//        toast.success(`${result.data.userName} your account Created successfully !`,{
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         });

//       //reset user state
//       setUser({userName:"",email:'',password:''})
//       navigate("/login")
//       }
//       else{
        
//         toast.error(result.response.data, {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           });
//       }

//     }
//   }

//   const handleLogin=async(e)=>{
//     e.preventDefault()
//     const {email,password}=user
//     if( !email || !password){
//       toast.warn("please fill all the detas", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         });
//     }
//     else{
//       const result = await loginApi(user)
//       // console.log(result);
//       if(result.status==200){
// //store users datas in local storage
// localStorage.setItem("token",result.data.token)
// localStorage.setItem("currentuser",JSON.stringify(result.data.user));
// localStorage.setItem("currentid",result.data.user._id);


//        toast.success(`login success`,{
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         }); 

//       //reset user state
//       setUser({email:'',password:''})
//          navigate("/")
//       }
//       else{
        
//         toast.error(result.response.data, {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           });
//       }

//     }
//   }

 

// const isRegisterForm= register?true:false

//   return (
//     <div>
//         <div id='a1' className='container shadow-lg' style={{width:'100%',height:'600px',marginTop:'30px'}}>

//        <h2 style={{textAlign:'end',fontFamily:'Racing Sans One'}}>
//         {
//             isRegisterForm?"Sign Up":"Sign In"
//         }
//        </h2>
// <Row>

//     <Col>
//     <h3 style={{textAlign:'center',fontFamily:'Acme',marginTop:'200px'}}><BarChart></BarChart> Project Master</h3>
//     </Col>

//     <Col className='text-center'>
//     <h5 style={{textAlign:'center',fontFamily:'Righteous'}}>{isRegisterForm?' Sign Up to your new account':'Sign In to you existed account'}</h5>

// <div>
//   {
    
//     isRegisterForm &&    
//     <>
//     <FloatingLabel controlId="floatingname" label="Enter Your Name">
//     <Form.Control value={user.userName} onChange={(e)=>setInputs(e)} name='userName'
//      className='mt-5' type="text" placeholder="" />

//       </FloatingLabel>
// {  unameValid&&    <p style={{fontFamily:'Merriweather'}} className='text-danger text-start'><AlertCircle size={15}></AlertCircle> include charecters only</p>
// }   
//    </>
//   }
  
//       <FloatingLabel  
//           controlId="floatingInput"
//           label="Email address"
//           className="mt-3"
//         >
//          <Form.Control value={user.email} onChange={(e)=>setInputs(e)} name='email'
//            type="email" placeholder="name@example.com" />
//         </FloatingLabel>
// {emailValid&&      <p style={{fontFamily:'Merriweather'}} className='text-danger text-start'><AlertCircle size={15}></AlertCircle> email is not valid</p>
// }

//         <FloatingLabel className='mt-3' controlId="floatingPassword" label="Password">
//           <Form.Control value={user.password} onChange={(e)=>setInputs(e)} name='password'
//            type="password" placeholder="Password" />
//         </FloatingLabel>
// { passValid&&       <p style={{fontFamily:'Merriweather'}} className='text-danger text-start'><AlertCircle size={15}></AlertCircle> invalid password</p>
// }
// </div>

// {
//   isRegisterForm ?
//    <Button onClick={(e)=>handleRegister(e)}  style={{marginTop:'100px'}} className='text-center container w-50' variant="dark" size="md">
//     Register
//  </Button>:
//     <Button onClick={(e)=>handleLogin(e)}  style={{marginTop:'100px'}} className='text-center container w-50' variant="dark" size="md">
//     Login
//  </Button>


// }

// <h6 className='mt-3'>{isRegisterForm?'Already have an account?':'New User?'}
// {
//   isRegisterForm?<Link to={'/login'}> <a>Login</a></Link>:<Link to={'/register'}><a>register</a></Link>
// }
// </h6>
// </Col>

// </Row>

//         </div>
//         <ToastContainer />
//     </div>
//   )
// }

// export default Auth

