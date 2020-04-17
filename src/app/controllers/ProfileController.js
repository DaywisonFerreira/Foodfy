const User = require('../models/User')


exports.index = async function (req, res) {
    try {
        const userSession = req.session.user.id

        const user = await User.find(userSession)
        return res.render('admin/users/profile', { user })

    } catch (error) {
        console.error(error)
    }
}

exports.put = async function (req, res) {
    try {

        const {id, name, email} = req.body
        
        let user = await User.findOne({where:{id}})
        await User.update(user.id, {
            name,
            email
        })

        const users = await User.list()
        return res.render("admin/users/index", {
            success: "Perfil atualizado com sucesso!",
            users
        })

        
    } catch (error) {
        console.error(error)
        return res.render('admin/chefs/index', {
            users,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }


}

