const Chef = require('../models/Chef')

exports.index = function(req, res){
    Chef.all(function(chefs) {
        return res.render('admin/chefs/index', {chefs})
    })
}

exports.create = function(req, res) {
    return res.render('admin/chefs/create')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == '') {
            return res.send("Please, fill all fields!")
        }
    }

    Chef.create(req.body, function(chef){
        return res.redirect('/admin/chefs')
    })
}

exports.show = function(req, res){
    const { id } = req.params
    Chef.find(id, function(chef) {
        return res.render('admin/chefs/show', {chef})
    })
}

exports.edit = function(req, res){
    const { id } = req.params
    Chef.find(id, function(chef) {
        return res.render('admin/chefs/edit', {chef})
    })
}

exports.put = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == '') {
            return res.send("Please, fill all fields!")
        }
    }

    Chef.update(req.body, function(chef){
        return res.redirect(`/admin/chefs/${req.body.id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    Chef.verifyReceipt(id, function(count){
        if(count > 0) {
            return res.send("Chefes que possem receitas não podem ser deletados")  
        } else {
            Chef.delete(id, function() {
                return res.redirect('/admin/chefs')
            })
        }
    })
    
}