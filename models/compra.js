
const {Schema, model} = require('mongoose')


const CompraSchema = Schema({
    proveedor:{
        type: String,
        required:[true, 'El campo proveedor es requerido']
    },

    numFactura:{
      type: Number,
      unique:true,
      required:[true, 'El campo numFactura es requirido']
    },

    fechaCompra:{
        type: Date,
        required:[true, 'El campo fechaCompra es requerido']
    },

    fechaRegistro:{
        type:Date,
        required:[true, 'El campo fechaRegistro es requerido']
    },


    estado:{
        type: Boolean,
        default: true,
        required:[true, 'El campo estado es requerido']
    },    

    detalleCompra: [{
        producto: {
          type: String,
          required: [true, 'El campo producto es requerido'],
        },
        categoria:{
            type: String,
            required:[true, 'El campo Categoria es requerido']
    
        } ,
        precioCompra: {
          type: Number,
          required: [true, 'El campo precioCompra es requerido'],
        },
        cantidad:{
          type:Number,
          required: [true, 'El campo cantidad es requerido'],
        },
        precioVenta: {
          type: Number,
          required: [true, 'El campo precioVenta es requerido'],
        },
      }],
      totalCompra:{
        type: Number
    },
 
})

CompraSchema.pre('save', function (next) {
  let total = 0;
  for (let i = 0; i < this.detalleCompra.length; i++) {
    const detalle = this.detalleCompra[i];
    const subtotal = detalle.precioCompra * detalle.cantidad;
    total += subtotal;
  }
  this.totalCompra = total;
  next();
});
 



module.exports = model('Compra', CompraSchema)
