/**
 * Heavily inspired by Ignite implementation
 * @see https://github.com/infinitered/ignite/blob/master/boilerplate/app/models/root-store/setup-root-store.ts
 */

import { onSnapshot } from "mobx-state-tree";
import { RootStoreModel, RootStore } from "./root-store";
import { StoreEnvironment } from "./env";
import * as storage from "../../utils/storage";
import { RootStoreSnapshot } from ".";

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_KEY = "root";

/**
 * Setup the root state.
 */
export function setupStore() {
	let rootStore: RootStore;
	let data: unknown;

	// prepare the environment that will be associated with the RootStore.
	const env = new StoreEnvironment();
	try {
		// load data from storage
		data = storage.load(ROOT_KEY) || {};
		rootStore = RootStoreModel.create(data as RootStoreSnapshot, env);
	} catch (e) {
		// if there's any problems loading, then let's at least fallback to an empty state
		// instead of crashing.
		rootStore = RootStoreModel.create({}, env);
	}

	// track changes & save to storage
	onSnapshot(
		rootStore,
		({
			// TODO: Exclude any nodes here if needed
			...snapshot
		}) => storage.save(ROOT_KEY, snapshot)
	);

	return rootStore;
}
