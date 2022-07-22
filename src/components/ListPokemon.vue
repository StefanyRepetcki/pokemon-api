<template>
    <div class="list__container">
        <div class="filter">
            <div class="filter__name">
                <input type="text" class="filter__input" v-model="search" placeholder="Search">
                <i class="fas fa-search filter__icon" @click="pokemonSelected()"></i>
            </div>
            <div class="filter__category">
                <select name="category" v-model="categorySelected" class="category">
                    <option v-for="(category, index) in categories" :value="category.url" :key="index">
                        {{ category.name }}
                    </option>
                </select>
                <i class="fas fa-angle-down filter__icon"></i>
            </div>
        </div>
        <div class="section">
            <div v-for="(pokemon, index) in filteredPokemon" :key="index">
                <a :href="`#/description/` + pokemon.id">
                    <div :class="'card ' + pokemon.types[0].type.name">
                        <div class="card__header">
                            <div class="card__image">
                                <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name">
                            </div>
                            <div class="card__number">
                                #{{ pokemon.order | padStart }}
                            </div>
                        </div>
                        <div class="card__body">
                            <div class="card__name">
                                {{ pokemon.name }}
                            </div>
                            <div class="card__category">
                                <span v-for="(type, indextype) in pokemon.types" :key="indextype"
                                    :class="'icon__' + type.type.name">
                                </span>
                            </div>
                        </div>
                        <div class="card__footer"></div>
                    </div>
                </a>
            </div>
        </div>
        <loading :loading="loading"></loading>
    </div>
</template>
<script>
import { getPokemons, getPokemon, getTypes } from '../services/pokemon-service';
import Loading from './Loading.vue';
export default {
    components: {
        Loading
    },
    data() {
        return {
            loading: false,
            nextPage: null,
            search: '',
            pokemons: [],
            categorySelected: 'Show All',
            filteredPokemon: [],
            categories: [
                { name: 'Show All', url: '' },
            ],
        };
    },
    filters: {
        padStart: function (value) {
            return value.toString().padStart(3, '0');
        }
    },
    watch: {
        search(newValue) {
            if (newValue) {
                const selectedCategory = this.categorySelected;
                this.filteredPokemon = this.filteredPokemon.filter(pokemon => {
                    return pokemon.name.toLowerCase().includes(newValue.toLowerCase()) ||
                        pokemon.order == newValue ||
                        selectedCategory === pokemon.types.some(type => type.type.name === newValue);
                });
            } else {
                this.filteredPokemon = this.pokemons;
            }
        },
        categorySelected(newValue) {
            this.loading = true;
            if (newValue) {
                this.filterType(newValue);
            } else {
                this.filteredPokemon = this.pokemons;
                this.loading = false;
            }
        },
    },
    methods: {
        async pokemonSelected() {
            try {
                this.filteredPokemon = [];
                const { data } = await getPokemon(this.search);
                this.filteredPokemon.push(data);
            } catch (error) {
                console.log(error);
            }
        },
        async filterTypePokemon(pokemon) {
            try {
                const { data } = await getPokemons(pokemon);
                this.filteredPokemon.push(data);
            } catch (error) {
                console.log(error);
            }
        },
        async filterType(url) {
            try {
                this.loading = true;
                this.filteredPokemon = [];
                const { data } = await getTypes(url);
                data.pokemon.forEach(pokemon => {
                    this.filterTypePokemon(pokemon.pokemon.url);
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        async loadPokemons() {
            try {
                this.loading = true;
                const { data } = await getPokemons(this.nextPage);
                this.nextPage = data.next;
                data.results.forEach(pokemon => {
                    this.descriptionPokemon(pokemon.url);
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        infiniteLoading() {
            window.onscroll = () => {
                const listContainer = document.querySelector('.list__container');
                const listContainerHeight = listContainer.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollHeight = window.scrollY;
                if (scrollHeight + windowHeight >= listContainerHeight) {
                    this.loadPokemons();
                }
            };
        },
        async pokemonsTypes() {
            try {
                const { data } = await getTypes();
                this.categories = [...this.categories, ...data.results];
            } catch (error) {
                console.log(error);
            }
        },
        async pokemonsList() {
            try {
                this.loading = true;
                const { data } = await getPokemons();
                this.nextPage = data.next;
                data.results.forEach(pokemon => {
                    this.descriptionPokemon(pokemon.url);
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
                this.filteredPokemon = this.pokemons;
            }
        },
        async descriptionPokemon(pokemon) {
            try {
                const { data } = await getPokemons(pokemon);
                if (!this.pokemons.some(p => p.id === data.id)) {
                    this.pokemons.push(data);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        document.body.classList.add('list-background');
    },
    mounted() {
        this.pokemonsList();
        this.pokemonsTypes();
        this.infiniteLoading();
    },
}
</script>
<style scoped>
a {
    text-decoration: none;
}
</style>
