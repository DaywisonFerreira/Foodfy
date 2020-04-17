const User = require('../models/User')
const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../utils/mailer')

exports.list = async function (req, res) {
    try {
        const users = await User.list()

        return res.render('admin/users/index', { users })
    } catch (error) {
        console.error(error)
        return res.render('admin/users/index', {
            users,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }

}


exports.create = function (req, res) {
    return res.render('admin/users/create')
}
exports.post = async function (req, res) {
    try {

        let {name, email, is_admin} = req.body

        // criando senha aleatória
        const passwordRandom = crypto.randomBytes(2).toString('hex')
        const password = await hash(passwordRandom, 8)
        const token = crypto.randomBytes(20).toString('hex')

        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await User.create({
            name,
            email,
            password,
            is_admin: is_admin || false,
            reset_token: token,
            reset_token_expires: now
        })

        await mailer.sendMail({
            to: email,
            from: "no-reply@foodfy.com.br",
            subject: "Senha de acesso",
            html: `<h2>Senha de acesso</h2>
            <p>Você deve utilizar a senha <strong>${passwordRandom}</strong> para acessar o sistema.</p>
            <p>
               <a href="http://localhost:3000/admin/login?token=${token}" target="_blank">ACESSAR</a>
            </p>`
         })

        const users = await User.list()
        return res.render("admin/users/index",{
            success: "Usuário criado com sucesso",
            users,
        })
    } catch (error) {
        console.error(error)
        return res.render('admin/users/index', {
            users,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }

}

exports.edit = async function (req, res) {
    try {
        const { id } = req.params

        const user = await User.find(id)
        return res.render('admin/users/edit', { user })

    } catch (error) {
        console.error(error)
        return res.render('admin/users/edit', {
            users,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }
}

exports.put = async function (req, res) {
    try {

        const {id, name, email} = req.body

        let user = await User.findOne({where:{id}})

        await User.update(user.id, {
            name,
            email,
            is_admin: req.body.is_admin || false
        })

        const users = await User.list()
        return res.render("admin/users/index",{
            success: "Usuário atualizado com sucesso",
            users,
        })

        
    } catch (error) {
        console.error(error)
        return res.render('admin/users/index', {
            users,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }


}

exports.delete = async function (req, res) {
    try {
        const { id } = req.body
    
        await User.delete(id)
        const users = await User.list()
        return res.render("admin/users/index",{
            success: "Usuário deletado com sucesso",
            users,
        })
        
    } catch (error) {
        console.error(error)
        return res.render('admin/users/index', {
            users,
            error: "Erro inesperado, tente novamente mais tarde"
        })
    }

}