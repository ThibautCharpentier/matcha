const { plainToClass } = require('class-transformer');
const { validate } = require('class-validator');

const validateDto = (dtoClass) => (req, res, next) => {
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

module.exports = { validateDto };
