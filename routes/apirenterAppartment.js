const express=require('express')
const dbRenterAppartment= require('../db/renterAppartment')
const router=express.Router()



/************************************************************
 *       get method
 ************************************************************/
 router.route('/rentersAppartment').get(async(req,res)=>{
 
   const renter=req.query.RenterId
   const appartment=req.query.AppartmentId
   if(renter){
    let result =await dbRenterAppartment.getRenterAppartment(renter,appartment)

    if(result){
      res.status(200).send(result)
    }
    else{
      res.status(400).send(result)
    }
   } 
      else{
        let result =await dbRenterAppartment.getAllRenterAppartments()

        if(result){
          res.status(200).send(result)
        }
        else{
          res.status(400).send(result)
        }
      }
      

   
})
/************************************************************
 *       Post method
 ************************************************************/
 router.route("/insertRenterAppartment").post(async(req,res)=>{
 console.log(req.body)
  dbRenterAppartment.insertRenterAppartment(req.body).then(result =>{
      let resultObj={rowsaffected:result}
      res.status(200).send(resultObj)
  })
  .catch(error =>{
      let errorObj={message:error}
      res.status(400).send(errorObj)
  })
})
/************************************************************
 *       Put method
 ************************************************************/
router.route("/updateRenterAppartment").put(async(req,res)=>{
 
  dbRenterAppartment.updateRenterAppartment(req.body).then(result =>{
      let resultObj={rowsaffected:result}
      res.status(200).send(resultObj)
  })
  .catch(error =>{
      let errorObj={message:error}
      res.status(400).send(errorObj)
  })
})


module.exports=router