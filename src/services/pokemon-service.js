import axios from "axios";

export const getPokemons = (nextPage) => {
    if (!nextPage) {
        return axios.get("https://pokeapi.co/api/v2/pokemon?limit=12");
    }
    return axios.get(nextPage);
}

export const getTypes = (params) => {
    if (params) {
        return axios.get(`${params}`);
    }
    return axios.get(`https://pokeapi.co/api/v2/type/`);
}

export const getPokemon = (params) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${params}`);
}

export const getDescription = (params) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${params}`);
}
