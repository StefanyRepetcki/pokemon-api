<template>
    <div class="container">
        <div class="content">
            <div class="block">
                <div class="block__title">
                    <h2>Pokemon</h2>
                </div>
                <div class="block__text">
                    <h4>Pokémon é uma série de jogos eletrônicos desenvolvidos pela Game Freak e publicados pela
                        Nintendo como parte da franquia de mídia Pokémon. </h4>
                </div>
                <div class="block__actions">
                    <a class="button" href="#/list">Procure seu Pokemon</a>
                </div>
            </div>
            <div class="block">
                <div class="block__carousel">
                    <div class="carousel" id="carousel">
                        <div class="carousel__item">
                            <img src="../images/blastoise.webp" alt="Pokemon blastoise">
                        </div>
                        <div class="carousel__item">
                            <img src="../images/charizard.webp" alt="Pokemon charizard">
                        </div>
                        <div class="carousel__item">
                            <img src="../images/venusaur.webp" alt="Pokemon venusaur">
                        </div>
                    </div>
                    <div class="controller">
                        <ul>
                            <li class="controller__item controller__item--active" id="selectBlastoise">
                            </li>
                            <li class="controller__item" id="selectCharizard">
                            </li>
                            <li class="controller__item" id="selectVenusaur">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container__background"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        this.carousel();
    },
    methods: {
        transitionItem(index) {
            const dots = document.querySelectorAll(".controller__item");
            const carousel = document.getElementById("carousel");
            dots.forEach((dot) => {
                dot?.classList.remove("controller__item--active");
            });
            dots[index]?.classList.add("controller__item--active");
            if (carousel) {
                carousel.style.top = `-${index * 90}%`;
            }
        },
        carousel() {
            const dots = document.querySelectorAll(".controller__item");
            const activeDot = document.querySelector(".controller__item--active");
            const index = Array.from(dots).indexOf(activeDot) + 1;
            let counter = index;
            const referenceThis = this;
            window.intervalLoop = setInterval(function () {
                if (counter === dots.length) {
                    counter = 0;
                }
                referenceThis.transitionItem(counter);
                counter++;
            }, 5000);

            dots.forEach((dot, index) => {
                dot.addEventListener("click", () => {

                    this.transitionItem(index);
                    if (window.intervalLoop !== null) {
                        clearInterval(window.intervalLoop);
                        this.carousel();
                    }
                })
            });
        }
    },
}
</script>