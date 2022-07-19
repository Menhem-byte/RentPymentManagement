const mode="Test"
const productionConfig={
    client:"mssql",
    connection:{
        server:"DESKTOP-PQ6NFAE",
        database:"renting",
        user:"sa",
        password:"GehaD###0101",
        options:{
            trustedConnection:true,
            enableArithAbort:true
        },

    },
}
const TestConfig={
    client:"mssql",
    connection:{
        server:"DESKTOP-PQ6NFAE",
        database:"renting",
        user:"sa",
        password:"GehaD###0101",
        options:{
            trustedConnection:true,
            enableArithAbort:true
        },

    },
}
const knex=require("knex")(mode==="Test"?TestConfig:productionConfig)

module.exports=knex