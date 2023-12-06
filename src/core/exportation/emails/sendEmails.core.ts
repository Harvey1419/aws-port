import nodemailer from 'nodemailer'

export const returnMessageInitialDocuments = (fileRUrl: string, fileFurl?: string, fileCPurl?: string, numero_do?:string) => {
    const message = {
        sender: "Notificador Creación SAE",
        from: "Notificador <example@example.com>",
        to: ["jharvey1419@gmail.com"],
        subject: `Creación SAE orden ${numero_do}`,
        text: "",
        html: `<h1>Se le solicita realizar la creación del Documento SAE para la orden: ${numero_do}</h1>`,
        date: new Date(),
        attachments: [
            {  
                filename: `${numero_do}_booking.pdf`,
                path: fileRUrl
            },
            {
                filename: `${numero_do}_factura.pdf`,
                path: fileFurl
            },
            {
                filename: `${numero_do}_CP.pdf`,
                path: fileCPurl
            }

        ]
    }
    return message
}

export const returnMessageSaex = (fileUrl: string, numero_do?:string) => {
    const message = {
        sender: "Notificador de Solicitud de transporte a puerto (SAE CARGADA)",
        from: "Notificador <example@example.com>",
        to: ["jharvey1419@gmail.com"],
        subject: `Solicitud de solicitud de transporte a puerto orden: ${numero_do}`,
        text: "",
        html: `<h1>
        Realizar la solicitud de transporte a puerto de para la orden: ${numero_do} 
        </h1>
        <h2> Se ha realizado la carga del documento SAE para la orden: ${numero_do}</h2>`,
        date: new Date(),
        attachments: [
            {   // use URL as an attachment
                filename: `${numero_do}_sae.pdf`,
                path: fileUrl
            },

        ]
    }
    return message
}

export const returnUpdateDocument = (fileUrl: string, numero_do?:string, fileType?: string) => {
    const message = {
        sender: `Actualización de documento ${fileType}`,
        from: "Notificador <example@example.com>",
        to: ["jharvey1419@gmail.com"],
        subject: `Actualización de documento ${fileType} para la orden: ${numero_do}`,
        text: "",
        html: `<h1>
        Se ha realizado la actualización del documento ${fileType} para la orden: ${numero_do} 
        </h1>`,
        date: new Date(),
        attachments: [
            {   // use URL as an attachment
                filename: `${numero_do}_${fileType}.pdf`,
                path: fileUrl
            },

        ]
    }
    return message
}

export const sendMessage = (message: Object) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jharvey1914@gmail.com',
            pass: 'xzalrcefcrtmfrqs'
        }
    })

    transporter.sendMail(message, (error: any, info:any) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
            console.log(error)
        } else {
            console.log("Email enviado")
        }
    })
}