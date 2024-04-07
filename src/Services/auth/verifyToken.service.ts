import express from 'express'
import  jwt  from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config/config';


export const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.token) {
        return res.status(401).json({
            message: "Unathorize request",
        });
    }
    const token = req.header('token');
    if(!token) return res.status(400).json({"Mensaje":"Acceso denegado"})

    try {
        const verify = jwt.verify(token, TOKEN_SECRET)
        if(verify){
            next()
        }
    } catch (error) {
        res.status(500).json({
            "Mensaje": "Token Invalido"
        })
    }
}