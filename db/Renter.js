const knex=require('./dbconfig')
const insertupdatedelete=require('../db/insertupdatedelete')
// get all the renter from the database
async function renter() {
    try{
   return new Promise(async(resolve,reject)=>{

    const result=await knex.select(
        '*'
    ).from('Renters as R')
    if(result.length){
        resolve(result)
    }
    else{
        resolve("no result found")
    }
   
   })
    }
    catch(err){
       console.log(err)
    }
}


// get a specific renter according to he is name 
async function renterName(name) {
    try{
   return new Promise(async(resolve,reject)=>{

    const result=await knex.select(
        '*'
    ).from('Renters as R')
    .where('R.Firstname','=',name)
    if(result.length){
        resolve(result)
    }
    else{
        resolve("no result found")
    }
   
   })
    }
    catch(err){
       console.log(err)
    }
}

async function insertRenter(data){
  
try{
  let insertRecord=await insertupdatedelete.insert('Renters',data)
  console.log(insertRecord)
  return(insertRecord)
}catch(err){
    console.log(err)
}
}

module.exports={
    renter:renter,
    renterName:renterName,
    insertRenter:insertRenter
}