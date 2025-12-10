import Joi from 'joi';
import * as itemservice from '../services/itemServices.js'
import joi from 'joi'

export const itemCreateSchema = joi.object({
idProduto: joi.string().required(),
idPedido: joi.string().required(),
qtd: Joi.string().required(),
valorParcial: Joi.string().required()
})

export const itemUpdateSchema = joi.object({
idProduto: joi.string(),
idPedido: joi.string(),
qtd: Joi.string(),
valorParcial: Joi.string()
}).min(1);

export const listarItem = async (req,res) => {
    try {
        const item = await itemservice.findAll()
        res.status(200).json(item)
    } catch (err) {
        console.error('Erro ao buscar item',err)
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

export const adicionarItem = async (req,res) => {
    try {
        const novoItem = await itemservice.create(req.body)
        res.status(201).json({message: 'Item adicionado com sucesso', data: novoItem})
    } catch (err) {
        console.error ('Erro ao adicionar item',err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json ({error: 'Item ja cadastrado'})
        }
        res.status(500).json({error: 'Erro ao adicionar item'})
    }
}

export const deletarItem = async (req,res) => {
    try {
        const {idItem} = req.params
        const deleted = await itemservice.remove(idItem)
        if(!deleted) {
            return res.status(404).json({error: 'Item não encontrado'})
        }
        res.status(200).json({message: 'Item deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletar item',err)
    }
}

export const atualizarItem =  async (req,res) => {
    try {
        const {idItem} = req.params
        const updated = await itemservice.update(idItem, req.body)
        if (!updated) {
            return res.status(404).json({error: 'Erro ao atualizar o item, não encontrado.'})
        }
        res.status(202).json({message: 'Item atualizado com sucesso'}) 
    } catch (err) {
        console.error('Erro ao atualizar o item, deu pau no server')
        res.status(500).json({error: 'Erro ao atualizar item'})
    }
}

export const listarIdItem = async (req,res) => {
    try {
        const {idItem} = req.params
        const item = await itemservice.findByIdItem(idItem)
        if (!item) {
            return res.status(404).json({error: 'item não encontrado'})
        }
        res.status(200).json(item)
    } catch (err) {
        console.error('Error ao buscar item',err)
        res.status(500).json ({error: 'Erro interno do servidor'})
    }
}