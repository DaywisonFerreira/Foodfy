const db = require('../../config/db')
const Base = require('./Base')

Base.init({table: 'users'})

module.exports = {
    ...Base ,
    async list(){
        const results = await db.query(`SELECT id, name, email FROM users`)

        return results.rows
    }  
}