import { Type } from 'class-transformer';

const { IsIn, IsDate, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize } = require('class-validator');

class CompleteProfileDto {
    @IsIn(['man', 'woman'])
	gender;

    @IsIn(['men', 'women', 'all'])
    preferences;

    @Type(() => Date)
    @IsDate()
    birthdate;

    @ArrayNotEmpty() 
    interest;

	validateFields() {
        const allowedFields = ['gender', 'preferences', 'birthdate', 'interest', 'pictures'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { CompleteProfileDto };
