const knex = require('./dbconfig')
const insertupdatedelete=require('./insertupdatedelete')

async function getAllRenterAppartments(){
console.log('here')
    try {
       return new Promise(async(resolve,reject)=>{
        const getAllrentersAppartments=await knex.
        select('RA.RenterDate as startDate',
        'RA.LeaveDate as EndDate',
        'R.Firstname as RenterFirstName',
        'R.LastName AS RenterLastName',
        'R.Phone AS Phone',
        'A.AppNumber AS AppartmentNumber'
        
        )
        .from('RenterAppartment AS RA')
        .join('Renters AS R','R.Id','RA.RenterId')
        .join('Appartment AS A','A.Id','RA.AppartmentId')
console.log(getAllrentersAppartments.length)
if(getAllrentersAppartments.length){
console.log(getAllrentersAppartments)
    resolve(getAllrentersAppartments)
}

else{
    resolve('no renters for appartments')
}
        
       
       }) 
    } catch (error) {
        console.log(error)
    }
}

async function getRenterAppartment(renterId,AppartmentId){
    console.log(renterId)
    console.log(AppartmentId)
try {
    return new Promise(async(resolve,reject)=>{
const renterAppartment=await knex
.select(
    'RA.RenterDate as startDate',
        'RA.LeaveDate as EndDate',
        'R.Firstname as RenterFirstName',
        'R.LastName AS RenterLastName',
        'R.Phone AS Phone',
        'A.AppNumber AS AppartmentNumber'
)
.from('RenterAppartment AS RA')
.join('Renters AS R','R.Id','RA.RenterId')
.join('Appartment AS A','A.Id','RA.AppartmentId')
.where('RA.RenterId','=',renterId)
.where('RA.AppartmentId','=',AppartmentId)

if(renterAppartment.length){
    resolve(renterAppartment)
}
else{
    resolve('no records found')
}
    

        
    })
} catch (error) {
    console.log(error)
}
}



module.exports={
    getAllRenterAppartments:getAllRenterAppartments,
    getRenterAppartment:getRenterAppartment
}

