const { IsInt, Length, Matches } = require('class-validator');

class CodeAdminDto {
    @IsInt()
    id;

    @Length(6, 6)
    @Matches(/^\d{6}$/)
    code;

    validateFields() {
        const allowedFields = ['id', 'code'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { CodeAdminDto };
