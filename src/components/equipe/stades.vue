<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="bodyy"><br>
    <h2>Stades</h2>
    <div class="boxy">
      <div class="filter-nav">
        <div class="filter-container">
          <label for="nomStadeFilter">Rechercher par nom de stade :</label>
          <input type="text" v-model="nomStade" @input="filterStades" placeholder="Entrez le nom du stade">
        </div>
        <div class="filter-container">
          <label for="villeFilter">Choisir une ville :</label>
          <select v-model="selectedVille" @change="filterStades">
            <option value="">Toutes les villes</option>
            <option v-for="ville in villes" :value="ville">{{ ville }}</option>
          </select>
          <div class="select-icon">
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
        <div class="filter-container">
          <label for="prixFilter">Choisir un prix de réservation :</label>
          <select v-model="selectedPrix" @change="filterStades">
            <option value="">Tous les prix</option>
            <option v-for="prix in prixOptions" :value="prix.value">{{ prix.label }}</option>
          </select>
          <div class="select-icon">
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
        <div class="filter-container">
          <label for="noteFilter">Choisir un nombre d'etoile :</label>
          <select v-model="noteMinimale" @change="filterStades">
            <option value="">Toutes</option>
            <option value="1">1 Etoile</option>
            <option value="2">2 Etoiles</option>
            <option value="3">3 Etoiles</option>
            <option value="4">4 Etoiles</option>
            <option value="5">5 Etoiles</option>
          </select>
          <div class="select-icon">
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div class="stades-container">
        <div v-if="stades.length === 0" class="empty-message">
          <p class="pp">Aucun stade enregistré pour le moment.</p>
        </div>
        <div v-else class="grid_it">
          <div v-for="(stade, index) in stades" :key="index" class="stade-card">
            <div class="stade-info">
              <div class="stade-image">
                <div v-if="stade.images && stade.images.length > 0" class="image-grid">
                  <div v-for="(image, i) in stade.images" :key="i" class="image-item">
                    <img :src="image.url" alt="Stade Image">
                  </div>
                </div>
              </div>
              <div class="stade-details">
                <h3>{{ stade.stadiumName }}</h3>
                <p><strong>Ville:</strong> {{ stade.ville }}</p>
                <p><strong>Prix de réservation:</strong> {{ stade.reservationPrice }} dt</p>
                <p class="norating"><strong class="noteflex">note de stade:</strong>
                <p v-if="stade.sovote / stade.nbvote"><star-rating class="star" :rating="stade.sovote / stade.nbvote"
                    :read-only="true" :increment="0.01" :star-size="25" :show-rating="false"
                    active-color="#fa8e01"></star-rating></p>
                <p v-else class="norating"><star-rating class="star" :rating="0" :read-only="true" :increment="0.01"
                    :star-size="25" :show-rating="false"></star-rating><span>(Pas encore note)</span></p>
                </p>
                <button v-if="storedType == 'equipe'" @click="reserver(stade)">Réserver</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";

}

.boxy {
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 20px;
}

.kk {
  padding: 20px;
  width: 100%;
}

