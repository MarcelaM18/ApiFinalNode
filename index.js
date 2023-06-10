require('dotenv').config()//importar paquete dotenv que es para las variabales de entorno

const Server = require ('./models/server')//loque traemos de la clase

const server = new Server()//Instanciando el objeto

server.listen()