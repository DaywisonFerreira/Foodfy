const db = require('../../config/db')
const Base = require('./Base')

Base.init({table: 'receipts'})

module.exports = {
    ...Base,
    async search(filter){
        let query = `
            SELECT receipts.*, 
                chefs.id as chef_id, 
                chefs.name AS chef 
                FROM receipts 
                INNER JOIN chefs 
                ON chefs.id = receipts.chef_id                 
                WHERE 1 = 1 `

        if(filter) {
            query += ` AND receipts.title ILIKE '%${filter}%'`
        }
        query += ' ORDER BY updated_at DESC'
        
        const results = await db.query(query)
        return results.rows
    },
    async selectChef(){
        const results = await db.query(`SELECT * FROM chefs`) 
        return results.rows
    },
    async files(recipeId) {
        const results = await db.query(`
        SELECT receipts.id, chefs.name as chef, receipts.title, receipts.ingredients, receipts.preparation, receipts.information, files.path, files.id as file_id FROM recipe_files inner join receipts on receipts.id = recipe_files.recipe_id inner join files on files.id = recipe_files.file_id inner join chefs ON chefs.id = receipts.chef_id  WHERE recipe_id = $1`, [recipeId])
        
        return results.rows
     },


}