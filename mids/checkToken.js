const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		console.log('token:', req.cookies.token);
		const result = await jwt.verify(
			req.cookies.token,
			process.env.JWT_SECRET,
			(err, payload) => {
				if (err) throw new Error('token expired / broken');
				return payload;
			}
		);
		console.log('checkToken response: \n', result);
		res.locals.token = result;
		next();
	} catch (e) {
		res
			.status(401)
			.render('error', { response: 'Invalid token: ' + e.message, exp: 0 });
	}
};
