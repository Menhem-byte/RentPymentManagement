const knex =require('./dbconfig')
const insertupdatedelete = require('./insertupdatedelete')
const building=require('./building')
const { reject } = require('lodash')

// get all apartments in a building
async function  appartments(building_Id){

   
    try{
        return new Promise(async(resolve,reject)=>{
          let appartments= await knex.select(
            'A.Id',
            'A.AppNumber',
            'A.Description',
            'A.Image',
            'A.BuildingId',
            'B.name',
            'A.RentDate',
            'A.LeaveDate',
            'R.Firstname',
            'R.Lastname',
            'R.Id as renterId'
          ).from('Appartment AS A')
          .join('Building as B','B.Id','A.buildingId')
          .join('Renters as R','R.Id','A.RenterId')
          .where('A.buildingId','=',building_Id)


         if(appartments){
             resolve(appartments)
           }
       else{
              resolve('no Appartments found for building'+building_Id)
           }

        })
    }
    catch(err){
        console.log(err)
    }
}

//get a specific appartment
async function appartment(data){

    try{
   
     return new Promise(async(resolve,reject)=>{
       
        let getBuilding= await building.building(data.BuildingId)
      console.log(getBuilding)
        if(getBuilding){
            let appartment =await knex.select(
              '*'
            ).from('Appartment as A')
            .where('A.AppNumber','=',data.AppNumber)
            .where('A.BuildingId','=',data.BuildingId)

          if(appartment.length){
              resolve(appartment)
          }
          else{
             resolve('no record found for appartment')
          }
            
        }
        else{
            resolve('no building found')
        }
        })       
    }catch(err){
        console.log(err)
    }
}



//insert appartment according to the building Id
async function  insertAppartment(data){


 data=data.data
 console.log(data)
 data["RenterId"]=6 
 data["RentDate"]="2022-11-26"
 data["LeaveDate"]="2022-11-26"


   try{
    return new Promise(async(resolve,reject)=>{
        let getBuilding= await building.building(data.BuildingId)
        console.log(getBuilding)
        if(getBuilding){
            let conflict= await appartment(data)
           
            if(conflict.includes('no record found for appartment')){
                let insertAppartment= await insertupdatedelete.insert('Appartment',data)
                // updateAppartmentRenterToDefault(data?.AppNum);
                resolve(insertAppartment)
            }
            else{
                let available=await appartments(data.BuildingId)
                
              resolve(available)
            }
         
        }
        else{
            resolve('building is not exist add an Appartment to an existing building')
        }
    })
   }
   catch(err){
    console.log(err)
   }
}
//just to update renter
async function  updateAppartmentRenterToDefault(AppNum){
    console.log(data)
    let reqData={}
  
    reqData["RenterId"]=6
    
   
    let getId=await knex.select("Id").from("Appartment").where("AppNumber","=",AppNum)
    console.log(getId[0])
    reqData["Id"]=getId[0]?.Id
    try{
     return new Promise(async(resolve,reject)=>{
        //  let getBuilding= await building.building(data.data?.buildingId)
        //  console.log(getBuilding)
        //  if(getBuilding.length){
            console.log(reqData)
           let insertAppartment= await insertupdatedelete.update('Appartment','Id',reqData)
           console.log("yelertgrhgrthrthrthrthrthrthrthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
           resolve()
        //  }
        //  else{
        //      resolve('building is not exist add an Appartment to an existing building')
        //  }
     })
    }
    catch(err){
     console.log(err)
    }
 }

//update appartment 
async function  updateAppartment(data){
    console.log(data)
    let reqData={}
    reqData["Note"]=data.data?.note
    reqData["RenterId"]=data.data?.RenterId
    reqData["RentDate"]=data.data?.startDate
    reqData["LeaveDate"]=data.data?.leaveDate
    let getId=await knex.select("Id").from("Appartment").where("AppNumber","=",data.data?.AppNum)
    console.log(getId[0])
    reqData["Id"]=getId[0]?.Id
    try{
     return new Promise(async(resolve,reject)=>{
        //  let getBuilding= await building.building(data.data?.buildingId)
        //  console.log(getBuilding)
        //  if(getBuilding.length){
            console.log(reqData)
           let insertAppartment= await insertupdatedelete.update('Appartment','Id',reqData)
           console.log(insertAppartment)
           resolve()
        //  }
        //  else{
        //      resolve('building is not exist add an Appartment to an existing building')
        //  }
     })
    }
    catch(err){
     console.log(err)
    }
 }

 async function  updateImageAppartment(data){
    console.log('I am here')
  let reqData={}
    let getId=await knex.select("Id").from("Appartment").where("AppNumber","=",data?.AppNum)
    console.log(getId[0])
    reqData["Id"]=getId[0]?.Id
    reqData["Image"]=data?.Image
    console.log(reqData)
    try{
     return new Promise(async(resolve,reject)=>{
        //  let getBuilding= await building.building(data.data?.buildingId)
        //  console.log(getBuilding)
        //  if(getBuilding.length){
            console.log(reqData)
           let insertAppartment= await insertupdatedelete.update('Appartment','Id',reqData)
           console.log(insertAppartment)
           resolve()
        //  }
        //  else{
        //      resolve('building is not exist add an Appartment to an existing building')
        //  }
     })
    }
    catch(err){
     console.log(err)
    }
 }


module.exports=
{
    appartments:appartments,
    insertAppartment:insertAppartment,
    updateAppartment:updateAppartment,
    appartment:appartment,
    updateImageAppartment:updateImageAppartment
}