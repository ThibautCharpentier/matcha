const { IsEmail } = require('class-validator');

class UpdateEmailDto {
	@IsEmail()
  	email;

	validateFields() {
    	const allowedFields = ['email'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateEmailDto };
