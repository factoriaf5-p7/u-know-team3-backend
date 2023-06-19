"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
(0, nodemailer_1.createTestAccount)((err, sendTo, token) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
    console.log('Credentials obtained, sending message...');
    const transporter = (0, nodemailer_1.createTransport)({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'bella.denesik@ethereal.email',
            pass: 'MSQZ8d9VBXSPMJZapt',
        },
    });
    const message = {
        from: 'Uknow <uknow@example.com>',
        to: sendTo,
        subject: 'Recuperar contraseña',
        html: '<p><b>Hello</b> aqui tienes enlace para recuperar contraseña</p><a href="">',
    };
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', (0, nodemailer_1.getTestMessageUrl)(info));
    });
});
//# sourceMappingURL=mail-sender.js.map