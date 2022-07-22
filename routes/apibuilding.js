const express=require('express')
const dbBuilding=require('../db/building')
const router = express.Router()


/************************************************************
 *       get method
 ************************************************************/
 router.route("/building").get(async(req,res)=>{
    const Id=  (req.query.Id)
   
    if(Id){
        const result=await dbBuilding.building(Id)
        if(result){
            res.status(200).send(result);
        }
        else{
              res.status(400).send('no result found')
        }
    }
    else {

        const result=await dbBuilding.buildings()
        if(result){
            res.status(200).send(result);
        }
        else{
              res.status(400).send('no result found')
        }
    }
   
})


/************************************************************
 *       Post method
 ************************************************************/
 router.route('/insertBuilding').post(async(req,res)=>{
   dbBuilding.insertBuiding(req.body)
   .then(result=>{
    let resultObj={rowsaffected:result}
    res.status(200).send(resultObj)
      
   }).catch(error =>{
    let errorObj={message:error}
    res.status(400).send(errorObj)

   })

 })

 module.exports=router

