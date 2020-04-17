const User = require('../models/User')

function checkAllFields(body) {
    // check if has all fiels
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "" && key != 'is_admin') {
            return {
                user: body,
                error: "Por favor, preencha todos os campos"
            }
        }
    }
}

async function post(req, res, next) {

    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render('admin/users/create', fillAllFields)
    }

    let { email } = req.body

    const user = await User.findOne({
        where: { email }
    })

    if(user) return res.render('admin/users/create', {
        user: req.body,
        error: 'Usuário já cadastrado no sistema'
    })

    next()
}

async function put(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render('user/users/index', fillAllFields)
    }

    next()
}

async function remove(req, res, next) {
    const { id } = req.body
    const userDeleted = await User.find(id)
    if (userDeleted.id == req.session.user.id) {
        const users = await User.list()
        return res.render("admin/users/index", {
            users,
            error: "Você não pode excluir sua própria conta"
        })
    }

    next()
}

module.exports = {
    post,
    put,
    remove
}
