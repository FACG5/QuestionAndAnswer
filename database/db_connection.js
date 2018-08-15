const pg = require('pg')

require('env2')('./config.env')
let URL = process.env.DB_URL;
if(process.env.NODE_ENV=='test'){
    URL = process.env.DB_URL1;
    }
    
if(!URL) throw new Error('problem in URL')

const options = { 

    ssl:true,
    connectionString:URL
}

module.exports=new pg.Pool(options);