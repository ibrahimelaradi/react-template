/**
 * Defined from PokeApi docs
 * @see https://pokeapi.co/docs/v2
 */
export type ResourceListParams = {
	limit: number;
	offset: number;
};
/**
 * Defined from PokeApi docs
 * @see https://pokeapi.co/docs/v2
 */
export type NamedResource = {
	name: string;
	url: string;
};
/**
 * Defined from PokeApi docs
 * @see https://pokeapi.co/docs/v2
 */
export type ResourceList = {
	count: number;
	next: string | null;
	previous: string | null;
	results: NamedResource[];
};
