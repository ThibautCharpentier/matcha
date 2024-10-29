const { IsIn, IsDate, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize } = require('class-validator');

class CompleteProfileDto {
    @IsIn(['man', 'woman'])
	gender;

    @IsIn(['men', 'women', 'all'])
    preferences;

    @IsDate()
    age;

    @ArrayNotEmpty() 
    interest;

    @ArrayMinSize(4)
    @ArrayMaxSize(6)
    pictures;

	validateFields() {
        const allowedFields = ['gender', 'preferences', 'age', 'interest', 'pictures'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { CompleteProfileDto };
