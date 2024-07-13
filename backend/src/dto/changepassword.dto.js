const { IsString, MinLength } = require('class-validator');

class ChangePasswordDto {
	@IsString()
  	@MinLength(10)
  	password;

	validateFields() {
    	const allowedFields = ['password'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { ChangePasswordDto };
