const { createTransport } = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('../db/user');

dotenv.config();

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
    },
	secure: false,
	tls: {
        rejectUnauthorized: false,
    },
});

const sendMail = async (dest, subject, text) => {
	await transporter.sendMail({
		from: process.env.EMAIL_SENDER,
		to: dest,
		subject: subject,
		text: text,
	});
}

const sendVerifyEmail = async (email) => {
	let query_user = await user.selectByEmail(email);
	const verificationToken = jwt.sign({ id: query_user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
	const verificationLink = `http://${process.env.HOST_IP}:${process.env.FRONT_PORT}/#token=${verificationToken}`;
	await sendMail(email, 'email de vérification', `SMACK
Veuillez cliquer sur ce lien pour vérifier votre adresse email : ${verificationLink}

Attention ce lien expirera au bout de 10 minutes.`);
}

module.exports = { sendMail, sendVerifyEmail };
