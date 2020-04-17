const { excludeFile } = require('../../utils/utils')

const Recipes = require('../models/Recipes')
const File = require('../models/File')
const RecipeFile = require('../models/RecipeFile')
const LoadRecipeService = require('../services/LoadRecipeService')

exports.index = async function(req, res) {
    try {
        const filter = req.session.user.is_admin ? '' : { where: {user_id: req.session.user.id}} 
        let recipes = await LoadRecipeService.load('recipes', filter)
        return res.render('admin/recipes/index', {recipes})
        
    } catch (error) {
        console.error(error)
        return res.render('admin/recipes/index', {
            recipes,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }
}

exports.show = async function(req, res) {
    const {id} = req.params

    const recipe = await LoadRecipeService.load('recipe', {
        where:{id}
    })
    return res.render('admin/recipes/show', {recipe})
}

exports.create = async function(req, res) {
    try {
        const listChefs = await Recipes.selectChef()
        return res.render('admin/recipes/create', {listChefs})
        
    } catch (error) {
        console.error(error)
        return res.render('admin/recipes/index', {
            listChefs,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }
}

exports.post = async function(req, res) {
    try {

        const photos = req.files.map(file => File.create({name: file.filename, path: file.path}))
        const filesIds = await Promise.all(photos) 
    
        let {chef_id, title, ingredients, preparation, information} = req.body
        ingredients = ingredients.filter(ingredient => ingredient != '')
        preparation = preparation.filter(prepare => prepare != '')
        ingredients = JSON.stringify(ingredients).replace("[", "{").replace("]", "}")
        preparation = JSON.stringify(preparation).replace("[", "{").replace("]", "}")
        
        
        let user_id = req.session.user.id
        const recipe_id = await Recipes.create({
            chef_id,
            user_id,
            title,
            ingredients,
            preparation,
            information
        })

    
        const recipe_file = filesIds.map(file_id => RecipeFile.create({recipe_id, file_id}))
        await Promise.all(recipe_file)
        
        const filter = req.session.user.is_admin ? '' : { where: {user_id: req.session.user.id}} 
        let recipes = await LoadRecipeService.load('recipes', filter)
        return res.render('admin/recipes/index',{
            success: 'Receita criada com sucesso',
            recipes
        })
    } catch (error) {
        console.error(error)
        return res.render('admin/recipes/index', {
            recipes,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }    
}

exports.edit = async function(req, res) {
    try {
        const {id} = req.params
    
        const recipe = await LoadRecipeService.load('recipe', {
            where: {
                id
            }
        })
    
        const listChefs = await Recipes.selectChef()
        
        return res.render('admin/recipes/edit', {recipe, listChefs}) 
    } catch (error) {
        console.error(error)
        return res.render('admin/recipes/index', {
            recipes,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }
    
}

exports.put = async function(req, res) {
    try {       
        
        const { id } = req.body

        if(req.files.length != 0) {
            const photos = req.files.map(file => File.create({
                name: file.filename,
                path: file.path
            }))
            const filesIds = await Promise.all(photos)
            const recipe_file = filesIds.map(file_id => RecipeFile.create({recipe_id:id, file_id}))
            await Promise.all(recipe_file) 
        }
    

        if (req.body.removed_files != '') {
            const removedFiles = req.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)
            const removedFilesPromise = removedFiles.map(file => File.delete(file))

            await Promise.all(removedFilesPromise)

            const files = await Recipes.files(id)
            files.map(file =>{
                excludeFile(file)
            })
        }
        let {chef_id, title, ingredients, preparation, information} = req.body

        ingredients = ingredients.filter(ingredient => ingredient != '')
        preparation = preparation.filter(prepare => prepare != '')
        ingredients = JSON.stringify(ingredients).replace("[", "{").replace("]", "}")
        preparation = JSON.stringify(preparation).replace("[", "{").replace("]", "}")

        await Recipes.update(id, {
            chef_id,
            title,
            ingredients,
            preparation,
            information
        })        
       
        
        const filter = req.session.user.is_admin ? '' : { where: {user_id: req.session.user.id}} 
        let recipes = await LoadRecipeService.load('recipes', filter)
        return res.render('admin/recipes/index',{
            success: 'Receita atualizada com sucesso',
            recipes
        })

    } catch (error) {
        console.error(error)
        return res.render('admin/recipes/index', {
            recipes,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }
    
}

exports.delete = async function(req, res) {
    try {
        const {id} = req.body
        const removedFiles = await Recipes.files(id)

        const removedFilesPromise = removedFiles.map(file => File.delete(file.file_id))

        await Promise.all(removedFilesPromise)
        
        await Recipes.delete(id)

        removedFiles.map(file =>{
            excludeFile(file)
        })
        const filter = req.session.user.is_admin ? '' : { where: {user_id: req.session.user.id}} 
        let recipes = await LoadRecipeService.load('recipes', filter)
        return res.render('admin/recipes/index',{
            success: 'Receita deletada com sucesso',
            recipes
        })
        
    } catch (error) {
        console.error(error)
        return res.render('admin/recipes/index', {
            recipes,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }
}