import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { PokemonModel, PokemonSnapshot, Pokemon } from "../pokemon";

/**
 * The root store, any properties defined here will be accessible
 * by any observers that consume it
 */
export const RootStoreModel = types
	.model("Root")
	.props({
		pokemons: types.array(PokemonModel),
	})
	.extend(withEnvironment)
	.actions((self) => ({
		/**
		 * Save a new list of pokemons in the store
		 */
		savePokemons(pokemons: PokemonSnapshot[]) {
			self.pokemons.replace(pokemons as Pokemon[]);
		},
	}))
	.actions((self) => ({
		/**
		 * Load the pokemons from the API
		 */
		async loadPokemons() {
			const result = await self.environment.pokemons.getAllPokemons();
			if (result.kind === "ok") {
				self.savePokemons(result.result);
			}
		},
	}));

export type RootStore = Instance<typeof RootStoreModel>;
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;
