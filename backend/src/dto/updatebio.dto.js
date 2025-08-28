class UpdateBioDto {
    constructor(data) {
        this.bio = data.bio.trim();

        const allowedFields = ['bio'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.bio !== 'string' || this.bio.length < 1 || this.bio.length > 200)
            errors.push('Bio doit contenir entre 1 et 200 caractères.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { UpdateBioDto };
