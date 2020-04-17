const User = require('../models/User')
const { compare } = require('bcryptjs')


async function put(req, res, next) {
    const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '' && key != 'is_admin') {
                return res.render("admin/users/profile", {
                    user: req.body,
                    error: "Preencha todos os campos!"
                })
            }
        }

        const {id, password} = req.body

        let user = await User.findOne({where:{id}})

        const passed = await compare(password, user.password)

        if(!passed) {
            return res.render("admin/users/profile", {
                user: req.body,
                error: "Senha incorreta!"
            })
        }

        next()
}

module.exports = {
    put
}
