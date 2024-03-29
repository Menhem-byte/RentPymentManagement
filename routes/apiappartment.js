const express=require('express')
const DBappartment=require('../db/appartment')
const router=express.Router()
const fileUpload = require('express-fileupload')


/************************************************************
 *       get method
 ************************************************************/
router.route('/appartments').get(async(req,res)=>{
 
    let building_Id=req.query.building_Id
    if(building_Id){
      
      let result = await DBappartment.appartments(building_Id)
      if(result){
        res.status(200).send(result)
      }
      else{
        res.status(500).send(result)
      }
      
    }
    else{
        
        res.status(400).send('query error')
    }
})


router.route('/appartment').get(async(req,res)=>{
 console.log(req.query.AppNumber)
  let data={AppNumber:req.query.AppNumber,BuildingId:req.query.BuildingId}
   console.log(data)
  if(data){
    
    let result = await DBappartment.appartment(data)
    if(result){
      res.status(200).send(result)
    }
    else{
      res.status(500).send(result)
    }
    
  }
  else{
      
      res.status(400).send('query error')
  }
})

/************************************************************
 *       Post method
 ************************************************************/

router.route('/insertAppartment').post(async(req,res)=>{
  console.log(req.body)
  console.log("here")
  DBappartment.insertAppartment(req.body).then(result =>{
   
    res.status(200).send(result)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
})

router.route('/upload').post(async(req,res)=>{
 
  
 DBappartment.updateImageAppartment(req.body).then(result=>{
  res.status(200).send(result)
 }).catch(err=>{
  res.status(400).send(err)
 });
  // if(!req.files || Object.keys(req.files).length ===0){
  //   res.status(400).send("Nofiles were uploaded")
  //   return;
  // }
  // console.log(req.files)
  // DBappartment.insertAppartment(req.body).then(result =>{
   
  //   res.status(200).send(result)
  // })
  // .catch(err=>{
  //   res.status(400).send(err)
  // })
})


/************************************************************
 *       Put method
 ************************************************************/

 router.route('/updateAppartment').put(async(req,res)=>{
  DBappartment.updateAppartment(req.body).then(result =>{
   
    res.status(200).send(result)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
})



module.exports=router