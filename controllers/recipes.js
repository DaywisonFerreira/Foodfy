const Recipes = require('../models/Recipes')

exports.index = function(req, res) {
    Recipes.all(function(itens){
        return res.render('admin/recipes/index', {itens})
    })
}

exports.show = function(req, res) {
    const {id} = req.params

    Recipes.find(id, function(item){

        if(!item) return res.send("Recipe not found!")

        return res.render('admin/recipes/show', {item})
    })
}

exports.create = function(req, res) {
    Recipes.selectChef(function(listChefs){
        return res.render('admin/recipes/create', {listChefs})
    })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    Recipes.create(req.body, function(recipe) {
        return res.redirect('/admin/recipes')
    })

    
}

exports.edit = function(req, res) {
    const {id} = req.params
    
    Recipes.find(id, function(recipe){
        if(!recipe) return res.send("Recipe not found!")

        Recipes.selectChef(function(listChefs){
            return res.render('admin/recipes/edit', {recipe, listChefs})

        })
    })

}

exports.put = function(req, res) {

    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    Recipes.update(req.body, function(){
        return res.redirect(`/admin/recipes/${req.body.id}`)
    })
    
}

exports.delete = function(req, res) {
    const {id} = req.body

   Recipes.delete(id, function(){
       return res.redirect('/admin/recipes')
   })
}