h2 {
  color: #00f2ff;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

.filter-nav {
  padding: 20px;
  background: #007E85;
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 20px;
  border-radius: 4px;
}

.filter-container {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.bodyy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.stades-container .grid_it {
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.stade-card {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: #007E85;
  width: 600px;
  box-shadow: 7px 9px rgba(0, 0, 0, .2);
  box-shadow: 12px 20px 24px rgba(255, 255, 255, 0.08);
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  border-radius: 4px;
  box-shadow: 0 0.125rem #0a0a0a0a;
  font-family: 'poppins';
}

.stade-card h3 {
  color: #757B8D;
  color: #FF8A44;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: "poppins" bold;
}

.stade-card strong {
  color: #777;
  color: #00C6B7;
  color: #f0df46;
  color: #F9F871;

}

.filter-container label {
  font-family: "poppins";
  font-size: 16px;
  font-weight: 600;

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
}

.stade-card p {
  color: #fff;
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
  top: 45px;
  display: flex;
  justify-content: center;

  align-items: center;
}

.select-icon i {

  color: #2E2F32;
}

.image-item img {
  width: 100%;
  height: 550px;
  object-fit: cover;
  border-radius: 4px;
}



.empty-message {
  color: #777;
}

button {
  background-color: #eec80b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ffa500;
}

.stade-info {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.stade-image {
  color: #fff;
  position: relative;
  width: 100%;
  border-radius: 4px;

}

.stade-image::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
}

.stade-details {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.norating {
  display: flex;
  flex-wrap: nowrap;
}

.star {
  margin-left: 10px;
  margin-top: -4px;
}

.filter-container input[type="text"] {
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  font-family: "poppins";
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
}


@media only screen and (max-width: 600px) {

  .kk {
    padding: 10px;
    /* Réduisez l'espacement en haut et en bas */
  }

  .boxy {
    flex-direction: column;
    /* Changez la direction de la flexbox en colonne */
    gap: 10px;
    /* Réduisez l'espace entre les éléments */
    padding: 10px;
    /* Réduisez le rembourrage */
  }

  .stades-container .grid_it {
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    width: 100%;
  }

  h2 {
margin-top: 10px;    /* Réduisez la taille de la police */
  }

  .filter-nav {
    padding: 10px;
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

  .stade-card h3 {
    font-size: 16px;
    /* Réduisez la taille de la police */
  }

  .stade-info {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Changez la direction de la flexbox en colonne */
  }
  .stade-details{
    padding: 0px;
  }
  .stade-details button{
    padding: 5px;
  }
  .norating span{
    font-size: 0.6rem;
    margin-top: 6px;
  }
  .norating{
    font-size: 0.9rem
  }
  .image-item img {
    height: 250px;
    width: 100%;
  }
}
</style>

<script>
import { db, storage } from "../../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import StarRating from 'vue-star-rating'

export default {
  name: "Stades",
  components: {
    StarRating
  },
  data() {
    return {
      noteMinimale: '',
      stades: [],
      storedType: '',
      selectedVille: '',
      selectedPrix: '',
      nomStade: '', // Add this line
      villes: ['zarzis', 'mednine', 'jerbe', 'gabes', 'sfax'],
      prixOptions: [
        { label: 'Moins de 50 DT', value: '<50' },
        { label: '50 - 100 DT', value: '50-100' },
        { label: 'Plus de 100 DT', value: '>100' }
      ],
      intervalleNote: '',
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    await this.fetchStades();
    await this.fetchImagesForStades();
    await this.$store.dispatch('fetchUserDetails');
    this.storedType = this.userDetails?.photoURL ?? '';
  },
  methods: {
    async fetchStades() {
      const colRef = collection(db, 'proprietaire');
      const querySnapshot = await getDocs(colRef);
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        this.stades.push(doc.data());
      });
      const villesAvecStades = this.stades.map(stade => stade.ville);
      this.villes = [...new Set(villesAvecStades)];
    },
    async fetchImagesForStades() {
      for (let i = 0; i < this.stades.length; i++) {
        const stade = this.stades[i];
        const imagesRef = ref(storage, `Stades/${stade.stadiumName}/`);
        await listAll(imagesRef).then(async (res) => {
          if (res.items.length > 0) {
            const firstImage = res.items[0];
            const imageUrl = await getDownloadURL(firstImage);
            this.stades[i].images = [{ url: imageUrl }];
          }
        }).catch((error) => {
          console.error('Error getting uploaded images:', error);
        });
      }
    },

    reserver(stade) {
      this.$router.push({ path: 'reserver', query: { stade: stade.stadiumName } });
    },

    async filterStades() {
      this.stades = [];
      const colRef = collection(db, 'proprietaire');
      const querySnapshot = await getDocs(colRef);
      querySnapshot.forEach(async (doc) => {
        const stade = doc.data();
        const noteStade = stade.sovote / stade.nbvote;
        if ((!this.selectedVille || stade.ville === this.selectedVille) &&
          (!this.selectedPrix || this.checkPrice(stade.reservationPrice)) &&
          (this.noteMinimale === '' || noteStade >= parseInt(this.noteMinimale)) &&
          (!this.nomStade || stade.stadiumName.toLowerCase().includes(this.nomStade.toLowerCase()))) { // Add this condition
          this.stades.push(stade);
        }
      });
      await this.fetchImagesForStades();
    },
    checkPrice(reservationPrice) {
      if (this.selectedPrix === '<50') {
        return reservationPrice < 50;
      } else if (this.selectedPrix === '50-100') {
        return reservationPrice >= 50 && reservationPrice <= 100;
      } else if (this.selectedPrix === '>100') {
        return reservationPrice > 100;
      }
      return true;
    }
  }
}
</script>