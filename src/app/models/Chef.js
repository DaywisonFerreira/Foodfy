const db = require('../../config/db')
const Base = require('./Base')

Base.init({table: 'chefs'})

module.exports = {
    ...Base,
    async profileImg(id) {
       const results = await db.query(`
        SELECT * FROM files WHERE id = $1
       `, [id])
       
       return results.rows[0]
    },
    async getTotalRecipes(id) {
        const results = await db.query(`SELECT count(id) as total_receipts FROM receipts WHERE chef_id = $1`, [id])
        return results.rows[0].total_receipts
    },
    async getRecipes(chef_id){
        const results = await db.query(`
            SELECT
                receipts.*,
                files.path
            FROM receipts
                INNER JOIN recipe_files
                ON recipe_files.recipe_id = receipts.id
                INNER JOIN files 
                ON files.id = recipe_files.file_id
            WHERE receipts.chef_id = $1
            `, [chef_id])
        return results.rows
    }
}