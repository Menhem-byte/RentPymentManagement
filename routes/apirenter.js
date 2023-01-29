const express = require("express")
const dbrenter= require('../db/Renter')
const router= express.Router();


/************************************************************
 *       get method
 ************************************************************/

router.route("/renter").get(async(req,res)=>{
    const name=  (req.query.name)
   

    if(name){
        const result=await dbrenter.renterName(name)
        if(result){
            res.status(200).send(result);
        }
        else{
              res.status(400).send('no result found')
        }
    }
    else {

        const result=await dbrenter.renter()
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
router.route("/insertRenter").post(async(req,res)=>{
   
    dbrenter.insertRenter(req.body.data).then(result =>{
        let resultObj={rowsaffected:result}
        res.status(200).send(resultObj)
    })
    .catch(error =>{
        let errorObj={message:error}
        res.status(400).send(errorObj)
    })
})

router.route("/updateRenter").post(async(req,res)=>{
 
    let Id=Object.keys(req.body.data)[0]
     dbrenter.updateRenter(req.body.data,Id).then(result =>{
         let resultObj={rowsaffected:result}
         res.status(200).send(resultObj)
     })
     .catch(error =>{
         let errorObj={message:error}
         res.status(400).send(errorObj)
     })
 })


module.exports=router