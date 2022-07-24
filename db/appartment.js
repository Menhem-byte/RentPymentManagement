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
             'A.BuildingId'
          ).from('Appartment AS A')
          .join('Building as B','B.Id','A.buildingId')
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
      
        if(getBuilding.length){
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
   try{
    return new Promise(async(resolve,reject)=>{
        let getBuilding= await building.building(data.BuildingId)
      
        if(getBuilding.length){
            let conflict= await appartment(data)
           
            if(conflict.includes('no record found for appartment')){
                let insertAppartment= await insertupdatedelete.insert('Appartment',data)
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

//update appartment 
async function  updateAppartment(data){

    try{
     return new Promise(async(resolve,reject)=>{
         let getBuilding= await building.building(data.BuildingId)
         console.log(getBuilding)
         if(getBuilding.length){
           let insertAppartment= await insertupdatedelete.update('Appartment','Id',data)
           resolve(insertAppartment)
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


module.exports=
{
    appartments:appartments,
    insertAppartment:insertAppartment,
    updateAppartment:updateAppartment,
    appartment:appartment
}