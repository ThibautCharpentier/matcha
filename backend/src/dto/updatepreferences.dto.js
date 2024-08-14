const { IsString, IsIn } = require('class-validator');

class UpdatePreferencesDto {
	@IsString()
	@IsIn(['hommes', 'femmes', 'bi'])
	preferences;

	validateFields() {
    	const allowedFields = ['preferences'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdatePreferencesDto };
