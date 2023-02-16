import express from 'express'
import { createUser, getUserByUsername } from '../../core/users/users.core'
import Bcrypt from 'bcrypt'
import { User } from '../../Models/users.model'
import  jwt  from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config/config'

export const createUserService = async (req: express.Request, res: express.Response) => {
    try {
        const { usuario, password, role, empresa } = req.body
        
        const user = await getUserByUsername(usuario)
        
        if(user.Items?.length){
            res.status(400).json({ "Mensaje": "Ya existe ese usuario" })
            return
        }
        const newPassword = Bcrypt.hashSync(password, 10)
        const userToCreate: User = {
            usuario: usuario,
            password: newPassword,
            role: role,
            empresa: empresa
        }
        const createNewUser = await createUser(userToCreate) 
        
        if(createNewUser.$metadata.httpStatusCode == 200){
            res.json({ "Mensaje": "Usuario Creado" })
        }else{
            res.json({ "Mensaje": "Error al crear el usuario" })
        }
    } catch (error) {
        res.json(error)
    }
}

export const loginUserService = async (req: express.Request, res: express.Response) => {

    const { usuario, password } = req.body
    
    const user = await getUserByUsername(usuario)
    if(!user.Items?.length){
        res.status(400).json({ "Mensaje": "No existe este usuario" })
        return
    }
    
    const validPassword = await Bcrypt.compare(password,user.Items[0].password)
    if(!validPassword){
        return res.status(400).json({"Mensaje": "Contraseña Incorrecta"})
    }
    
    const token = jwt.sign({user: user.Items[0]}, TOKEN_SECRET,{expiresIn: '6h'})
    res.header("token").json({
        "usuario": usuario,
        "token": token,
        "role": user.Items[0].role,
        "empresa" : user.Items[0].empresa
    })


}