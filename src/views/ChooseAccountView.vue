<template>
  <div class="bodyy">
    <br><br>
    <div class="section-grid">
      <!-- Section for Terrain Owners -->
      <section class="section c-button--gooey">
        <div class="section-header">
          <h2>Pour les Propriétaires de <br>Terrains</h2>
        </div>
        <div class="animated">
          <div class="infi">
            <p> Enregistrez votre stade </p>
            <p> Gérez les réservations </p>
            <p> Créez des tournois </p>
            <p> Rejoignez notre réseau de passionnés de football </p>
          </div>
          <div class="butto">
            <a class="cta-button" @click="creeProprietaire">Inscrivez votre stade</a>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo">
                </feColorMatrix>
                <feBlend in="SourceGraphic" in2="goo"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
      </section>
      <!-- Section for Team Captains -->
      <section class="section c-button--gooey">
        <div class="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="section-header">
          <h2>Pour les Capitaines <br>d'Équipe.</h2>
        </div>
        <div class="animated">
          <div class="infi">
            <p>Créez un compte pour votre équipe</p>
            <p>Explorez les stades disponibles</p>
            <p>Réservez des matchs</p>
            <p>Participez à des tournois excitants</p>
            <p>Personnalisez et modifiez le compte de votre équipe</p>
            <p>Défiez d'autres équipes</p>
            <p>Postez des demandes de recrutement de joueurs</p>
            <p>Donnez des notes aux stades</p>
            <p>Donnez votre avis pour chaque stade en laissant un commentaire</p>
          </div>
          <div class="butto">
            <a class="cta-button" @click="creeEquipe">Créez votre équipe</a>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo">
                </feColorMatrix>
                <feBlend in="SourceGraphic" in2="goo"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
      </section>
      <!-- Section for Players Searching for a Team -->
      <section class="section c-button--gooey">
        <div class="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="section-header">
          <h2>Pour les Joueurs en Recherche d'Équipe</h2>
        </div>
        <div class="animated">
          <div class="infi">
            <p>Créez un compte joueur pour trouver une équipe</p>
            <p>Accédez aux demandes de recrutement des équipes avec la possibilité de postuler</p>
          </div>
          <div class="butto">
            <a class="cta-button" @click="creeJoueur">Rejoignez une équipe</a>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo">
                </feColorMatrix>
                <feBlend in="SourceGraphic" in2="goo"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
      </section>
    </div>
    <center>
      <div class="mobile">
        <Carousel :items-to-show=1 :wrap-around="true" :autoplay="5000">
          <Slide v-for="slide in 3" :key="slide">
            <div v-if="slide == 1">
              <section class="section c-button--gooey" style="height: 800px;">
                <div class="section-header">
                  <h2>Pour les Propriétaires de <br>Terrains</h2>
                </div>
                <div class="animated">
                  <div class="infi">
                    <p> Enregistrez votre stade </p>
                    <p> Gérez les réservations </p>
                    <p> Créez des tournois </p>
                    <p> Rejoignez notre réseau de passionnés de football </p>
                  </div>
                  <div class="butto">
                    <a class="cta-button" @click="creeProprietaire">Inscrivez votre stade</a>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                          result="goo"></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </section>
            </div>
            <div v-if="slide == 2">
              <section class="section c-button--gooey" style="height: 800px;">
                <div class="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="section-header">
                  <h2>Pour les Capitaines <br>d'Équipe.</h2>
                </div>
                <div class="animated">
                  <div class="infi">
                    <p>Créez un compte pour votre équipe</p>
                    <p>Explorez les stades disponibles</p>
                    <p>Réservez des matchs</p>
                    <p>Participez à des tournois excitants</p>
                    <p>Personnalisez et modifiez le compte de votre équipe</p>
                    <p>Défiez d'autres équipes</p>
                    <p>Postez des demandes de recrutement de joueurs</p>
                    <p>Donnez des notes aux stades</p>
                    <p>Donnez votre avis pour chaque stade en laissant un commentaire</p>
                  </div>
                  <div class="butto">
                    <a class="cta-button" @click="creeEquipe">Créez votre équipe</a>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                          result="goo"></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </section>
            </div>
            <div v-if="slide == 3">
              <section class="section c-button--gooey" style="height: 800px;">
                <div class="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="section-header">
                  <h2>Pour les Joueurs en Recherche d'Équipe</h2>
                </div>
                <div class="animated">
                  <div class="infi">
                    <p>Créez un compte joueur pour trouver une équipe</p>
                    <p>Accédez aux demandes de recrutement des équipes avec la possibilité de postuler</p>
                  </div>
                  <div class="butto">
                    <a class="cta-button" @click="creeJoueur">Rejoignez une équipe</a>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                          result="goo"></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </section>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </center>
  </div>
