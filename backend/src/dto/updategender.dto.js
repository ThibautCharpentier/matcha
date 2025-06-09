const { IsString, IsIn } = require('class-validator');

class UpdateGenderDto {
    @IsString()
    @IsIn(['man', 'woman'])
    gender;

    validateFields() {
        const allowedFields = ['gender'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateGenderDto };
