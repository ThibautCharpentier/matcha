const { IsEmail, IsString, Length, MinLength } = require('class-validator');

class SignupDto {
	@IsString()
	@Length(3, 10)
	username;

  	@IsString()
  	@Length(1, 20)
  	firstname;

  	@IsString()
  	@Length(1, 20)
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
