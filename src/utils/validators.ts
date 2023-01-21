import { body, check, ValidationChain, validationResult, } from "express-validator";
import express from 'express';

export const containerValidations = (containerValidations: ValidationChain[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await Promise.all(containerValidations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if(errors.isEmpty()){
            return next()
        }
        
        res.status(400).send({error: errors.array()})
    }
}

export const containerKeysValidator = [
    body('numero_do').isString().notEmpty().withMessage('No puede ser vacio'),
    body('numero_contenedor').isString(),
    body('volumen').isInt(),
    body('tara').isInt(),
    body('naviera').isString(),
    body('Sellos').isString(),
    body('Destino').isString(),
    body('ETA').isString(),
    body('Material').isString()
]