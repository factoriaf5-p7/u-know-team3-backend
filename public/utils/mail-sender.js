"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const sendEmail = (user, token) => {
    const transporter = (0, nodemailer_1.createTransport)({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alexie35@ethereal.email',
            pass: 'wdC2Ur2kNYY9sbFEUY',
        },
    });
    const message = {
        from: 'Uknow <uknow@example.com>',
        to: user.email,
        subject: 'Solicitud recuperación contraseña',
        html: `<p><b>Hello</b> aqui tienes enlace para recuperar contraseña</p><br>
			<a href="http://localhost:3000/auth/upassword?id=${user._id}&token=${token}">Resetear contraseña</a>`,
    };
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mail-sender.js.map