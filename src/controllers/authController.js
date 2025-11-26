import jwt from 'jsonwebtoken'
import bcrypt from  'bcrypt'
import * as clienteService from '../services/clienteServices.js';

export const login = async (req,res) => {
    const {email, senha} = req.body

    try {
        const clientes = await clienteService.findByEmail(email);
        if (!clientes) {
            return res.status(404).json({message: 'Credenciais inválidas'})
        }

    const senhaValida = await bcrypt.compare(senha, clientes.senha);
    if(!senhaValida) {
        return res.status(401).json ({message:'Credenciais inválidas'})
    }

    const payload  = {email: clientes.email};

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.json({message:'Login bem-sucedido!', token:token})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Erro interno do servidor'})
    }
};