import {
	ApiResponse,
	ApisauceConfig,
	ApisauceInstance,
	create,
} from "apisauce";
import { GeneralApiProblem } from "./types";

/**
 * Abstract class used as a standard template for API clients
 */
export abstract class BaseApi {
	protected sauce: ApisauceInstance;
	constructor(config: ApisauceConfig) {
		this.sauce = create(config);
	}
	/**
	 * A protected method used to regularize the way errors
	 * are presented from the API side
	 */
	protected getGeneralApiProblem<T>(
		response: ApiResponse<T>
	): GeneralApiProblem | null {
		switch (response.problem) {
			case "CONNECTION_ERROR":
				return { kind: "cannot-connect", temporary: true };
			case "NETWORK_ERROR":
				return { kind: "cannot-connect", temporary: true };
			case "TIMEOUT_ERROR":
				return { kind: "timeout", temporary: true };
			case "SERVER_ERROR":
				return { kind: "server" };
			case "UNKNOWN_ERROR":
				return { kind: "unknown", temporary: true };
			case "CLIENT_ERROR":
				switch (response.status) {
					case 401:
						return { kind: "unauthorized" };
					case 403:
						return { kind: "forbidden" };
					case 404:
						return { kind: "not-found" };
					default:
						return { kind: "rejected" };
				}
			case "CANCEL_ERROR":
				return null;
		}
		return null;
	}
}
