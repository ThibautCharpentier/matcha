class ChangePasswordDto {
    constructor(data) {
        this.password = data.password;

        const allowedFields = ['password'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.password !== 'string' || this.password.length < 10)
            errors.push('Password doit contenir au moins 10 caractères.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { ChangePasswordDto };
