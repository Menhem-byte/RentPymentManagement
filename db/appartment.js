const knex =require('./dbconfig')
const insertupdatedelete = require('./insertupdatedelete')
const building=require('./building')

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

//insert appartment according to the building Id
async function  insertAppartments(data){

   try{
    return new Promise(async(resolve,reject)=>{
        let getBuilding= await building.building(data.BuildingId)
        console.log(getBuilding)
        if(getBuilding.length){
          let insertAppartment= await insertupdatedelete.insert('Appartment',data)
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
    insertAppartments:insertAppartments
}