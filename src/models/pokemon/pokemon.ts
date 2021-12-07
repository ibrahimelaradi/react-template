import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Define what your model does
 */
export const PokemonModel = types
	.model("Pokemon")
	.props({
		// TODO: Define Pokemon properties here
		name: types.string,
		url: types.string,
	})
	.views((self) => ({
		// TODO: Define Pokemon views here (if any)
		get id() {
			return self.url.split("/").pop();
		},
	}))
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	.actions((self) => ({
		// TODO: Define Pokemon actions here (if any)
	}));

export type Pokemon = Instance<typeof PokemonModel>;
export type PokemonSnapshot = SnapshotOut<typeof PokemonModel>;
