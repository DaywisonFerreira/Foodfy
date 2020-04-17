const Recipes = require('../models/Recipes')
const Chef = require('../models/Chef')
const LoadRecipeService = require('../services/LoadRecipeService')
const LoadChefService = require('../services/LoadChefService')

exports.index = async function(req, res){
    try {
        const recipes = await LoadRecipeService.load('recipes')

        if(!recipes) return res.send("Recipes not found!")
        return res.render('index.njk', {item: recipes})
        
    } catch (error) {
        console.error(error)
    }
    
} 

exports.sobre = function(req, res){
    return res.render('sobre.njk')
}

exports.receitas = async function(req, res) {
    try {
        const recipes = await LoadRecipeService.load('recipes')
        if(!recipes) return res.send("Recipes not found!")
        
        return res.render('receitas.njk', {recipes})
        
    } catch (error) {
        console.error(error)
    }
    
}

exports.show = async function (req, res) {   
    try {
        const index = req.params.index
    
        const recipe = await LoadRecipeService.load('recipe', {
            where:{ id:index }
        })
    
        if(!recipe) return res.send("Recipe not found!")
    
        return res.render('receita', {recipe})
        
    } catch (error) {
        console.error(error)
    }
}

exports.buscaReceita = async function(req, res) {
    try {
        const {filter} = req.query

        if(!filter) filter = null
    
        let recipes = await Recipes.search(filter)
        const recipesPromise = recipes.map(LoadRecipeService.format)

        recipes = await Promise.all(recipesPromise)
        return res.render('filter', {recipes, filter})
        
    } catch (error) {
        console.error(error)
    }

}

exports.chefs = async function(req, res) {
    try {
        const chefs = await LoadChefService.load('chefs')
        if(!chefs) return res.send('Chefs not found!')
        return res.render('chefs', {chefs})

    } catch (error) {
        console.error(error)   
    }
}