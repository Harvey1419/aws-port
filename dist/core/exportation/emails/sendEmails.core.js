"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.returnMessageSaex = exports.returnMessageInitialDocuments = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const returnMessageInitialDocuments = (fileRUrl, fileFurl, fileCPurl) => {
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
    };
    return message;
};
exports.returnMessageInitialDocuments = returnMessageInitialDocuments;
const returnMessageSaex = (fileUrl) => {
    const message = {
        sender: "Notificador de Solicitud de solicitud de transporte a puerto",
        from: "Notificador <example@example.com>",
        to: ["jharvey1419@gmail.com"],
        subject: "Solicitud de solicitud de transporte a puerto",
        text: "",
        html: "<h1>Realizar la solicitud de solicitud de transporte a puerto</h1>",
        date: new Date(),
        attachments: [
            {
                filename: 'sae.pdf',
                path: fileUrl
            },
        ]
    };
    return message;
};
exports.returnMessageSaex = returnMessageSaex;
const sendMessage = (message) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'jharvey1914@gmail.com',
            pass: 'xzalrcefcrtmfrqs'
        }
    });
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Error enviando email");
            console.log(error.message);
        }
        else {
            console.log("Email enviado");
        }
    });
};
exports.sendMessage = sendMessage;
