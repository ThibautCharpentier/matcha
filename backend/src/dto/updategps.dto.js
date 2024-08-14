const { IsBoolean } = require('class-validator');

class UpdateGpsDto {
	@IsBoolean()
	gps;

	validateFields() {
    	const allowedFields = ['gps'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateGpsDto };
