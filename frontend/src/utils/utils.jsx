import zxcvbn from "zxcvbn"

export function validatePassword(pwd) {
	const analysisPwd = zxcvbn(pwd)
	const hasMinLength = pwd.length >= 10;
	const hasLetter = /[a-zA-Z]/.test(pwd);
	const hasNumber = /[0-9]/.test(pwd);
	const hasSpecialChar = /[!$@%]/.test(pwd);

	if (!hasMinLength)
		return "Au moins 10 caractères"
	if (!hasLetter)
		return "Le mot de passe doit contenir au moins une lettre"
	if (!hasNumber)
		return "Le mot de passe doit contenir au moins un chiffre"
	if (!hasSpecialChar)
		return "Le mot de passe doit contenir au moins un caractère spécial (!$@%)"
	if (analysisPwd.score < 3)
		return "Mot de passe trop simple ou contient des mots courants"
	return null;
}