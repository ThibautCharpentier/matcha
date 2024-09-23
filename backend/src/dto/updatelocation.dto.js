const { IsString, IsNumber } = require('class-validator');

class UpdateLocationDto {
	@IsNumber({ maxDecimalPlaces: 6 })
	lat;

	@IsNumber({ maxDecimalPlaces: 6 })
	lng;

	@IsString()
	city;

	validateFields() {
    	const allowedFields = ['lat', 'lng', 'city'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateLocationDto };
