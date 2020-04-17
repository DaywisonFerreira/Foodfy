const express = require('express')
const routes = express.Router()
const CommonController = require('../app/controllers/CommonController')
const RecipeController = require('../app/controllers/RecipeController')
const ChefController = require('../app/controllers/ChefController')
const UserController = require('../app/controllers/UserController')
const ProfileController = require('../app/controllers/ProfileController')
const SessionController = require('../app/controllers/SessionController')


const SessionValidator = require('../app/validators/session')
const ChefValidator = require('../app/validators/chef')
const ProfileValidator = require('../app/validators/profile')
const RecipeValidator = require('../app/validators/recipe')
const UserValidator = require('../app/validators/user')

const multer = require('../app/middlewares/multer')
const { onlyUsers, isAdmin } = require('../app/middlewares/session')


routes.get('/', CommonController.index)
routes.get('/receitas', CommonController.receitas)
routes.get('/sobre', CommonController.sobre)
routes.get("/recipes/:index", CommonController.show)
routes.get('/buscaReceita', CommonController.buscaReceita)
routes.get('/chefs', CommonController.chefs)


routes.get("/admin/recipes", onlyUsers, RecipeController.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create",onlyUsers, RecipeController.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id",onlyUsers, RecipeValidator.isOwner, RecipeController.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit",onlyUsers, RecipeValidator.isOwner,  RecipeController.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes",onlyUsers, multer.array('photos', 5),  RecipeValidator.post, RecipeController.post); // Cadastrar nova receita
routes.put("/admin/recipes",onlyUsers,  multer.array('photos', 5), RecipeValidator.put, RecipeController.put); // Editar uma receita
routes.delete("/admin/recipes",onlyUsers, RecipeController.delete); // Deletar uma receita


routes.get("/admin/chefs",onlyUsers, ChefController.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create",onlyUsers, isAdmin,  ChefController.create); // Mostrar formulário de novo chef
routes.post("/admin/chefs",onlyUsers, isAdmin, multer.array('avatar', 1), ChefValidator.post, ChefController.post); // Cadastrar novo chef
routes.get("/admin/chefs/:id",onlyUsers, ChefController.show); // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit",onlyUsers, isAdmin, ChefController.edit); // Mostrar formulário de edição de um chef
routes.put("/admin/chefs",onlyUsers, isAdmin, multer.array('avatar', 1), ChefValidator.put, ChefController.put); // Editar um chef
routes.delete("/admin/chefs",onlyUsers, isAdmin, ChefValidator.remove, ChefController.delete); // Deletar um chef*/

routes.get("/admin/users", onlyUsers, isAdmin, UserController.list)
routes.get("/admin/users/create", onlyUsers, isAdmin, UserController.create)
routes.post('/admin/users', onlyUsers, isAdmin, UserValidator.post, UserController.post) //Cadastrar um usuário
routes.put('/admin/users', onlyUsers, isAdmin, UserValidator.put, UserController.put) // Editar um usuário
routes.get("/admin/users/:id/edit", onlyUsers, isAdmin, UserController.edit)
routes.delete("/admin/users", onlyUsers, isAdmin, UserValidator.remove, UserController.delete); // Deletar um usuário*/

// Rotas de perfil de um usuário logado
routes.get('/admin/profile', onlyUsers, ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/admin/profile', onlyUsers, ProfileValidator.put, ProfileController.put)// Editar o usuário logado

// login/logout
routes.get('/admin/login', SessionController.loginForm)
routes.post('/admin/login', SessionValidator.firstAccess, SessionValidator.login, SessionController.login)
routes.post('/admin/logout', SessionController.logout)

// reset password / forgot
routes.get('/admin/forgot-password', SessionController.forgotForm)
routes.get('/admin/password-reset', SessionController.resetForm)
routes.post('/admin/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/admin/password-reset', SessionValidator.reset, SessionController.reset)





module.exports = routes