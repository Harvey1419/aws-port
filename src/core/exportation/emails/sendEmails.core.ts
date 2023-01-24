import nodemailer from 'nodemailer'

export const returnMessageInitialDocuments = (fileRUrl: string, fileFurl?: string, fileCPurl?: string) => {
    const message = {
        sender: "Notificador Creación SAE",
        from: "Notificador <example@example.com>",
        to: ["jharvey1419@gmail.com"],
        subject: "Creación SAE",
        text: "",
        html: "<h1>Se le solicita realizar la creación del Documento SAE</h1>",
        date: new Date(),
        attachments: [
            {  
                filename: 'reserva.pdf',
                path: fileRUrl
            },
            {
                filename: 'factura.pdf',
                path: fileFurl
            },
            {
                filename: 'CP.pdf',
                path: fileCPurl
            }

        ]
    }
    return message
}

export const returnMessageSaex = (fileUrl: string) => {
    const message = {
        sender: "Notificador de Solicitud de solicitud de transporte a puerto",
        from: "Notificador <example@example.com>",
        to: ["jharvey1419@gmail.com"],
        subject: "Solicitud de solicitud de transporte a puerto",
        text: "",
        html: "<h1>Realizar la solicitud de solicitud de transporte a puerto</h1>",
        date: new Date(),
        attachments: [
            {   // use URL as an attachment
                filename: 'sae.pdf',
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

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
        } else {
            console.log("Email enviado")
        }
    })
}