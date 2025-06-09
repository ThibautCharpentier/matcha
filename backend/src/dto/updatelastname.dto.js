const { IsString, MinLength} = require('class-validator');

class UpdateLastnameDto {
    @IsString()
    @MinLength(1)
    lastname;

    validateFields() {
        const allowedFields = ['lastname'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateLastnameDto };