import { PokemonApi } from "../../apis/pokemon/pokemon-api";

/**
 * Environment is defined as a class here for injection that is provided by mobx-state-tree
 */
export class StoreEnvironment {
	/**
	 * The PokeApi client
	 */
	pokemons: PokemonApi;
	// TODO: Can define other environment variables here, process.env can be used here as well for any API keys
	constructor() {
		// TODO: Define any setup for the environment variables and/or initializations here
		this.pokemons = new PokemonApi();
	}
}
