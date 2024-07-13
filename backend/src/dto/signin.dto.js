const { IsString } = require('class-validator');

class SigninDto {
	@IsString()
	username;

  	@IsString()
  	password;

	validateFields() {
    	const allowedFields = ['username', 'password'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { SigninDto };
