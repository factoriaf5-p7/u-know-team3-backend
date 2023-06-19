// Use at least Nodemailer v4.1.0
import {
	createTestAccount,
	createTransport,
	getTestMessageUrl,
} from 'nodemailer';

// Generate SMTP service account from ethereal.email
createTestAccount((err, sendTo, token) => {
	if (err) {
		console.error('Failed to create a testing account. ' + err.message);
		return process.exit(1);
	}

	console.log('Credentials obtained, sending message...');

	// Create a SMTP transporter object
	const transporter = createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'bella.denesik@ethereal.email',
			pass: 'MSQZ8d9VBXSPMJZapt',
		},
	});

	// Message object
	const message = {
		from: 'Uknow <uknow@example.com>',
		to: sendTo, //user.email
		subject: 'Recuperar contraseña',
		// text: 'Hello to myself!',
		html: '<p><b>Hello</b> aqui tienes enlace para recuperar contraseña</p><a href="">', // token
	};

	transporter.sendMail(
		message,
		(err: { message: string }, info: { messageId: any }) => {
			if (err) {
				console.log('Error occurred. ' + err.message);
				return process.exit(1);
			}

			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', getTestMessageUrl(info));
		},
	);
});
