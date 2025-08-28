class AuthAdminDto {
    constructor(data) {
        this.email = data.email.trim();

        const allowedFields = ['email'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
            errors.push('Email invalide.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { AuthAdminDto };
