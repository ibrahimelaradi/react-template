/**
 * Dynamically add routes based on the list defined in ./routes.ts,
 * can be customized to meet your use case
 */

import React from "react";
import { Route, Routes } from "react-router";
import { routes } from "./routes";

export const Router = () => {
	return (
		<Routes>
			{routes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={<route.component />}
				/>
			))}
		</Routes>
	);
};
