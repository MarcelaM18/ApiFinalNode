const express = require ('express')
const {dbConnetion} = require('../database/config.js')
const cors = require('cors')
const bodyParser = require('body-parser')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(cors())
        this.app.use(express.json())
        this.compraPath = '/api/compra'
        this.categoriaPath = '/api/categoria'
        this.routes()
        this.middlewares()
        this.conectarDB()
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando por el puerto 8085')
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname+'/public'))
    }

    routes(){
        this.app.use(this.compraPath, require('../routes/compras'))
        this.app.use(this.categoriaPath, require('../routes/categorias'))
    }

    async conectarDB(){
        await dbConnetion()
    }
}

module.exports = Server