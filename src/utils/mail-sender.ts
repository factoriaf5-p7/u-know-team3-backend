// Use at least Nodemailer v4.1.0
import { createTransport, getTestMessageUrl } from 'nodemailer';

export const sendEmail = (user, token) => {

	const transporter = createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'alexie35@ethereal.email',
			pass: 'wdC2Ur2kNYY9sbFEUY',

		// host: process.env.SMTP_HOST, //'smtp.ethereal.email'
		// port: process.env.SMTP_PORT, //587
		// auth: {
		// user: process.env.SMTP_USER, //'alexie35@ethereal.email'
		// pass: process.env.SMTP_PASSW //'wdC2Ur2kNYY9sbFEUY'
		},
	});

	// Message object
	const message = {
		from: 'Uknow <uknow@example.com>',
		to: user.email, //user.email
		subject: 'Solicitud recuperación contraseña',
		// text: 'Hello to myself!',
		html: `<p><b>Hello</b> aqui tienes enlace para recuperar contraseña</p><br>
			<a href="http://localhost:3000/auth/upassword?id=${user._id}&token=${token}">Resetear contraseña</a>`, // token
	};

	transporter.sendMail(
		message,
		(err: { message: string }, info: { messageId: any }) => {
			if (err) {
				console.log('Error occurred. ' + err.message);
				return process.exit(1);
			}

			// console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			// console.log('Preview URL: %s', getTestMessageUrl(info.messageId));
		},
	);
};