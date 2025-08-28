class UpdateGpsDto {
    constructor(data) {
        this.gps = data.gps;

        const allowedFields = ['gps'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.gps !== 'boolean')
            errors.push('Gps doit être un booléen.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { UpdateGpsDto };
