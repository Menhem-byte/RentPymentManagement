const express = require('express')
const cors=require('cors')
const http=require('http')
const helmet=require('helmet')
const compression = require('compression')
require('dotenv').config()

//initialise app to express fucntion
const app=express()
console.log(process.env.PORT)
app.use(express.json({limit:"50mb",extended:true}))
app.use(express.urlencoded({limit:"50mb",extended:true}))
app.use(helmet());
app.use(compression())

const corsOptions={
    origin:[
        "https://localhost:3000",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3006",
        "http://192.168.0.21:3006"
    ],
    Credential:true,
    authenticate:true,
    authorization:true,
    optionsSuccessStatus:200
}



app.use(cors(corsOptions))
app.use((req,res,next)=>{
    console.log(`[${req.method}]-${req.originalUrl}`)
    next();
})

//inistialize te routes 
const renterRouter=require('../routes/apirenter')
const buildingRouter=require('../routes/apibuilding')
const appartmentsRouter=require('../routes/apiappartment')
const renterAppartmentRouter=require('../routes/apirenterAppartment')
//app use which routes
app.use("/renter",renterRouter)
app.use("/building",buildingRouter)
app.use("/appartments",appartmentsRouter)
app.use("/renterappartment",renterAppartmentRouter)
const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.set("etag",false);
process.on("uncaughtException",(err,origin)=>{
    process.exit(1)
})

const httpServer =http.createServer(app);
httpServer.listen(process.env.PORT || 3002,()=>{
    console.log("Listening on port" , process.env.PORT)
})

