const knex=require('./dbconfig')
const insertupdatedelete=require('./insertupdatedelete')

//get all building in the application
async function buildings(){
try{
    return new Promise(async(resolve,reject)=>{ 
   //return all building 
    let buildings=await knex.select(
        '*'
        ).from('building') 
    if(buildings){
        resolve(buildings)
    }
    else{
        resolve('no results found')
    }
       
    })
   
    }
    catch(err){
        console.log(err)
    }
}

//get a specific building 
async function building(building_Id){

    try{
        return new Promise (async(resolve,reject)=>{
          let building = await knex.select(
             '*'
          ).from('building as B')
          .where('B.Id','=',building_Id)
          if(building.length){
            resolve(building[0])
          }
          else{
            resolve('no records founds')
          }
           
        })
    }
    catch(err){
        console.log(err)
    }
}

//insert into building 

async function insertBuiding(data){

    try{
        return new Promise(async(resolve,reject)=>{
       let insertbuilding = await insertupdatedelete.insert('building',data)

        resolve(insertbuilding)
        })
    }
    catch(err){
        console.log(err)
    }
}


async function updateBuiding(data){

    try{
        return new Promise(async(resolve,reject)=>{
       let insertbuilding = await insertupdatedelete.update('building','Id',data)

        resolve(insertbuilding)
        })
    }
    catch(err){
        console.log(err)
    }
}


module.exports=
{
    building:building,
    buildings:buildings,
    insertBuiding:insertBuiding,
    updateBuiding:updateBuiding
}