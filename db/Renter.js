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

async function updateRenter(data,Id){
   
    let reqdata={}
    let reqdata1=data[`${Id}`]
    reqdata['Id']=Number(Id)
    reqdata['Username']=reqdata1.Username.value
    reqdata['Firstname']=reqdata1.Firstname.value
    reqdata['Lastname']=reqdata1.Lastname.value
    reqdata['ArearCode']=reqdata1.ArearCode.value
    reqdata['Phone']=reqdata1.Phone.value
    reqdata['Email']=reqdata1.Email.value
    reqdata['Address']=reqdata1.Address.value
    reqdata['isActive']=reqdata1.isActive.value
    console.log(reqdata)
  
    try{
      let insertRecord=await insertupdatedelete.update('Renters',"Id",reqdata)
      console.log(insertRecord)
      return(insertRecord)
    }catch(err){
        console.log(err)
    }
    }

module.exports={
    renter:renter,
    renterName:renterName,
    insertRenter:insertRenter,
    updateRenter:updateRenter
}