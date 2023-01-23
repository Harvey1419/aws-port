import express from 'express'
import { UploadedFile } from 'express-fileupload'
import { changeDocumentNameBasedOnUploadedDocument } from '../../core/exportation/exportation.dynamo.core'

export const uploadFileBasedOnDocumentNameService = async (req: express.Request, res: express.Response) => {
    try {
        const file = req.files?.file as UploadedFile
        const method = req.params.method
        if (method === 'reserva' || method === 'factura' || method === 'CP' || method === 'BL' || method === 'DEX' || method === 'SAE') {
            await changeDocumentNameBasedOnUploadedDocument(req.params.numero_do, method, file.name)
            res.json({ 'Mensaje': `Archivo subido en la exportancion con numero do: ${req.params.numero_do}` })
        } else {
            res.status(400).json({ 'Mensaje': `No existe el documento ${method} en exportaciones` })
        }
    } catch (error) {
        res.json(error)
    }

}