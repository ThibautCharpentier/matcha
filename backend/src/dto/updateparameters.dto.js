const { IsString, MinLength, IsIn, Length, IsEmail, IsNumber, IsOptional} = require('class-validator');

class UpdateParametersDto {
    @IsOptional()
    @IsString()
    @Length(1, 20)
    firstname;

    @IsOptional()
    @IsString()
    @Length(1, 20)
    lastname;

    @IsOptional()
    @IsString()
    @IsIn(['man', 'woman'])
    gender;

    @IsOptional()
    @IsString()
	@IsIn(['men', 'women', 'bi'])
	preferences;

    @IsOptional()
    @IsString()
    @Length(3, 10)
    username;

    @IsOptional()
    @IsEmail()
    email;

    @IsOptional()
    @IsString()
    @MinLength(10)
    currentPassword;

    @IsOptional()
    @IsString()
    @MinLength(10)
    password;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 6 })
    lat;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 6 })
    lng;

    @IsOptional()
    @IsString()
    city;

    validateFields() {
        const allowedFields = ['firstname', 'lastname', 'gender', 'preferences', 'username', 'email', 'currentPassword', 'password', 'lat', 'lng', 'city'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { UpdateParametersDto };
