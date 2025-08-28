class SignupDto {
    constructor(data) {
        this.username = data.username.trim();
        this.firstname = data.firstname.trim();
        this.lastname = data.lastname.trim();
        this.email = data.email.trim();
        this.password = data.password;

		const allowedFields = ['username', 'firstname', 'lastname', 'email', 'password'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.username !== 'string' || this.username.length < 3 || this.username.length > 10)
            errors.push('Username doit contenir entre 3 et 10 caractères.');

        if (typeof this.firstname !== 'string' || this.firstname.length < 1 || this.firstname.length > 20)
            errors.push('Firstname doit contenir entre 1 et 20 caractères.');

        if (typeof this.lastname !== 'string' || this.lastname.length < 1 || this.lastname.length > 20)
            errors.push('Lastname doit contenir entre 1 et 20 caractères.');

        if (typeof this.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
            errors.push('Email invalide.');

        if (typeof this.password !== 'string' || this.password.length < 10)
            errors.push('Password doit contenir au moins 10 caractères.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { SignupDto };
