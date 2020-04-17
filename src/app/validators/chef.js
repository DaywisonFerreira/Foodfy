const Chef = require('../models/Chef')

function checkAllFields(body){
    // check if has all fiels
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                chef: body,
                error: "Por favor, preencha todos os campos"
            }
        }
    }
}


function post(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if(fillAllFields) {
        return res.render('admin/chefs/create', fillAllFields)
    }
    if (req.files.length == 0)
        return res.render('admin/chefs/create', {
            chef: req.body,
            error: 'Por favor, envie uma imagem de perfil' 
        })


    next()
}

function put(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if(fillAllFields) {
        return res.render('admin/chefs/create', fillAllFields)
    }

    next()
}

async function remove(req, res, next) {
    const { id } = req.body
    const totalRecipes = await Chef.getTotalRecipes(id)
    
    if (totalRecipes > 0) {
        return res.render("admin/chefs/create", {
            user: req.body,
            error: "Chefes que possuem receitas não podem ser deletados."
        })
    }

    next()
}


module.exports = {
    post,
    put,
    remove
}