import express from 'express'
import * as pedidoController from '..//controllers/pedidoController.js'
import validate from '..//middlewares/validate.js'
import { pedidoCreateSchema, pedidoUpdateSchema } from '..//controllers/pedidoController.js'


const router = express.Router()

router.post ('/',validate(pedidoCreateSchema), pedidoController.adicionarPedido)

router.get ('/' , pedidoController.listarPedidos);
router.get('/:idPedido', pedidoController.listarPedidosId);

router.put ('/:idPedido', validate(pedidoUpdateSchema), pedidoController.atualizarPedido)
router.delete('/:idPedido', pedidoController.deletarPedido)

export default router

