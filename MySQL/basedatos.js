const {createPool}= require('mysql2/promise');

const pool = createPool ({
    host: 'nozomi.proxy.rlwy.net',
    user: 'root',
    password: 'rkhrkZWQEJocUcUsSzLwsBQfdJIhlicP',
    port: 51526,
    database: 'railway',
})

module.exports=pool;