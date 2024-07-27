<template>
  <div class="bodyy">
    <h2>Liste des équipes</h2>
    <div class="boxy">
      <div class="filter-nav">
        <div class="search-bar">
          <label for="recherche">Rechercher</label>
          <input type="text" v-model="searchQuery" placeholder="Rechercher une équipe par son nom" class="recherche"
            name="recherche">
        </div>
        <div class="filter-container">
          <label for="ville">Filtrer par ville :</label>
          <select id="ville" v-model="selectedVille">
            <option value="">Toutes les villes</option>
            <option v-for="ville in villes" :value="ville">{{ ville }}</option>
          </select>
        </div>
      </div>
      <div class="grid_it_1">
        <div v-for="equipe in filteredEquipes" :key="equipe.id" class="equipe-card">
          <div class="equipe-info">
            <div class="logo-container">
              <img :src="equipe.logoUrl" alt="Logo de l'équipe" class="logo">
            </div>
            <div class="info-container">
              <div class="info">
                <h2>{{ equipe.nomEquipe }}</h2>
                <p><strong>Capitaine :</strong> {{ equipe.nomCapitaine }}</p>
                <p><strong>Ville :</strong> {{ equipe.ville }}</p>
                <p><strong>Numéro :</strong> {{ equipe.telephone }}</p>
              </div>
            </div>
          </div>
          <div class="joueurs-container">
            <p><strong>Joueurs :</strong></p>
            <ul class="listing joueurs-grid">
              <li v-for="(joueur, index) in equipe.joueurs" :key="index"><span class="strong">Joueur {{ index + 1
                  }}</span>:
                <span>{{ joueur }}</span>
              </li>
            </ul>
          </div>
          <div class="button-container">
            <button v-if="usertype === 'equipe'" class="defier-button" @click="defier(equipe)">Défier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 20px;
  color: #00f2ff;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  background-image: url('../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.boxy {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.grid_it_1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* Modifier pour afficher deux équipes par ligne */
  gap: 20px;
  width: 100%;
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

.recherche {
  width: 100%;
  background: #222831;
  padding: 15px;
  border: none;
  border-radius: 4px;
  outline: none;
  height: 40px;
  color: #A5ACB7;
  font-size: 15px;
  font-weight: 500;
  font-family: "poppins";
}

.search-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equipe-card {
  display: grid;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  background: #007E85;
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equipe-info h2,
.joueurs-container strong {
  font-size: 1.7rem;
  font-family: 'poppins';
  font-weight: 700;
  color: #ffa500;
  color: #00C9DF;
}

.equipe-info strong {
  color: #eec80b;
}

.equipe-info p {
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  font-family: 'poppins';
}

.equipe-info ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.listing li {
  color: #eec80b;
}

.listing li span {
  color: #fff;
}

.strong {
  color: #eec80b !important;
}

label {
  display: block;
}

select {
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
}

option {
  padding: 5px;
}

.defier-button {
  background-color: #3682f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.equipe-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.equipe-card {
  display: flex;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 200px;
  border-radius: 20%;
}

.info-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.joueurs-container {
  width: 100%;
}

.button-container {
  display: flex;
  align-items: center;
}

.joueurs-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
}

/* Pour les écrans jusqu'à 768px de largeur */
@media (max-width: 768px) {
  .logo {
    width: 120px;
    height: 120px;
  }

  .joueurs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid_it_1 {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    width: 100%;
  }

  .bodyy {
    padding: 10px;
  }

  .kk {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .boxy {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .search-bar {
    padding: 5px;
  }

  .recherche {
    padding: 10px;
    font-size: 14px;
  }

  .filter-container {
    width: 100%;
  }

  .equipe-card {
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
    gap: 0px;
  }

  .equipe-info h2,
  .joueurs-container strong {
    font-size: 1.8rem;
  }

  .listing li span {
    font-size: 15px;
  }

  .defier-button {
    padding: 8px 16px;
    font-size: 14px;
  }

  .button-container {
    padding: 10px;
  }

  .info h2 {
    margin-left: -110px;
  }
  .logo-container{
    margin-top: 60px
  }
}
</style>


<script>
import { db, storage } from "../firebase/firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";


export default {
  name: 'ListeEquipes',
  data() {
    return {
      equipes: [],
      villes: [],
      selectedVille: '',
      searchQuery: '',
      user: null,
      unsubscribe: null,
      usertype: null
    }
  },
  async created() {
    try {
      const equipeCollection = collection(db, 'equipes');
      const resultat = await getDocs(equipeCollection);
      const equipes = [];
      const villes = new Set(); // Utiliser un ensemble pour éviter les doublons de villes
      for (const doc of resultat.docs) {
        const equipeData = doc.data();
        const logoUrl = await this.getLogoUrl(equipeData.nomEquipe);
        equipes.push({ id: doc.id, ...equipeData, logoUrl });
        villes.add(equipeData.ville); // Ajouter la ville à l'ensemble
      }
      this.equipes = equipes;
      this.villes = Array.from(villes); // Convertir l'ensemble en tableau
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes : ", error);
    }
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    filteredEquipes() {
      // Filtrer les équipes en fonction de la ville sélectionnée et de la requête de recherche
      let filtered = this.equipes;

      if (this.selectedVille !== '') {
        filtered = filtered.filter(equipe => equipe.ville === this.selectedVille);
      }

      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.trim().toLowerCase();
        filtered = filtered.filter(equipe => equipe.nomEquipe.toLowerCase().includes(query));
      }

      return filtered;
    }
  },
  async mounted() {
    this.usertype = this.userDetails?.photoURL ?? '';
  },
  methods: {
    async getLogoUrl(nom) {
      const logoRef = ref(storage, `logos/${nom}/`);
      try {
        return await getDownloadURL(logoRef);
      } catch (error) {
        console.error("Erreur lors de la récupération du logo : ", error);
        return '';
      }
    },
    async defier(equipe) {
      Swal.fire({
        title: `Defier ${equipe.nomEquipe} ?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Defier",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ path: 'defierEquipe', query: { ville: equipe.ville, nomEquipe: equipe.nomEquipe } });
        } else if (result.isDenied) {
        }
      });
    }
  }
}
</script>