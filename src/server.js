const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes/routes')
const methodOverride = require('method-override')
const session = require('./config/session')
var path = require('path');

const server = express()

server.use(session)
server.use((req, res, next) => {
    res.locals.session = req.session
    next()
})
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.resolve('./public')));
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape:false,
    noCache: true
})



server.listen(3000, function(){
    console.log('server rodando na porta 3000')
})