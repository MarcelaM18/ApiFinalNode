const {response} = require('express')

const Compra = require('../models/compra')

//Listar

const compraGet = async(req, res = response)=> {

    const {proveedor} = req.query

    const compras = await Compra.find(proveedor)

    res.json({
        compras
    })
}

//agregar

const compraPost = async(req,res=response)=>{
    const {proveedor,numFactura,fechaCompra,fechaRegistro, 
    estado, detalleCompra} = req.body
   
    const fechaActual = new Date()
  
    if(Date.parse(fechaCompra) > Date.parse(fechaActual)){
        res.json({
            msg: 'La fecha de compra no puede ser mayor a la fecha actual '
        })
    }
    if( fechaCompra > fechaRegistro){
        res.json({
            msg: 'La fecha de registro  no puede ser menor a la fecha de compra '
        })
    }
    let totalCompra = 0;
    detalleCompra.forEach(detalle => {
    totalCompra += detalle.precioCompra;
    })
        try{
            const compras = new Compra({
                proveedor,
                numFactura,
                fechaCompra,
                fechaRegistro, 
                estado,
                detalleCompra,
                totalCompra
            })
            await compras.save()
            console.log('Se agrego con exito')
        
            res.json({
                msg:'La insercción se eféctuo correctamente'
        
            })
            }catch (error) {
                    console.error(error);
                    res.json({
                        msg:'La inserción no fue exitosa ocurrió un error '
                    })
            }
        }        
//modificar
const compraPut = async (req, res = response)=>{
    const {id} = req.params
    const {proveedor,numFactura,fechaCompra,fechaRegistro, 
        estado, detalleCompra} = req.body

    let totalCompra = 0;
    detalleCompra.forEach(detalle => {
    totalCompra += detalle.precioCompra;
    })
    try{
        const compra = await Compra.findOneAndUpdate({id:id},{ proveedor:proveedor,numFactura:numFactura,fechaCompra:fechaCompra,fechaRegistro:fechaRegistro, 
            estado:estado, detalleCompra:detalleCompra, totalCompra})
        mensaje = 'La modificación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })    
}

//eliminar
const compraDelete = async (req, res = response)=>{
    const {_id} = req.body
    let mensaje = ''

    try{
        const compra = await Compra.deleteOne({_id: _id})
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
    compraGet,
    compraPost,
    compraPut,
    compraDelete 
    
}