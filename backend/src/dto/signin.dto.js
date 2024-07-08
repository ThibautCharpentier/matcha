const { plainToClass } = require('class-transformer');
const { validate, IsString } = require('class-validator');

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

const validateSigninDto = (dtoClass) => (req, res, next) => {
	const dtoInstance = plainToClass(dtoClass, req.body);
	validate(dtoInstance).then(errors => {
		if (errors.length > 0)
			return res.status(400).json({message: errors.map(err => err.constraints)})
		else
		{
			try
			{
                dtoInstance.validateFields();
                req.body = dtoInstance;
                next();
            }
			catch (error)
			{
                return res.status(400).json({ message: error.message });
            }
		}
	});
}

module.exports = { SigninDto, validateSigninDto };
