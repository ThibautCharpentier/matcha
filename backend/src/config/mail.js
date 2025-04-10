const { createTransport } = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('../db/user');
const admin = require('../db/admin');

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
	const verificationToken = jwt.sign({ id: query_user.id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.MAIL_TOKEN_EXPIRATION });
	const verificationLink = `http://${process.env.HOST_IP}:${process.env.FRONT_PORT}/token_mail?token=${verificationToken}`;
	await sendMail(email, 'email de vérification', `SMACK
Veuillez cliquer sur ce lien pour vérifier votre adresse email : ${verificationLink}

Attention ce lien expirera au bout de 10 minutes.`);
}

const sendValidateEmail = async (id, email) => {
	const verificationToken = jwt.sign({ id: id, mail: email }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.MAIL_TOKEN_EXPIRATION });
	const verificationLink = `http://${process.env.HOST_IP}:${process.env.FRONT_PORT}/token_newmail?token=${verificationToken}`;
	await sendMail(email, 'changement de votre adresse mail', `SMACK
Veuillez cliquer sur ce lien pour valider la modification de votre adresse email : ${verificationLink}

Attention ce lien expirera au bout de 10 minutes.`);
}

const sendForgotPassword = async (email) => {
	let query_user = await user.selectByEmail(email);
	const verificationToken = jwt.sign({ id: query_user.id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.MAIL_TOKEN_EXPIRATION });
	const verificationLink = `http://${process.env.HOST_IP}:${process.env.FRONT_PORT}/token_password?token=${verificationToken}`;
	await sendMail(email, 'mot de passe oublié', `SMACK
Veuillez cliquer sur ce lien pour renouveler votre mot de passe : ${verificationLink}

Attention ce lien expirera au bout de 10 minutes. Si vous n'êtes pas à l'origine de cette demande de changement de mot de passe, veuillez ignorer ce mail.`);
}

const sendForgotUsername = async (email, username) => {
	await sendMail(email, "nom d'utilisateur oublié", `SMACK
Voici l'intitulé de votre nom d'utilisateur : '${username}'.
A bientôt sur SMACK ;)`);
}

const sendAdminCode = async (id, email) => {
	let code = ""
	for (let i = 0; i < 6; i++)
		code = code + Math.floor(Math.random() * 10).toString()
	await admin.changeCode(id, code)
	await sendMail(email, "code de vérification", `SMACK
Voici votre code de vérification afin de vous connecter en mode administrateur : ${code}`)
}

module.exports = { sendMail, sendVerifyEmail, sendValidateEmail, sendForgotPassword, sendForgotUsername, sendAdminCode };
