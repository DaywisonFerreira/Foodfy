const receitas = require('../data')

exports.index = function(req, res){
    return res.render('index.njk', {item: receitas})
} 

exports.sobre = function(req, res){
    return res.render('sobre.njk')
}

exports.receitas = function(req, res) {
    return res.render('receitas.njk', {item: receitas})
}

exports.show = function (req, res) {    
    const recipeIndex = req.params.index;
    const receita = receitas[recipeIndex]
    
    return res.render('receita', {item: receita})
  }