const {response} = require('express')

const Compra = require('../models/compra')

const compraGet = async (req, res = response) => {
    const _id = req.query.id;
    try {
      if (_id !== undefined) {
        const compra = await Compra.findById(_id);
        if (compra) {
          res.json({
            compras: compra,
          });
        } else {
          res.status(404).json({
            msg: "La compra no fue encontrada",
          });
        }
      } else {
        const compras = await Compra.find();
        res.json({
          compras,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error en el servidor",
      });
    }
  };
  
  const compraPut = async (req, res = response) => {
    const { id } = req.body;
    const { proveedor, numFactura, fechaCompra, fechaRegistro, estado, detalleCompra } = req.body;
    let mensaje = "";
  
    try {
      const compra = await Compra.findById(id);
      if (compra) {
        compra.proveedor = proveedor;
        compra.numFactura = numFactura;
        compra.fechaCompra = fechaCompra;
        compra.fechaRegistro = fechaRegistro;
        compra.estado = estado;
        compra.detalleCompra = detalleCompra;
  
        const totalCompra = detalleCompra.reduce((total, producto) => {
          return total + producto.precioCompra * producto.cantidad;
        }, 0);
        compra.totalCompra = totalCompra;
  
        await compra.save();
  
        mensaje = "La modificación se efectuó correctamente";
      } else {
        mensaje = "La compra no fue encontrada";
      }
    } catch (error) {
      console.error(error);
      mensaje = error.message;
    }
  
    res.json({
      msg: mensaje,
    });
  };
  
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
