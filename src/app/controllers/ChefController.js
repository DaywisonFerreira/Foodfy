const Chef = require('../models/Chef')
const File = require('../models/File')
const LoadChefService = require('../services/LoadChefService')

exports.index = async function (req, res) {
    try {
        const chefs = await LoadChefService.load('chefs')
        return res.render('admin/chefs/index', { chefs })
    } catch (error) {
        console.error(error)
        return res.render('admin/chefs/index', {
            chefs,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }

}

exports.create = function (req, res) {
    return res.render('admin/chefs/create')
}

exports.post = async function (req, res) {
    try {
        const avatarPromise = req.files.map(async file => {
            return  await File.create({ name: file.filename, path: file.path })
        })

        const avatar = await Promise.all(avatarPromise)

        req.body.file_id = avatar

        await Chef.create(req.body)
        const chefs = await LoadChefService.load('chefs')
        return res.render('admin/chefs/index', {
            chefs,
            success: "Chef criado com sucesso"
        })
    } catch (error) {
        console.error(error)
        return res.render('admin/chefs/index', {
            chefs,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }

}

exports.show = async function (req, res) {
    try {
        const { id } = req.params

        let chef = await LoadChefService.load('chef', {
            where: {
                id
            }
        })
        return res.render('admin/chefs/show', { chef })

    } catch (error) {
        console.error(error)
    }


}

exports.edit = async function (req, res) {
    try {
        const { id } = req.params
        const chef = await LoadChefService.load('chef', {
            where: {id}
        })
        return res.render('admin/chefs/edit', { chef })
        
    } catch (error) {
        console.error(error)
    }
    
}

exports.put = async function (req, res) {
    try {

        const avatarOld = req.body.file_id

        if (req.files.length != 0){
            const avatarPromise = req.files.map(async file => {
                return  await File.create({ name: file.filename, path: file.path })
            })
            const avatar = await Promise.all(avatarPromise)
            req.body.file_id = avatar
        }

        
        const { id } = req.body
        await Chef.update(id, req.body)
        
        if(req.files.length != 0) {
            await File.delete(avatarOld)      
        }       
        
        const chefs = await LoadChefService.load('chefs')
        return res.render("admin/chefs/index",{
            chefs,
            success: "Chef atualizado com sucesso"
        })
    } catch (error) {
        console.error(error)
        return res.render('admin/chefs/index', {
            chefs,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }


}

exports.delete = async function (req, res) {
    try {
        const { id } = req.body
    
        await Chef.delete(id)
        const chefs = await LoadChefService.load('chefs')
        return res.render("admin/chefs/index",{
            chefs,
            success: "Chef deletado com sucesso"
        })
        
    } catch (error) {
        console.error(error)
        return res.render('admin/chefs/index', {
            chefs,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }

}