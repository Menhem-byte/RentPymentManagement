const knex=require('./dbconfig')
const insertupdatedelete=require('../db/insertupdatedelete')
// get all the payment from the database
async function payment() {
    try{
   return new Promise(async(resolve,reject)=>{

    const result=await knex.select(
        '*'
    ).from('RentBilling')
    if(result.length){
        for(let i=0;i<result.length;i++){
            const renterName=await knex.select("Firstname","Lastname").from("Renters").where("id","=",result[i].RenterId)
            const AppName=await knex.select("AppNumber").from("Appartment").where("id","=",result[i].AppartmentId)
            console.log(renterName)
            console.log(AppName)
            result[i].DueDate=await convertDate(result[i].DueDate)
            result[i].PaidDate=await convertDate(result[i].PaidDate)
            result[i]["RenterName"]=renterName[0]?.Firstname+" "+renterName[0]?.Lastname
            result[i]["AppartmentNumber"]=AppName[0]?.AppNumber
            console.log(result)
        }
       
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


const convertDate=(date)=>{
     date=date.toISOString()
     date=date.split("T")[0]
return date
}

async function makePayment(data){

    let reqdata={}
reqdata["Id"]=data?.Id
    reqdata["PaidDate"]=data?.PaidDate
    reqdata["Paid"]=Number(data?.PaidAmount)
    if(reqdata?.Paid === data?.MonthlyBilling){
        console.log("inside if")
        reqdata['TotalPaid']=Number(data?.PaidAmount)
        reqdata["Rest"]=0
        reqdata["RentPaid"]=true;
    }
    else{
        reqdata['TotalPaid']=Number(data?.PaidAmount)
        reqdata["Rest"]=data?.MonthlyBilling - data?.PaidAmount
        reqdata["RentPaid"]=false;
    }
   
console.log(reqdata)

    let paymentUpdated=await insertupdatedelete.update("RentBilling","Id",reqdata)
if(paymentUpdated===200){
    return 200;
}
else{
    return 400
}

}



module.exports={
    payment:payment,
    makePayment:makePayment
}