const express = require("express")
const dbpayment= require('../db/payment')
const router= express.Router();


/************************************************************
 *       get method
 ************************************************************/

router.route("/payment").get(async(req,res)=>{
    const name=  (req.query.name)
   console.log("here")

    if(name){
        const result=await dbpayment.paymentName(name)
        if(result){
            res.status(200).send(result);
        }
        else{
              res.status(400).send('no result found')
        }
    }
    else {

        const result=await dbpayment.payment()
        if(result){
            res.status(200).send(result);
        }
        else{
              res.status(400).send('no result found')
        }
    }
   
})

module.exports=router