/**
 * Taken from https://github.com/infinitered/ignite/blob/master/boilerplate/app/services/api/api-problem.ts
 */
export type GeneralApiProblem =
	/**
	 * Times up.
	 */
	| { kind: "timeout"; temporary: true }
	/**
	 * Cannot connect to the server for some reason.
	 */
	| { kind: "cannot-connect"; temporary: true }
	/**
	 * The server experienced a problem. Any 5xx error.
	 */
	| { kind: "server" }
	/**
	 * We're not allowed because we haven't identified ourself. This is 401.
	 */
	| { kind: "unauthorized" }
	/**
	 * We don't have access to perform that request. This is 403.
	 */
	| { kind: "forbidden" }
	/**
	 * Unable to find that resource.  This is a 404.
	 */
	| { kind: "not-found" }
	/**
	 * All other 4xx series errors.
	 */
	| { kind: "rejected" }
	/**
	 * Something truly unexpected happened. Most likely can try again. This is a catch all.
	 */
	| { kind: "unknown"; temporary: true }
	/**
	 * The data we received is not in the expected format.
	 */
	| { kind: "bad-data" };

/**
 * Should be used as a base for the API responses to be
 * handled correctly
 */
export type BaseResponse<T> =
	| {
			kind: "ok";
			result: T;
	  }
	| GeneralApiProblem;
