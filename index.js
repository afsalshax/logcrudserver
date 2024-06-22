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



//Angular 

//ts file

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { EcartService } from '../services/ecart.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit{

//   loginForm=this.fb.group({
//     email:['',[Validators.required,Validators.email]],
//     password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]


//   })

//   constructor (private fb:FormBuilder, private es:EcartService,private rout:Router) { }

//   ngOnInit(): void {
    
//   }

//   login(){
//     if(this.loginForm.valid){
//       var reqBody={
//         email:this.loginForm.value.email,
//         password:this.loginForm.value.password
//       }
//       this.es.loginApi(reqBody).subscribe({
//         next:(result:any)=>{

//           //localstorage
//           localStorage.setItem("currentUser",result.existingUser.userName)
//           localStorage.setItem("token",result.token)

//           alert(`login successfully`)
//           this.loginForm.reset()
//           this.rout.navigateByUrl("/")
//         },
//         error:(err:any)=>{
//           alert(err.error)
//         }
//       })
//     }
//     else{
//       alert('please fill all datas')
//     }
//   }
// }



// next

// import { Component, OnInit } from '@angular/core';
// import { EcartService } from '../services/ecart.service';

// @Component({
//   selector: 'app-all-products',
//   templateUrl: './all-products.component.html',
//   styleUrls: ['./all-products.component.css']
// })
// export class AllProductsComponent implements OnInit{

//   constructor(private es:EcartService){}

//   allproducts:any=[]

//   data:any='afsal'

//   ngOnInit(): void {
//     this.es.getAllProducts().subscribe({
//       next:(result:any)=>{
//         this.allproducts=result
//         console.log(this.allproducts);
        
//       },
//       error:(err:any)=>{
//         console.log(err);
        
//       }
//     })
//   }


// addToCart(){
//   if(localStorage.getItem("currentUser")){
//     alert('cart working')
//   }
//   else{
//     alert('please login first')
//   }
// }

// addToWishlist(){
//   if(localStorage.getItem("currentUser")){
//     alert("wishlist working")
//   }
//   else{
//     alert('please login first')
//   }
// }



// }

//register html

{/* <div>
    <div style="height: 500px; width: 80%;" class="row shadow-lg mt-5 mb-5">

        <div class="col-lg-6">
            <img src="" alt="">
        </div>

        <div class="col-lg-6">
            <h4 class="mt-5 text-center">Register your Account</h4>

            <div class=" p-5 mt-1 ms-5" style="width: 100%;">


             <form [formGroup]="registerForm" action="" class="">
                   <div class="">
                       <label for="exampleFormControlInput" class="form-label">username</label>
                       <input formControlName="userName" type="text" class="form-control w-75" id="exampleFormControlInput1"
                           placeholder="name@example.com">
                         <div *ngIf="this.registerForm.get('userName')?.errors && this.registerForm.get('userName')?.touched"><p class="text-danger mt-1">invalid username</p></div>
                
                       <label for="exampleFormControlInput1" class="form-label mt-3">Email address</label>
                       <input formControlName="email" type="email" class="form-control w-75" id="exampleFormControlInput1"
                           placeholder="name@example.com">

                           <div *ngIf="this.registerForm.get('email')?.errors && this.registerForm.get('email')?.touched"><p class="text-danger mt-1">invalid email</p></div>

                
                       <label for="inputPassword5" class="form-label mt-3">Password</label>
                       <input formControlName="password" type="password" id="inputPassword5" class="form-control w-75"
                           aria-describedby="passwordHelpBlock">

                           <div *ngIf="this.registerForm.get('password')?.errors && this.registerForm.get('password')?.touched"><p class="text-danger mt-1">invalid password</p></div>

                
                   </div>
                   <div style="text-align: center;" class="me-5">
                       <button type="submit" (click)="register()" class="btn btn-primary btn-sm mt-3">Register</button>
                       <p class="mt-2 me-5">Already have an account?<a class="" style="font-size: small;"
                               routerLink="/login">signin</a></p>
                
                   </div>
             </form>


            </div>

        </div>
    </div>

</div> */}


//register ts


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { EcartService } from '../services/ecart.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//     registerForm=this.fb.group({
//       userName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
//       email:['',[Validators.required,Validators.email]],
//       password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]


//     })

//     constructor(private fb:FormBuilder,private es:EcartService,private rout:Router) { }

//   ngOnInit(): void {
    
//   }

//   register(){
//     if(this.registerForm.valid){
//       var reqBody={
//         userName:this.registerForm.value.userName,
//         email:this.registerForm.value.email,
//         password:this.registerForm.value.password
//       }
//       this.es.registerApi(reqBody).subscribe({
//         next:(result:any)=>{
//           alert(`${result.userName} registered successfully`)
//           this.rout.navigateByUrl('login')
//         },
//         error:(err:any)=>{
//           alert(err.error)
//         }
//       })
//     }
//     else{
//       alert('please fill all datas')
//     }
//   }

// } 


// angular services

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EcartService {

//   BASE_URL="http://localhost:3000"

//   constructor(private http:HttpClient) { }

//   //get all products
//   getAllProducts(){
//    return this.http.get(`${this.BASE_URL}/products/all`)
//   }

// //register
// registerApi(bodyData:any){
//   return this.http.post(`${this.BASE_URL}/user/register`,bodyData)
// }

// //login
// loginApi(bodyData:any){
//   return this.http.post(`${this.BASE_URL}/user/login`,bodyData)
// }

// }


//Angular appmodule.ts


// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
// import { AllProductsComponent } from './all-products/all-products.component';
// import { ViewProductComponent } from './view-product/view-product.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { WhishlistComponent } from './whishlist/whishlist.component';
// import { CartComponent } from './cart/cart.component';
// import {HttpClientModule} from '@angular/common/http'
// import { ReactiveFormsModule } from '@angular/forms';

// @NgModule({
//   declarations: [
//     AppComponent,
//     FooterComponent,
//     HeaderComponent,
//     AllProductsComponent,
//     ViewProductComponent,
//     LoginComponent,
//     RegisterComponent,
//     WhishlistComponent,
//     CartComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     ReactiveFormsModule

//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }




//approuting

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AllProductsComponent } from './all-products/all-products.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { CartComponent } from './cart/cart.component';
// import { WhishlistComponent } from './whishlist/whishlist.component';
// import { ViewProductComponent } from './view-product/view-product.component';

// const routes: Routes = [
//   {path:'',component:AllProductsComponent},
//   {path:'login',component:LoginComponent},
//   {path:'register',component:RegisterComponent},
//   {path:'cart',component:CartComponent},
//   {path:'wishlist',component:WhishlistComponent},
//   {path:'singleviw/:id',component:ViewProductComponent},
//   {path:'**',redirectTo:""}


// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }