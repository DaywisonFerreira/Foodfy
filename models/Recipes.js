const db = require('../config/db')
const { date } = require("../utils/utils")

module.exports = {
    all(callback){
        db.query('SELECT receipts.*, chefs.name as chef_name FROM receipts LEFT JOIN chefs ON chefs.id = receipts.chef_id', function(err, results){
            if(err) throw `Database erro! ${err}`
            
            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO receipts (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)`
        
        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(new Date()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`SELECT receipts.*, chefs.id as chef_id, chefs.name AS chef_name FROM receipts LEFT JOIN chefs ON chefs.id = receipts.chef_id WHERE receipts.id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`SELECT receipts.*, chefs.id as chef_id, chefs.name AS chef_name FROM receipts LEFT JOIN chefs ON chefs.id = receipts.chef_id WHERE receipts.title ILIKE '%${filter}%'`, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE receipts SET
                chef_id=($1),
                image=($2),
                title=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
            WHERE id = $7            
        `  

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id,
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Erro! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM receipts WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },
    selectChef(callback){
        db.query(`SELECT * FROM chefs`, function(err, results) {
            if(err) throw `Database error! ${err}`
            
            callback(results.rows)
        })
    }


}