const {createPool}= require('mysql2/promise');

const pool = createPool ({
    host: 'kodama.proxy.rlwy.net',
    user: 'root',
    password: 'EoFBRxnkmYxIBSnwplkfmYceTkJSJUmd',
    port: 28319,
    database: 'railway',
})

module.exports=pool;