const { IsEmail, IsString, Length, MinLength } = require('class-validator');

class SignupDto {
	@IsString()
	@Length(3, 10)
	username;

  	@IsString()
  	@MinLength(1)
  	firstname;

  	@IsString()
  	@MinLength(1)
  	lastname;

  	@IsEmail()
  	email;

  	@IsString()
  	@MinLength(10)
  	password;

	validateFields() {
    	const allowedFields = ['username', 'firstname', 'lastname', 'email', 'password'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { SignupDto };
