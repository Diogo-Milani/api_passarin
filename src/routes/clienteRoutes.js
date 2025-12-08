import express from 'express'
import * as clienteController from '../controllers/clienteController.js'
import validate from '../middlewares/validate.js'
import { clienteCreateSchema, clienteUpdateSchema } from '../controllers/clienteController.js'

import authMiddleware from  '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', validate (clienteCreateSchema), clienteController.adicionarCliente);

router.use(authMiddleware)

router.get('/', clienteController.listarClientes);
router.get('/:email' ,clienteController.listarClientesEmail);

router.put('/:email' , validate(clienteUpdateSchema), clienteController.atualizarCliente);
router.delete('/:email', clienteController.deletarCliente);

export default router