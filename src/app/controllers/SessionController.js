const User = require('../models/User')
const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../utils/mailer')
require('dotenv/config')


exports.loginForm = function (req, res) {
   return res.render('admin/session/login', {token: req.query.token || ''})
}

exports.login = function(req, res) {
   req.session.user = req.user
   return res.redirect("/admin/recipes")
}

exports.logout = function(req, res) {
   req.session.destroy()
   return res.redirect('/admin/login')
}

exports.forgotForm = function(req, res) {
   return res.render('admin/session/forgot-password')
} 

exports.forgot = async function(req, res) {
   const user = req.user

   try {
      const token = crypto.randomBytes(20).toString('hex')

      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
         reset_token: token,
         reset_token_expires: now
      })

      await mailer.sendMail({
         to: user.email,
         from: "no-reply@foodfy.com.br",
         subject: "Recuperação de senha",
         html: `<h2>Perdeu a chave?</h2>
         <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
         <p>
            <a href=${process.env.APP_URL}/admin/password-reset?token=${token} target="_blank">RECUPERAR SENHA</a>
         </p>`
      })

      return res.render('admin/session/forgot-password', {
         success: "Verifique seu email para resetar sua senha!"
      })
   } catch (error) {
      console.error(error)
      return res.render('admin/session/forgot-password', {
         error: "Erro inesperado, tente novamente mais tarde"
      })
   }
}

exports.resetForm = function(req, res) {
   return res.render('admin/session/password-reset', {token: req.query.token})
}

exports.reset = async function(req, res) {
   const user = req.user
   const { password, token } = req.body

   try {            

      // cria um novo hash de senha
      const newPassword = await hash(password, 8)

      // atualiza o usuário
      await User.update(user.id, {
          password: newPassword,
          reset_token: "",
          reset_token_expires: ""
      })

      // avisa o usuário que ele tem uma nova senha
      return res.render("admin/session/login", {
          user:req.body,
          success: "Senha atualizada! Faça o seu login"
      })


  } catch (error) {
      console.error(error)
      return res.render('admin/session/password-reset', {
          user: req.body,
          token,
          error: "Erro inesperado, tente novamente mais tarde"
      })
  }
}
