import React from "react";
import { useState, useEffect } from "react";

("https://pokeapi.co/api/v2/");

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemons = async () => {
    setLoading(true);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
    );
    const data = await res.json();
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      })
    );
    console.log(pokemonData, "ini pokemonData");
    setPokemon((prev) => [...prev, ...pokemonData]);
    setLoading(false);
  };
  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const handleSearchPokemon = async (event) => {
    event.preventDefault();
    setSearchResult(null);
    setError(null);
    if (!search.trim()) return;
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!res.ok) throw new Error("pokemon not found");
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="mb-3">
        <form onSubmit={handleSearchPokemon} action="">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-200 px-3 py-2 rounded-full text-shadow-xs"
          />
          <button
            type="submit"
            className="ml-3 bg-blue-400 px-3 py-2 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      {searchResult && (
        <div className="rounded-lg flex flex-col justify-center items-center">
          <img
            src={searchResult.sprites.front_default}
            alt="gambar pokemon"
            className="w-56 h-56"
          />
          <h1 className="text-xl font-semibold capitalize">
            {searchResult.name}
          </h1>
        </div>
      )}

      <div className="flex gap-1 justify-between flex-wrap">
        {pokemon.map((poke, id) => (
          <div
            key={id}
            onClick={() => setSelectedPokemon(poke)}
            className="bg-slate-200 flex flex-col rounded-xl mt-20 p-5"
          >
            <img
              src={poke.sprites.front_default}
              alt="gambar pokemon"
              className="w-56 h-56"
            />
            <h1>{poke.id}</h1>
            <h1 className="text-xl font-semibold capitalize -mt-3">
              •{poke.name}•
            </h1>
            <button className="bg-gray-500 text-sm rounded-full mt-3 hover:bg-gray-400">
              More Details
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setOffset((prev) => prev + 12)}
          className="mx-auto px-5 py-2 border-2 border-red-300 hover:bg-red-300 mt-5 rounded-full font-semibold"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center">
          <div className="flex">
            <button
              onClick={() => setSelectedPokemon(null)}
              className="text-lg text-white flex justify-end"
            >
              x
            </button>
            <div className="">
              <div>
                <label className="text-white text-xl">Type</label>
                <h2 className="text-lg text-white capitalize border bg-emerald-500 py-1 px-2 rounded-full mt-3">
                  {selectedPokemon.types
                    .map((type) => type.type.name)
                    .join(" | ")}
                </h2>
              </div>
              <div className="mt-10">
                <label className="text-white text-xl">Abilities</label>
                <h2 className="text-white text-lg capitalize border bg-amber-500 py-1 px-2 rounded-full mt-3">
                  {selectedPokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(" | ")}
                </h2>
              </div>
            </div>
            <div className="mx-12">
              <span className="bg-blue rounded-full w-40 h-40"></span>
              <img
                src={selectedPokemon.sprites.front_default}
                alt="gambar pokemon"
                className="w-96 h-96 rounded-full"
              />

              <h1 className="text-2xl text-white capitalize">
                {selectedPokemon.name}
              </h1>
            </div>
            <div className="flex gap-5 border-2 border-white rounded-md max-w-lg">
              <div>
                <label htmlFor="" className="text-white">
                  Height
                </label>
                <h3 className="text-white mt-2">{selectedPokemon.height}</h3>
              </div>
              <div className="">
                <label htmlFor="" className="text-white">
                  Weight
                </label>
                <h3 className="text-white mt-2">{selectedPokemon.weight}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemon;
