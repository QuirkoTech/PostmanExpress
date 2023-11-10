const sendErrorDev = (err, req, res) => {
	return res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
};

const sendErrorProd = (err, req, res) => {
	// A) Operational, trusted error: send message to client
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});
	}

	// B) Programming or other unknown error: don't leak error details
	// 1) Log error
	console.error('ERROR', err);
	// 2) Send generic message
	return res.status(500).json({
		status: 'error',
		message: 'Something went wrong!'
	});
};

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.ENV === 'dev') {
		sendErrorDev(err, req, res);
	} else if (process.env.ENV === 'prod') {
		let error = { ...err };
		error.message = err.message;

		sendErrorProd(error, req, res);
	}
};
