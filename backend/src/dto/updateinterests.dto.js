class UpdateInterestsDto {
    constructor(data) {
        this.tabInterests = data.tabInterests

        const allowedFields = ['tabInterests'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
            const errors = [];
    
            if (!Array.isArray(this.tabInterests) || this.tabInterests.length === 0)
                errors.push('tabInterests doit être un tableau non vide.');
    
            if (errors.length > 0)
                throw new Error(errors.join(' | '));
        }
}

module.exports = { UpdateInterestsDto };
