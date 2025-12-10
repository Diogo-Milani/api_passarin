import express from 'express'
import * as categoriaControllers from '../controllers/categoriaControllers.js'
import validate from '../middlewares/validate.js'
import { categoriaCreateSchemas, categoriaUpdateSchemas } from '../controllers/categoriaControllers.js'

// import authMiddleware from  '../middlewares/authMiddleware.js'

const router = express.Router();


router.post('/', validate(categoriaCreateSchemas), categoriaControllers.adicionarCategoria);


// router.use(authMiddleware);

router.get('/', categoriaControllers.listarCategoria); 
router.get('/:idCategoria', categoriaControllers.listarCategoriaId)




router.put('/:idCategoria', validate(categoriaUpdateSchemas), categoriaControllers.atualizarCategoria); 
router.delete('/:idCategoria', categoriaControllers.deletarCategoria);

export default router; 