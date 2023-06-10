const {response} = require('express')
const Categoria = require('../models/categoria')

const categoriaGet = async(req, res = response)=> {

    const {nombre} = req.query

    const categoria = await Categoria.find(nombre)

    res.json({
        categoria
    })
}

//registrar

const categoriaPost = async(req, res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
   
    console.log(body)
    try {
        const categorias = new Categoria(body) //Instanciar el objeto   
        await categorias.save()
        mensaje = 'El registro se realizó exitosamente'
    } catch (error) {
        console.log(error)
        if (error) {
            if (error.name === 'ValidationError') {
               console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            }
        }
        console.log(mensaje)
    }

    res.json({
        msg: 'la insercion se efecto correctamente'
    })
}

const categoriaPut = async(req, res = response) => {
    const {id} = req.params
    const {nombre, estado} = req.body
    let mensaje = ''

    try{
        const categoria = await Categoria.findOneAndUpdate({id:id},{ nombre: nombre,estado:estado})
        mensaje = 'La modificación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}

const categoriaDelete = async(req, res = response) => {

    const {_id} = req.body
    let mensaje = ''

    try{
        const categoria = await Categoria.deleteOne({_id: _id})
        mensaje = 'La eliminiación se efectuó exitosamente.'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}


  

module.exports={
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}