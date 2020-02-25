const Recipes = require('../models/Recipes')
const Chef = require('../models/Chef')

exports.index = function(req, res){
    Recipes.all(function(receitas){
        if(!receitas) return res.send("Nenhuma receita foi encontrada")
        
        return res.render('index.njk', {item: receitas})
    })
} 

exports.sobre = function(req, res){
    return res.render('sobre.njk')
}

exports.receitas = function(req, res) {
    Recipes.all(function(receitas){
        if(!receitas) return res.send("Nenhuma receita foi encontrada")
        
        return res.render('receitas.njk', {item: receitas})
    })
    
}

exports.show = function (req, res) {    

    Recipes.find(req.params.index, function(item){

        if(!item) return res.send("Recipe not found!")

        return res.render('receita', {item})
    })
}

exports.buscaReceita = function(req, res) {
    const {filter} = req.query

    Recipes.findBy(filter, function(recipes){
        if(!recipes) return res.send("Receita não encontrada")

        return res.render('filter', {recipes, filter})
    })   

}

exports.chefs = function(req, res) {
    Chef.all(function(chefs) {
        return res.render('chefs', {chefs})
    })
}