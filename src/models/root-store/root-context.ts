import { createContext, useContext } from "react";
import { RootStore } from "./root-store";

/**
 * Store context for usage inside react components
 */
const Context = createContext<RootStore>({} as RootStore);

/**
 * The store provider that wraps the children components
 */
export const StoreProvider = Context.Provider;

/**
 * A hook that is used to access the store inside react components
 */
export const useStore = () => useContext(Context);
