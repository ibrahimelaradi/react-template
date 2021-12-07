/**
 * Example page to display a list of pokemons
 */

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./pokemon-list.scss";
import { useStore } from "../../models";
import { PokemonCard } from "../../components";
import logo from "../../assets/logo.svg";

export const PokemonList = observer(() => {
	const { loadPokemons, pokemons } = useStore();
	useEffect(() => {
		loadPokemons();
	}, []);
	return (
		<div className="container">
			<img src={logo} />
			<h1>Pokemon List </h1>
			<div className="grid">
				{pokemons.map((pokemon) => (
					<PokemonCard key={pokemon.id} name={pokemon.name} />
				))}
			</div>
		</div>
	);
});
