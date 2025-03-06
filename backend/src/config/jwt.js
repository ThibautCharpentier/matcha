const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtrequired = () => (req, res, next) => {
	if (!req.cookies?.accessToken)
		return res.status(401).json({ message: 'Token not found' });
	try {
		const decoded = jwt.verify(req.cookies.accessToken, process.env.SECRET_TOKEN_KEY);
		req.user_id = decoded.id;
	}
	catch (err) {
		return res.status(403).json({message: err});
	}
	next();
}

module.exports = { jwtrequired };
