const fs = require('fs')
const receitas = require('../data.json')

exports.index = function(req, res) {
    return res.render('admin/index', {itens: receitas.recipes})
}

exports.show = function(req, res) {
    const {id} = req.params

    const filteredReceita = receitas.recipes.find(function(receita) {
        return receita.id == id
    })


    if(!filteredReceita) {
        return res.send("Recipe not found!")
    }
    return res.render('admin/show', {item: filteredReceita})
}

exports.create = function(req, res) {
    return res.render('admin/create')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    const {image, title, author, ingredients, preparation, information} = req.body
    const id = Number(receitas.recipes.length + 1)

    const recipe = {
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    }

    receitas.recipes.push(recipe)

    fs.writeFile('data.json', JSON.stringify(receitas, null, 2), function(err) {
        if(err) return res.send('Error Write file')
        res.render('admin/index', {itens: receitas.recipes})
    })
}

exports.edit = function(req, res) {
    const {id} = req.params
    
    const filteredReceita = receitas.recipes.find(function(receita){
        return receita.id == id
    })

    if(!filteredReceita) {
        return res.send("Error: Recipe not found!")
    }

    return res.render('admin/edit', {item: filteredReceita})
}

exports.put = function(req, res) {

    const {id} = req.body

    let index = 0

    const foundRecipe = receitas.recipes.find(function(receita, foundIndex) {
        if(receita.id == id) {
            index = foundIndex
            return true
        } 
    })

    if(!foundRecipe) return res.send("Error: Recipe not found!")

    const recipeUpdate = {        
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    receitas.recipes[index] = recipeUpdate

    fs.writeFile('data.json', JSON.stringify(receitas, null, 2), function(err) {
        if(err) return res.send("Error write file")
        return res.redirect(`/admin/recipes/${id}`)
    })
    
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredRecipes = receitas.recipes.filter(function(receita) {
        return receita.id != id
    })

    receitas.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(receitas, null, 2), function(err) {
        if(err) return res.send("Erro write file")

        return res.render('admin/index', {itens: receitas.recipes})
    })
}