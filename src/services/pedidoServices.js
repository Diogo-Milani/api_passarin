import db from '..//db/db.js'

export const findAll = async (minValor, maxValor, email, idpPedido) => {
    let sql = 'SELECT * FROM pedido';
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

    await db.query('INSERT INTO pedido SET ?', newPedido)
    return newPedido
}

export const update = async(idPedido, pedidoData) => {
    const [result] = await db.query ('UPDATE pedido SET ? WHERE idpedido = ?',[idPedido,pedidoData])
    return result.affectedRows > 0
}

