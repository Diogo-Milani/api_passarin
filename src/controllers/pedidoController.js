import * as pedidoService from '../services/pedidoServices.js'
import Joi from 'joi'

export const pedidoCreateSchema = Joi.object({
dataEhora: Joi.string().required(),
quantidade: Joi.string().required().max(255),
formaPagamento: Joi.string().required().max(20),
statusPedido: Joi.string().max(30).allow(''),
precoTotal: Joi.string().allow(''),
email: Joi.string().required().max(50).email()
})

export const pedidoUpdateSchema = Joi.object({
dataEhora: Joi.string(),
quantidade: Joi.string().max(255),
formaPagamento: Joi.string().max(20),
statusPedido: Joi.string().max(30),
precoTotal: Joi.string(),
email: Joi.string().max(50).email()
}).min(1);

export const listarPedidos = async (req,res) => {
    try {
        const {minValor,maxValor,email,idPedido} = req.query;
        const pedidos = await pedidoService.findAll(minValor,maxValor,email,idPedido)
        if (pedidos.length === 0) {
            return res.status(404).json({message: 'Nenhum pedido encontrado  com essses filtros'})
        }
        res.status(200).json(pedidos)
    } catch (err) {
        console.error('Erro ao buscar pedido',err)
        res.status(500).json({error: 'Erro interno no servidor'})
    }
}

export const listarPedidosId = async (req,res) => {
    try {
        const {idPedido} = req.params
        const pedido = await pedidoService.findByIdPedido(pedido)
        if(!pedido) {
            return res.status(404).json({error: 'Erro ao buscar ID do pedido'})
        }
        res.status(200).json(pedido)
    } catch (err) {
        console.error('Erro ao buscar ID' ,err)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export const atualizarPedido = async (req,res) => {
    try {
        const {idPedido} = req.params
        const updated = await pedidoService.update(idPedido,req.body)
        if (!updated) {
            return res.status(404).json({error: 'Pedido não encontrado'})
        }
        res.status(200).json({message: 'Pedido localizado com sucesso'})
    } catch (err) {
        console.error('Erro ao atualizar O pedido',err)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export const adicionarPedido = async (req,res) => {
    try {
        const novoPedido = await pedidoService.create(req.body)
        res.status(201).json({message: 'Pedido adicionado com sucesso', data: novoPedido})
    } catch (err) {
        console.error('Erro ao adicionar pedido' ,err)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json ({error: 'Produto ja cadastrado'})
        }
        res.status(500).json ({error: 'Erro interno do servidor'})
    }
}

export const deletarPedido = async (req,res) => {
    try {
        const {idPedido} = req.params
        const deleted = await pedidoService.remove(idPedido)
        if(!deleted) {
            return res.status(404).json ({error: 'Pedido não encontrado'})
        }
        res.status(200).json ({message: 'Pedido deletado com sucesso'})
    } catch (err) {
        console.error('Erro interno ao deletar pedido' ,err)
        res.status(500).json ({error: 'Erro interno do servidor'})
    }
}