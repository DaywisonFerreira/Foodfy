const User = require('../models/User')


function onlyUsers(req, res ,next) {
    if(!req.session.user) {
        return res.redirect('/admin/login')
    }

    next()
}

async function isAdmin(req, res, next){
    const user = await User.find(req.session.user.id)
    if(!user.is_admin) {
        return res.render('admin/users/index',{
            error: "Acesso restrito a administradores"
        })
    }
    next()
}

module.exports = {
    onlyUsers,
    isAdmin
}