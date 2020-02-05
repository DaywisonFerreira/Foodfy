const express = require('express')
const nunjucks = require('nunjucks')
var path = require('path');

const server = express()
const receitas = require('./data.js')

server.use(express.static(path.resolve('./public')));

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache: true
})

server.get('/', function(req, res){
    return res.render('index.njk', {item: receitas})
})

server.get('/receitas', function(req, res){
    return res.render('receitas.njk', {item: receitas})
})

server.get('/sobre', function(req, res){
    return res.render('sobre.njk')
})

server.get("/recipes/:index", function (req, res) {    
    const recipeIndex = req.params.index;
    const receita = receitas[recipeIndex]
    
    return res.render('receita', {item: receita})
  })


server.listen(3000, function(){
    console.log('server rodando na porta 3000')
})