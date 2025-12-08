import db from  '../db/db.js'
import bcrypt from 'bcrypt'

export const findAll = async() => {
    const [result] = await db.query('SELECT * FROM clientes')
    return result
}

export const findByCpf = async(cpf) =>  {
    const [result] = await db.query ('SELECT * FROM clientes WHERE cpf = ?', [cpf])
    return result.lenght > 0 ? result [0] : null
}

export const findByEmail = async(email) => {
    const [result] = await db.query('SELECT * FROM clientes WHERE email = ?', [email])
    return result.length > 0 ? result [0] : null 
}

export const create = async (clienteData) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(clienteData.senha, saltRounds)


const newCliente = {
      ...clienteData,
    senha: hashedPassword
}


await db.query('INSERT INTO clientes SET ?',newCliente)

delete newCliente.senha
return newCliente
}

export const update = async (email, clienteData) => {
    if (clienteData.senha) {
        const saltRounds = 10
        clienteData.senha = await bcrypt.hash(clienteData.senha, saltRounds)
    }
    const [result] = await db.query ('UPDATE clientes SET ? WHERE email = ?', [clienteData,email])
return result.affectedRows > 0
}

export const remove = async (email) => {
    const [result] = await db.query('DELETE FROM clientes WHERE email = ?', [email])
    return result.affectedRows > 0
}