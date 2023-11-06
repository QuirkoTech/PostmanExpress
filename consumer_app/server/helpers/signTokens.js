import jwt from 'jsonwebtoken';

const signTokens = (userType, id) => {
	const accessToken = jwt.sign({ user_type: userType, id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_TTL
	});
	const refreshToken = jwt.sign({ user_type: userType, id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_TTL
	});
	return { accessToken, refreshToken };
};

export default signTokens;
