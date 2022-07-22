<template>
    <div class="wrapper" v-if="pokemon">
        <div class="block">
            <div class="block__image">
                <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name">
            </div>
            <div class="block__name">
                <h2>#{{ pokemon.order | padStart }} {{ pokemon.name }}</h2>
            </div>
        </div>
        <div class="card">
            <div class="card__title">
                <h2>Descrição</h2>
                <hr>
            </div>
            <div class="card__description">
                <p>{{ description.flavor_text_entries[0].flavor_text | replaceCharacter }}</p>
                <div class="card__types">
                    <div class="card__type" v-for="(type, indextype) in pokemon.types" :key="indextype">
                        <div :class="'icon icon__' + type.type.name"></div>
                        {{ type.type.name }}
                    </div>
                </div>
            </div>
            <div class="card__statistics">
                <h2>Estatistica</h2>
                <hr>
                <div class="card__statistic">
                    <div class="card__stat" v-for="(stat, index) in pokemon.stats" :key="index">
                        <span class="card__statname">{{ stat.stat.name | filterName }}</span>
                        <span class="card__basestat">
                            <input type="range" :value="stat.base_stat" id="range"
                                :style="`background-size:${stat.base_stat}% 100%;`" disabled />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDescription, getPokemon } from '../services/pokemon-service';

export default {
    data() {
        return {
            description: {},
            pokemon: {},
        }
    },
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    filters: {
        replaceCharacter(value) {
            return value.replace('', '');
        },
        padStart: function (value) {
            return value.toString().padStart(3, '0');
        },
        filterName(value) {
            switch (value) {
                case 'hp':
                    return 'HP';
                case 'attack':
                    return 'ATK';
                case 'defense':
                    return 'DEF';
                case 'special-attack':
                    return 'SpP';
                case 'special-defense':
                    return 'SpD';
                case 'speed':
                    return 'spd';
                default:
                    return value;
            }
        },
    },
    mounted() {
        this.getPokemonValues();
    },
    created() {
        document.body.classList.add('list-background');
    },
    methods: {
        async getPokemonValues() {
            this.loading = true;
            Promise.all([getPokemon(this.id), getDescription(this.id)])
                .then(([pokemon, description]) => {
                    this.pokemon = pokemon.data;
                    this.description = description.data;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
}

hr {
    border: 2px solid #F08030;
}

.icon {
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
}

input,
output {
    display: inline-block;
    vertical-align: middle;
    font-size: 1em;
    font-family: Arial, sans-serif;
}

output {
    background: #F08030;
    padding: 5px 16px;
    border-radius: 3px;
    color: #fff;
}

input[type="range"] {
    -webkit-appearance: none;
    margin-right: 15px;
    width: 220px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    background-image: linear-gradient(#F08030, #F08030);
    background-size: 70% 100%;
    background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    display: none;
}

input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #F08030;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
}

input[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #F08030;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
    background: #ff0200;
}

input[type="range"]::-moz-range-thumb:hover {
    background: #ff0200;
}

input[type="range"]::-ms-thumb:hover {
    background: #ff0200;
}

input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}

input[type=range]::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}

input[type="range"]::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}

* {
    cursor: default !important;
}

.card {
    background: #2C2C2D;
    box-shadow: 0 0 10px #000000;
    margin-bottom: 0;
    color: white;
    text-align: center;
    padding: 0;
    z-index: -1;

    &__stat {
        display: flex;
        align-items: center;
        margin-bottom: 17px;
    }

    &__types {
        display: flex;
        margin-bottom: 20px 0;
    }

    &__type {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    &__statname {
        font-weight: 700;
        font-size: 20px;
        line-height: 10px;
        display: flex;
        width: 50px;
        margin-right: 10px;
        align-items: center;
        text-align: right;
    }

    &__description {
        padding: 0 20px;
    }

    &__statistic {
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.block {
    background: url(../images/description.svg);
    background-size: cover;
    background-repeat: no-repeat;
    height: 258px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__image {
        display: flex;
        align-items: center;

        img {
            width: 200px;
            height: 200px;
        }
    }

    &__name {
        h2 {
            font-family: 'Fira Code';
            font-style: normal;
            font-weight: 700;
            font-size: 30px;
            line-height: 10px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #FFFFFF;
        }
    }
}

@media (min-width: 768px) {
    .card {
        margin: 0;
        width: 100%;

        &__statistic {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .block {
        width: 100%;
    }
}

@media (min-width: 1230px) {
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        place-content: space-evenly;

        &::after {
            background: url(../images/description-desk.svg);
            background-size: contain;
            background-position: bottom;
            background-repeat: no-repeat;
            content: "";
            position: fixed;
            top: 20px;
            left: 0;
            width: 100vw;
            height: 100%;
            z-index: -1;

        }
    }

    .card {
        width: 420px;
        margin-top: 6px;
        padding-top: 15px;
        margin-right: 150px;
        z-index: 0;

        &__types {
            margin: 35px 0;
        }

        &__title {
            h2 {
                margin-bottom: 12px;
            }
        }
    }

    .block {
        background: none;
        width: 420px;
        padding: 50px 0 0 110px;

        &__name {
            h2 {
                font-size: 45px;
            }
        }

        &__image {
            img {
                width: 350px;
                height: 350px;
            }
        }
    }

}
</style>
