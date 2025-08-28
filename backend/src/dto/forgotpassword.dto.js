class ForgotPasswordDto {
    constructor(data) {
        this.username = data.username.trim();

        const allowedFields = ['username'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.username !== 'string' || this.username.length < 3 || this.username.length > 10)
            errors.push('Username doit contenir entre 3 et 10 caractères.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { ForgotPasswordDto };
