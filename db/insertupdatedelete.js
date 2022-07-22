const knex= require('./dbconfig')
async function insert(tableName,data){
    return new Promise(async(resolve,reject)=>{
     await knex(tableName).insert(data).catch(async function(err){
      
            if(err && err.message.includes('Violation of PRIMARY KEY constraint'))
            {
               // console.log('Insert fail with the record id: ' + data.name + '\n'),
               // console.log('Insert fail with the record id: ' + data.Quote_Id + '\n'),
                //console.log(err)
                //console.log(data)
                await update(tableName,'Id',data)
               
                resolve('the record is already exist. update the record   ' + data.Id + '\n')
            }
            else if(err && !err.message.includes('Violation of PRIMARY KEY constraint')) {
               // resolve('Insert failed for record  ' + data.Quote_Id + '\n')
               resolve(err)
            }
         
           
          
               
            
           // resolve("inserted")
        });
        resolve("one new record inserted "+data.Id)
    })
}

async function remove(tableName,columnName,data){
       return new Promise(async(resolve,reject)=>{
           await knex(tableName).where(columnName,data[columnName]).del().catch(function(err){
               if(err)
               {
                   console.log('Delete fail with the record id: ' + data.Id + '\n'),
                   console.log(err)
               }
           });
           resolve("one new record deleted with Quote ID " + data.Id)
       })
   }

async function update(tableName,columnName,data){
    return new Promise(async(resolve,reject)=>{
        await knex(tableName).where(columnName, data[columnName]).update(data).catch(function(err){
            if(err)
            {   
                console.log('Update fail with the record id: ' + data.Id + '\n'),
                console.log(err)  
            }
        })
        resolve("one record is updated"+data.Id)
    })
}

//export the SQL server Database methods
module.exports = {
    insert: insert,
    update: update,
    delete: remove
}