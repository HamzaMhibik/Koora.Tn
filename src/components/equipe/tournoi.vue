<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="bodyy">
    <h2>Liste des Tournois </h2>
    <div class="boxy">
      <div class="filter-nav">
        <div class="filter-container">
          <div class="a1">
            <label for="">Ville:</label>
            <div class="select-icon">
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <select v-model="selectedCity">
              <option value="">Toutes les villes</option>
              <option v-for="city in cities" :value="city">{{ city }}</option>
            </select>
          </div>
          <div class="a1">
            <label for="">Etat:</label>
            <div class="select-icon">
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <select v-model="selectedState">
              <div class="select-icon">
                <i class="fa-solid fa-caret-down"></i>
              </div>
              <option value="">Tous les états</option>
              <option value="en_cours">En cours</option>
              <option value="pas_encore">Pas encore débuté</option>
            </select>
          </div>
        </div>
      </div>
      <div class="tournois-container">
        <div v-for="tournoi in filteredTournois" :key="tournoi.id" class="tournoi">
          <div class="images-container">
            <div class="border1">{{ tournoi.nom_tournoi }}</div>
            <center><img class="img" v-for="(image, index) in tournoi.images" :src="image.url"
                :alt="'Image ' + (index + 1)"></center>
          </div>
          <div class="tournoi-details">
            <p><strong>Stade: </strong><span @click="voir(tournoi)" class="stade">{{ tournoi.nom_stade
                }}</span></p>
            <p class="date-debut"><strong>Date de début:</strong> {{ tournoi.date_debut }}</p>
            <p><strong>ville:</strong> {{ tournoi.ville }}</p>
            <p><strong>prix d'inscription:</strong> {{ tournoi.frais_inscription }} Dt</p>
            <div v-if="new Date(tournoi.date_debut) > dateActuelle">
              <p>pas encore debuté</p>
              <button v-if="storedType === 'equipe'" @click="participer(tournoi.id)">Voir le tournoi</button>
            </div>
            <p v-if="new Date(tournoi.date_fin) < dateActuelle">terminé</p>
            <p v-if="new Date(tournoi.date_fin) > dateActuelle && new Date(tournoi.date_debut) < dateActuelle">en cours
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.boxy {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.border1 {
  border-bottom-right-radius: 10px;
  height: 30px;
  width: 130px;
  background: #F9F871;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  color: #2F4858;
  text-align: center;
  position: relative;
  transform: skew(-40deg);
  box-shadow: -10px -10px 0 0 #F9F871;
}

.select-icon {
  cursor: pointer;
  border-radius: 4rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0;
  top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-icon i {
  color: #2E2F32;
}

.tournois-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}

.tournois-container h4 {
  color: #FF8A44;
  font-weight: 700;
}

select {
  position: relative;
}

.tournoi-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tournoi-details strong {
  color: #F9F871;
}

.tournoi-details span,
.tournoi-details p {
  color: #fff;
}

.tournoi {
  max-width: 400px;
  max-height: 600px
}

.images-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.images-container {
  gap: 20px;
  position: relative;
}

.images-container h3 {
  position: absolute;
  bottom: 50px;
  right: 10px;
  background: #222831;
  color: #fff;
  font-weight: 900;
  font-size: 0.9rem;
  padding: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  border-radius: 1rem 1rem 2rem 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 15px 0px;
}

.tournoi {
  background: #007E85;
  padding: 20px;
  border-radius: 0.7rem;
  border-top-right-radius: 4rem;
}

.img {
  max-width: 100%;
  position: relative;
  width: 75%;
  height: 230px;
  border-radius: 0.7rem;
}

h2 {
  margin-top: 20px;
  color: #00f2ff;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

.date-debut {
  margin-top: 4px;
}

.a1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-nav {
  padding: 20px;
  background: #007E85;
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 10px;
  border-radius: 4px;
  min-height: 100vh;
  /* Ajoutez cette ligne */
}

.filter-container {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

select {
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  font-family: "poppins";
  font-size: 16px;
  font-weight: 500;
  position: relative;
  appearance: none;
  border-radius: 4px;
  cursor: pointer;
}

button {
  background-color: #ff6347;
  /* Couleur de fond */
  color: white;
  /* Couleur du texte */
  padding: 8px 16px;
  /* Espacement intérieur */
  border: none;
  /* Suppression de la bordure */
  border-radius: 4px;
  /* Arrondi des coins */
  cursor: pointer;
  /* Curseur au survol */
  transition: background-color 0.3s;
  /* Transition en cas de changement de couleur de fond */
}

button:hover {
  background-color: #d14836;
  /* Changement de couleur de fond au survol */
}

.stade {
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
}

/* Ajoutez ce code à la fin de votre fichier CSS */

@media only screen and (max-width: 600px) {
  /* Appliquez les styles pour les écrans de 600px de largeur ou moins */

  .kk {
    padding: 10px;
    /* Réduisez l'espacement en haut et en bas */
  }

  .boxy {
    flex-direction: column;
    /* Changez la direction de la flexbox en colonne */
    gap: 10px;
    /* Réduisez l'espace entre les éléments */
    padding: 20px;
    /* Réduisez le rembourrage */
  }

  h2 {
    font-size: 28px;
    /* Réduisez la taille de la police */
  }

  .filter-nav {
    padding: 20px;
    min-height: 30vh;
    max-height: 35vh;
    /* Réduisez le rembourrage */
  }

  .filter-container {
    width: 100%;
    /* Réglez la largeur à 100% */
  }

  select {
    width: 100%;
    /* Réglez la largeur à 100% */
  }

  .tournoi {
    max-width: 100%;
    /* Réglez la largeur à 100% */
  }

  .tournoi-details {
    flex-direction: column;
    /* Changez la direction de la flexbox en colonne */
    gap: 10px;
    /* Ajoutez un espace entre les éléments */
  }

  .img {
    width: 50%;
    height: auto;
    /* Assurez-vous que les images sont redimensionnées correctement */
  }

  .stade {
    font-size: 16px;
    /* Réduisez la taille du texte */
  }
}
</style>

<script>
import { db, storage } from "../../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  name: 'ListeTournois',
  data() {
    return {
      tournois: [],
      selectedCity: '',
      selectedState: '',
      cities: [],
      dateActuelle: new Date(),
      storedType: ''
    }
  },
  computed: {
    filteredTournois() {
      let filtered = this.tournois;

      // filtrer par ville
      if (this.selectedCity !== '') {
        filtered = filtered.filter(tournoi => tournoi.ville === this.selectedCity);
      }

      // filtrer par état
      if (this.selectedState === 'en_cours') {
        filtered = filtered.filter(tournoi => new Date(tournoi.date_debut) < this.dateActuelle && new Date(tournoi.date_fin) > this.dateActuelle);
      } else if (this.selectedState === 'termine') {
        filtered = filtered.filter(tournoi => new Date(tournoi.date_fin) < this.dateActuelle);
      } else if (this.selectedState === 'pas_encore') {
        filtered = filtered.filter(tournoi => new Date(tournoi.date_debut) > this.dateActuelle);
      }
      return filtered;
    },
    userDetails() {
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    await this.getTournois();
    await this.$store.dispatch('fetchUserDetails');
    this.storedType = this.userDetails?.photoURL ?? '';
  },
  methods: {
    async getTournois() {
      try {
        const tournoisSnapshot = await getDocs(collection(db, "tournois"));
        for (const doc of tournoisSnapshot.docs) {
          const tournoiData = doc.data();
          const images = await this.getImagesForTournoi(tournoiData.nom_tournoi, tournoiData.nomstade); // Déplacer cette ligne au-dessus de l'ajout d'objet
          this.tournois.push({
            id: doc.id,
            nom_tournoi: tournoiData.nom_tournoi,
            nom_stade: tournoiData.nomstade,
            date_debut: tournoiData.date_debut,
            date_fin: tournoiData.date_fin,
            categorie: tournoiData.categorie,
            description: tournoiData.description,
            frais_inscription: tournoiData.frais_inscription,
            nb_equipes_max: tournoiData.nb_equipes_max,
            conditions_speciales: tournoiData.conditions_speciales,
            email: tournoiData.email,
            ville: tournoiData.ville,
            images: images // Utiliser les images récupérées
          });
        }
        // Obtenez les villes uniques à partir des tournois récupérés
        this.cities = Array.from(new Set(this.tournois.map(tournoi => tournoi.ville)));
      } catch (error) {
        console.error("Erreur lors de la récupération des tournois : ", error);
      }
    },

    async getImagesForTournoi(nomtournoi, nomstade) {
      const imagesRef = ref(storage, `tournois/${nomstade}/${nomtournoi}`);
      const imageUrls = [];
      const imageList = await listAll(imagesRef);
      for (const imageRef of imageList.items) {
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push({ url: imageUrl });
      }
      return imageUrls;
    },
    voir(tournoi) {
      if (this.storedType == 'equipe') {
        this.$router.push({ path: 'reserver', query: { stade: tournoi.nom_stade } });
      }
    },
    participer(tournoiId) {
      this.$router.push({ path: 'participer', query: { id: tournoiId } });
    }
  }
}
</script>
