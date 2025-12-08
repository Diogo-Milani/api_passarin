import db from '..//db/db.js'

export const findAll = async (minValor, maxValor, email, idpPedido) => {
    let sql = 'SELECT * FROM pedido';
    const conditions = [];
    const values = [];

    if (email) {
        conditions.push('email = ?')
        values.push(email)  
}

    if (conditions.length > 0) {
        sql += 'WHERE' + conditions.join('AND');
    }

    const [rows] = await db.query(sql,values);
    return rows
}

export const create = async (pedidoData) => {
    const newPedido = pedidoData

    await db.query('INSERT INTO pedido SET ?', newPedido)
    return newPedido
}

export const update = async(idPedido, pedidoData) => {
    const [result] = await db.query ('UPDATE pedido SET ? WHERE idPedido = ?',[pedidoData,idPedido])
    return result.affectedRows > 0
}

export const findByIdPedido = async(idPedido) =>  {
    const [result] = await db.query ('SELECT * FROM pedido WHERE idPedido = ?', [idPedido])
    return result
}

export const remove = async (idPedido) => {
    const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
    return result.affectedRows > 0;
};
