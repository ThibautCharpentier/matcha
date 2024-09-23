const { IsString, Length} = require('class-validator');

class UpdateUsernameDto {
	@IsString()
	@Length(3, 10)
	username;

	validateFields() {
    	const allowedFields = ['username'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateUsernameDto };
