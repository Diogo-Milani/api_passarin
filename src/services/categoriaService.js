import db from '../db/db.js'

//usando o export const para exportações nomeadas 
export const findAll = async () => {
    const [result]= await db.query('SELECT * FROM categoria');
    return result;
};

export const findByidCategoria = async(idCategoria) => {
const [result]= await db.query('SELECT * FROM categoria WHERE idCategoria = ? ', [idCategoria]);
return result.length>0 ? result[0] : null;
};

export const create = async (categoriaData) => {

    const newCategoria = {
        ...categoriaData,
    };

    await db.query(' INSERT INTO categoria SET ? ', newCategoria);

    return newCategoria;

};

export const update = async (idCategoria, categoriaData) => {

    const [result] = await db.query(' UPDATE categoria SET ? WHERE idCategoria = ? ', [categoriaData, idCategoria]);
    return result.affectedRows > 0;
};

export const remove = async (idCategoria) => {
    const [result] = await db.query(' DELETE FROM categoria WHERE idCategoria = ? ', [idCategoria]);
    return result.affectedRows > 0;
};
