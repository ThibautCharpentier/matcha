const utils = require('../utils/utils');

class CompleteProfileDto {
    constructor(data) {
        this.gender = data.gender;
        this.preferences = data.preferences;

        let date = data.birthdate.trim().split('-')
        if (date.length != 3)
            throw new Error(`Birthdate doit être une date valide.`);
        this.birthdate = new Date(date[0], date[1], date[2]);

        this.bio = data.bio.trim();
        this.interest = data.interest;

        const allowedFields = ['gender', 'preferences', 'birthdate', 'bio', 'interest', 'pictures'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (!['man', 'woman'].includes(this.gender))
            errors.push("Gender doit être 'man' ou 'woman'.");

        if (!['men', 'women', 'bi'].includes(this.preferences))
            errors.push("Preferences doit être 'men', 'women' ou 'bi'.");

        if (!(this.birthdate instanceof Date) || isNaN(this.birthdate.getTime()))
            errors.push('Birthdate doit être une date valide.');
        if (utils.calculateAge(this.birthdate) < 18)
            errors.push('Vous devez avoir au moins 18 ans.');

        if (typeof this.bio !== 'string' || this.bio.length < 1 || this.bio.length > 200)
            errors.push('Bio doit contenir entre 1 et 200 caractères.');

        if (!Array.isArray(this.interest) || this.interest.length === 0)
            errors.push('Interest doit être un tableau non vide.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { CompleteProfileDto };
