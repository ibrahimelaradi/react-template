import { BaseApi } from "../base";
import { BaseResponse } from "../base/types";
import { NamedResource, ResourceList } from "./types";
/**
 * Example class of implementing BaseApi
 */
export class PokemonApi extends BaseApi {
	constructor() {
		super({
			baseURL: "https://pokeapi.co/api/v2/",
		});
	}
	/**
	 * Get a list of all the pokemons from the API
	 */
	async getAllPokemons(): Promise<BaseResponse<NamedResource[]>> {
		const url = "/pokemon";
		let response = await this.sauce.get<ResourceList>(url, {
			limit: 100,
			offset: 0,
		});
		if (!response.ok) {
			return this.getGeneralApiProblem(response) || { kind: "bad-data" };
		}
		const result = response.data?.results || [];
		while (response.data?.next) {
			response = await this.sauce.get<ResourceList>(response.data.next);
			if (!response.ok) {
				return this.getGeneralApiProblem(response) || { kind: "bad-data" };
			}
			result.push(...(response.data?.results || []));
		}
		return { kind: "ok", result };
	}
}
