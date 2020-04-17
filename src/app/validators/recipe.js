const Recipes = require('../models/Recipes')


async function post(req, res, next) {
    const keys = Object.keys(req.body)
    const listChefs = await Recipes.selectChef()
    for(key of keys) {
        if(req.body[key] == "" && key != "removed_files") {
            
            return res.render("admin/recipes/create", {
                recipe: req.body,
                listChefs,
                error: "Preencha todos os campos!"
            })
        }
    }

    if (!req.files || req.files.length == 0) {
        return res.render("admin/recipes/create", {
            recipe: req.body,
            listChefs,
            error: "Envie pelo menos uma imagem"
        })
    }

    next()
}

function put(req, res, next) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "" && key != "removed_files" && key != "information") {
            return res.render("admin/recipes/edit", {
                recipe: req.body,
                error: "Preencha todos os campos!"
            })
        }
    }

    next()
}

async function isOwner(req, res, next){
    const recipeId = req.params.id
    const {id:userLoggedId, is_admin} = req.session.user 
    if(is_admin == false) {
        const recipe = await Recipes.find(recipeId)

        if(recipe.user_id != userLoggedId) {
            return res.redirect("/admin/recipes")
        }     
    }

    next()
}

module.exports = {
    post,
    put,
    isOwner
}