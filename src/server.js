const express = require('express')
const routes = require('./routes')
const server = express()
const path = require('path')

server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos statics
server.use(express.static('public'))

// usar o request body
server.use(express.urlencoded())

// routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))