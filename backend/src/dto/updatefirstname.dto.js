const { IsString, MinLength} = require('class-validator');

class UpdateFirstnameDto {
    @IsString()
    @MinLength(1)
    firstname;

    validateFields() {
        const allowedFields = ['firstname'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateFirstnameDto };