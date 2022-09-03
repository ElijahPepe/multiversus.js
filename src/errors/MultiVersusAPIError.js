class MultiVersusAPIError extends Error {
	constructor(rawError) {
		super(MultiVersusAPIError.getMessage(rawError));
	}

	static getMessage(error) {
		return error.msg;
	}
}

module.exports = MultiVersusAPIError;
