const db = require('../config/db')
const {date} = require('../utils/utils') 

module.exports = {
    all: function(callback){
        db.query(`SELECT chefs.*, count(receipts.id) as total_receipts from chefs left join receipts on receipts.chef_id = chefs.id group by chefs.id`, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create: function(data, callback){
        const query = `INSERT INTO chefs (name, avatar_url, created_at)
                        VALUES ($1, $2, $3)`

        const values = [
            data.name,
            data.avatar_url,
            date(new Date()).iso
        ]


        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find: function(id, callback){
        db.query(`select 
        chefs.id as chef_id,
        chefs.name as chef_name,
        chefs.avatar_url as chef_avatar,
        receipts.id as receipts_id,
        receipts.chef_id as receipts_chef_id,
        receipts.image as receipts_image,
        receipts.title as receipts_title,
        receipts.ingredients as receipts_ingredients,
        receipts.preparation as receipts_preparation,
        receipts.information as receipts_information,
        (select count(*) from receipts where chef_id = $1) as total_recipes from chefs left join receipts on receipts.chef_id = chefs.id WHERE chefs.id = $1 group by chefs.id, receipts.id order by chefs.id`, [id], function( err, results ) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update: function(data, callback){
        const query = `UPDATE chefs SET
        name=($1),
        avatar_url=($2)
        WHERE id= $3`

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete: function(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    verifyReceipt: function(id, callback) {
        db.query(`SELECT count(id) as total_receipts FROM receipts WHERE chef_id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0].total_receipts)
        })
    }
}