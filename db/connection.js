const mongoose = require('mongoose')
const connectionString=process.env.DATABASE 
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB ATlas connected");
}).catch((err)=>{
    console.log(`connection failed__${err}`);
})