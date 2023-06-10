const {Router} = require('express')
const route = Router()

const {compraGet, compraPost, compraPut, compraDelete} = require('../controllers/compra')

route.get('/',compraGet)
route.post('/',compraPost)
route.put('/',compraPut)
route.delete('/',compraDelete)

module.exports = route