const { IsString, MaxLength } = require('class-validator');

class UpdateBioDto {
    @IsString()
    @MaxLength(200)
    bio;

    validateFields() {
        const allowedFields = ['bio'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateBioDto };
