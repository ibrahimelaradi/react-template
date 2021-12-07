import React from "react";
import { observer } from "mobx-react-lite";
import title from "title";
import "./pokemon-card.scss";

interface PokemonCardProps {
	// TODO: Add component props here
	name: string;
}

/**
 * A component used to render the name of the pokemon, file is generated
 * using the template found in the templates directory
 */
export const PokemonCard = observer((props: PokemonCardProps) => {
	return (
		<div className="card">
			<h1>{title(props.name)}</h1>
		</div>
	);
});
