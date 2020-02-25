const express = require('express')
const routes = express.Router()
const common = require('./controllers/common')
const recipes = require('./controllers/recipes')
const chefs = require('./controllers/chefs')



routes.get('/', common.index)
routes.get('/receitas', common.receitas)
routes.get('/sobre', common.sobre)
routes.get("/recipes/:index", common.show)
routes.get('/buscaReceita', common.buscaReceita)
routes.get('/chefs', common.chefs)


routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita


routes.get("/admin/chefs", chefs.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de novo chef
routes.post("/admin/chefs", chefs.post); // Cadastrar novo chef
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de um chef
routes.put("/admin/chefs", chefs.put); // Editar um chef
routes.delete("/admin/chefs", chefs.delete); // Deletar um chef*/





module.exports = routes