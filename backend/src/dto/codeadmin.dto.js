class CodeAdminDto {
    constructor(data) {
        this.id = data.id;
        this.code = data.code;

        const allowedFields = ['id', 'code'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (!Number.isInteger(this.id))
            errors.push('Id doit être un entier.');

        if (typeof this.code !== 'string' || !/^\d{6}$/.test(this.code))
            errors.push('Code doit être une chaîne de 6 chiffres.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { CodeAdminDto };
