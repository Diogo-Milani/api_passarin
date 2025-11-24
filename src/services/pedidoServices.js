import db from '..//db/db.js'

export const findAll = async (minValor, maxValor, email, idpPedido) => {
    let sql = 'SELECT * FROM produto';
    const conditions = [];
    const values = [];

    if (email) {
        conditions.push('email = ?')
        values.push(email)  
}
    if (idpPedido) {
        conditions.push('idPedido = ?')
        values.push(idpPedido)
    }

    if (conditions.length > 0) {
        sql += 'WHERE' + conditions.join('AND');
    }

    const [rows] = await db.query(sql,values);
    return rows
}

export const create = async (pedidoData) => {
    const newPedido = pedidoData

    await db.query('INSERT INTO produto SET ?', newPedido)
    return newPedido
}

export const update = async(idpPedido, pedidoData) => {
    const [result] = await db.query ('UPDATE pedido SET ? WHERE idpedido = ?',[idpPedido,pedidoData])
    return result.affectedRows > 0
}

