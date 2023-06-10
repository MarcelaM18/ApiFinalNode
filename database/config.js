const mongoose = require('mongoose')

const dbConnetion = async ()=>{
    try{
        mongoose.connect(process.env.MONGO_CNN)
        console.log('Conexión exitosa a la base de datos mongo')
    }catch(error){
        console.log(error)
    }
}

module.exports = {dbConnetion}