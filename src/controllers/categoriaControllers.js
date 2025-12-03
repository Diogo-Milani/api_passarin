import * as categoriaService from'../services/categoriaService.js';
import joi from 'joi'

export const categoriaCreateSchemas= joi.object({
nome: joi.string()
})

export const categoriaUpdateSchemas= joi.object({
nome: joi.string(),
}).min(1);

export const listarCategoria = async(req, res) => {
try{
    const categoria = await categoriaService.findAll();
    res.status(200).json(categoria);
} catch (err){
console.error("Erro ao buscar a categoria: ", err);
}
};


export const listarCategoriaId = async (req, res) => {
    try{
        const {idCategoria}= req.params;
        const categoria = await categoriaService.findByidCategoria(idCategoria);
if(!categoria){
    return res.status(404).json({error: "Não encontrado"});
    }
    res.status(200).json(categoria);
}catch (err){
console.log("Erro ao buscar:", err);
res.status(500).json({error: "Erro interno do servidor "});
    }
};
    export const adicionarCategoria = async (req,res ) =>{
try{
    const novaCategoria = await categoriaService.create(req.body);
    res.status(201).json({message: 'Adicionado com suceso!', data:novaCategoria});
    }catch(err){
        console.log('Erro ao adicionar:', err);
        if(err.code=== 'ER_DUP_ENTRY'){
            return res.status(409).json({error: 'Categoria já cadastrada.'});
        }
        res.status(500).json({error: "Erro ao adicionar a nova categoria"});
    }
};

export const atualizarCategoria = async (req,res)=> {
    try{
    const {idCategoria} = req.params;
    const update= await categoriaService.update(idCategoria, req.body);
    if(!update){
    return res.status(404).json({error: 'Não encontrado'});
}
res.status(200).json({mesage: "Atualizado com sucesso! "})
}catch (err) {
console.error('Erro ao atualizar: ', err);
res.status(500).json({error: "Erro ao atualizar"});
    }
};

export const deletarCategoria = async (req,res)=> {
    try{
        const {idCategoria} = req.params
        const deleted = await categoriaService.remove(idCategoria);
        if(!deleted) {
            return res.status(404).json({error: "Não encontrado "});
        }
        res.status(200).json({mesage: 'Categoria deletada com sucesso!'});

    }catch (err){
        console.error('Erro ao deletar', err);
        res.status(500).json({error: 'Erro ao deletar'});
    }
}