</template>

<script>
import { auth } from "../firebase/firebase";
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      isMobile: window.innerWidth <= 760,
    };
  },
/*   created() {
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }, */
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      this.user = user;
      if (user) { this.$router.push('/'); }
    });
  },
  methods: {
    creeProprietaire() {
      this.$router.push({ path: '/account', query: { type: 'proprietaire' } });
    },
    creeEquipe() {
      this.$router.push({ path: '/account', query: { type: 'equipe' } });
    },
    creeJoueur() {
      this.$router.push({ path: '/account', query: { type: 'joueur' } });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";
}

.bodyy {
  min-height: 100vh;
  background-image: url('../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

.c-button--gooey {
  color: #06c8d9;
  letter-spacing: 2px;

  border-radius: 0;
  position: relative;
  transition: all 10s ease;
}

.c-button--gooey .c-button__blobs {
  height: 100%;
  filter: url(#goo);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -3px;
  right: -1px;
  z-index: -1;
}

.c-button--gooey .c-button__blobs div {
  background: #007E85;

  width: 34%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  transform: scale(1.4) translateY(125%) translateZ(0);
  transition: all 700ms ease;
  animation: fill_it ease 700ms 1;
}

@keyframes fill_it {
  0% {
    transform: scale(1.4) translateY(125%) translateZ(0);
  }

  100% {
    transform: scale(1.4) translateY(0) translateZ(0);
  }
}

.c-button--gooey .c-button__blobs div:nth-child(1) {
  left: -5%;
}

.c-button--gooey .c-button__blobs div:nth-child(2) {
  left: 30%;
  transition-delay: 60ms;
}

.c-button--gooey .c-button__blobs div:nth-child(3) {
  left: 66%;
  transition-delay: 25ms;
}

.c-button--gooey:hover {
  color: #fff;
}

.infi {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 20px;
}

.infi p {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
}

.section {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  flex: 1;
  /* Permet à la section de s'ajuster dynamiquement */
  gap: 20px;
  animation: bg 1400ms ease-in-out forwards;
}

@keyframes bg {
  to {
    background: #007E85;
  }
}

.animated {
  width: 100%;
  background: #007E85;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 1;
}


@keyframes liquid {
  0% {
    transform: translateY(-10%);
  }

  100% {
    transform: translateY(10%);
  }
}

.section-header {
  border-radius: 10px;
  background: #fff;
  height: 16em;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(0 0,
      100% 0,
      100% 90%,
      50% 100%,
      0 90%);

}

.section-header h2 {
  font-family: 'poppins' bold;
  font-weight: 700;

  color: #222831;
  font-size: 20px;
}

.section p {
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  background-color: #FF8A44;
  color: #fff;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.butto {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;

}

.cta-button:hover {
  background-color: #FFA566;
}

.section-grid {
  width: 100%;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  /* Toutes les sections auront la même hauteur (la hauteur de la plus grande section) */
}

.mobile {
  display: none;
}

@media screen and (max-width: 768px) {
  /* Vous pouvez ajuster la valeur 768px en fonction de vos besoins */

  .section-grid {
    display: none;
    /* Afficher les sections verticalement */
  }

  /* Réinitialiser la largeur maximale des sections pour les afficher en plein écran */
  .section {
    max-width: 100%;
    /* Réinitialiser la largeur maximale */
  }

  .mobile {
    display: block;
    width: 95%;
  }

}
</style>