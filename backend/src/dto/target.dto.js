const { IsInt } = require('class-validator');

class targetDto {
	@IsInt()
	target;

	validateFields() {
    	const allowedFields = ['target'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { targetDto };
