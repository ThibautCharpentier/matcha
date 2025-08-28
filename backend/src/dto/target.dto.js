class TargetDto {
    constructor(data) {
        this.target = data.target;

        const allowedFields = ['target'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (!Number.isInteger(this.target))
            errors.push('Target doit être un entier.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { TargetDto };
