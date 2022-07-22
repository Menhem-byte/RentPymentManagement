const express=require('express')
const DBappartment=require('../db/appartment')
const router=express.Router()


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

/************************************************************
 *       Post method
 ************************************************************/

router.route('/insertAppartment').post(async(req,res)=>{
  DBappartment.insertAppartments(req.body).then(result =>{
   
    res.status(200).send(result)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
})



module.exports=router