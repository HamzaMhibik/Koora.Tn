<template>
  <div class="bodyy">
    <h2>Tournois</h2>
    <center><button @click="creertournoi" class="btn btn-primary">Creer tournoi</button>
      <div class="containers">
        <div class="section">
          <h3>Tournois en Cours</h3>
          <div class="tournois-container">
            <div v-for="tournoi in tournoisEnCours" :key="tournoi.id" class="tournoi">
              <div class="images-container">
                <center>
                  <h2 class="tname">{{ tournoi.nom_tournoi }}</h2>
                  <img class="img" v-for="(image, index) in tournoi.images" :src="image.url"
                    :alt="'Image ' + (index + 1)">
                </center>
              </div>
              <div class="tournoi-details">
                <p><strong>Date de début:</strong> {{ tournoi.date_debut }}</p>
                <p><strong>Nombre max d'équipes:</strong> {{ tournoi.nb_equipes_max }}</p>
                <center>
                  <strong>
                    <p class="pp">en cours</p>
                  </strong>
                  <button @click="Voir(tournoi.id)" class="btn btn-info">Voir</button>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <h3>Tournois Non Débutés</h3>
          <div class="tournois-container">
            <div v-for="tournoi in tournoisNonDebutes" :key="tournoi.id" class="tournoi">
              <div class="images-container">
                <center>
                  <h2 class="tname">{{ tournoi.nom_tournoi }}</h2>
                  <img class="img" v-for="(image, index) in tournoi.images" :src="image.url"
                    :alt="'Image ' + (index + 1)">
                </center>
              </div>
              <div class="tournoi-details">
                <p><strong>Date de début:</strong> {{ tournoi.date_debut }}</p>
                <p><strong>Nombre max d'équipes:</strong> {{ tournoi.nb_equipes_max }}</p>
                <center>
                  <strong>
                    <p class="pp">pas encore debuté</p>
                  </strong>
                  <table>
                    <tr>
                      <td class="tdd"><button @click="deleteTournoi(tournoi.id)"
                          class="btn btn-danger">Supprimer</button>
                      </td>
                      <td><button @click="Voir(tournoi.id)" class="btn btn-info">Voir</button></td>
                      <td><button @click="modifier(tournoi.id)" class="btn btn-success">Modifier</button></td>
                    </tr>
                  </table>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <h3 style="color: white;">Tournois Terminés</h3>
          <div class="tournois-container">
            <div v-for="tournoi in tournoisTermines" :key="tournoi.id" class="tournoi">
              <div class="images-container">
                <center>
                  <h2 class="tname">{{ tournoi.nom_tournoi }}</h2>
                  <img class="img" v-for="(image, index) in tournoi.images" :src="image.url"
                    :alt="'Image ' + (index + 1)">
                </center>
              </div>
              <div class="tournoi-details">
                <p><strong>Date de début:</strong> {{ tournoi.date_debut }}</p>
                <p><strong>Nombre max d'équipes:</strong> {{ tournoi.nb_equipes_max }}</p>
                <center>
                  <strong>
                    <p class="pp">terminé</p>
                  </strong>
                  <table>
                    <tr>
                      <td class="tdd"><button @click="deleteTournoi(tournoi.id)"
                          class="btn btn-danger">Supprimer</button>
                      </td>
                      <td><button @click="Voir(tournoi.id)" class="btn btn-info">Voir</button></td>
                    </tr>
                  </table>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import { db, storage, auth } from "../../firebase/firebase"; // Import db from init.js
import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import Swal from 'sweetalert2';

export default {
  name: 'ListeTournois',
  data() {
    return {
      tournois: [],
      email: '',
      dateActuelle: new Date(),
      userInfo: {},
      nomstade: '',
      user: null,
      unsubscribe: null,
      usertype: null,
      verifie: null
    }
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    tournoisTermines() {
      return this.tournois.filter(tournoi => new Date(tournoi.date_fin) < this.dateActuelle);
    },
    tournoisEnCours() {
      return this.tournois.filter(tournoi => new Date(tournoi.date_debut) < this.dateActuelle && new Date(tournoi.date_fin) > this.dateActuelle);
    },
    tournoisNonDebutes() {
      return this.tournois.filter(tournoi => new Date(tournoi.date_debut) > this.dateActuelle);
    }
  },
  async mounted() {
    await new Promise((resolve) => {
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) { this.$router.push('/'); resolve(); }
        else if (user.photoURL !== 'proprietaire') { this.$router.push('/'); resolve(); }
        else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
        else { this.user = user; resolve(); }
      });
    });
    this.email = this.userDetails?.email ?? '';
    await this.getUserInfo();
    await this.getTournois();
    await this.$store.dispatch('fetchUserDetails');
  },
  methods: {
    creertournoi() {
      this.$router.push('/creetournoi')
    },
    async getUserInfo() {
      const usersRef = collection(db, 'proprietaire');
      const q = query(usersRef, where("email", "==", this.email));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.userInfo = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document
          this.nomstade = this.userInfo.stadiumName;
          this.ville = this.userInfo.ville
        });
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    },
    async getTournois() {
      try {
        const tournoisSnapshot = await getDocs(collection(db, "tournois"));
        for (const doc of tournoisSnapshot.docs) {
          const tournoiData = doc.data();
          if (tournoiData.email === this.email) { // Ajout du filtre par email
            const images = await this.getImagesForTournoi(tournoiData.nom_tournoi);
            this.tournois.push({
              id: doc.id,
              nom_tournoi: tournoiData.nom_tournoi,
              date_debut: tournoiData.date_debut,
              date_fin: tournoiData.date_fin,
              categorie: tournoiData.categorie,
              description: tournoiData.description,
              frais_inscription: tournoiData.frais_inscription,
              recompense: tournoiData.recompense,
              nb_equipes_max: tournoiData.nb_equipes_max,
              conditions_speciales: tournoiData.conditions_speciales,
              images: images
            });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tournois : ", error);
      }
    },
    async getImagesForTournoi(nom_tournoi) {
      const imagesRef = ref(storage, `tournois/${this.nomstade}/${nom_tournoi}`);
      const imageUrls = [];
      const imageList = await listAll(imagesRef);
      for (const imageRef of imageList.items) {
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push({ url: imageUrl });
      }
      return imageUrls;
    },
    async deleteTournoi(tournoiId) {
      Swal.fire({
        title: "Supprimer ce tournoi ?",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteDoc(doc(db, "tournois", tournoiId));

            // Supprimer les images associées au tournoi
            const tournoi = this.tournois.find(t => t.id === tournoiId);
            if (tournoi) {
              for (const image of tournoi.images) {
                const imageRef = ref(storage, image.url);
                await deleteObject(imageRef);
              }
            }

            // Mettre à jour la liste des tournois
            this.tournois = this.tournois.filter(t => t.id !== tournoiId);

            Swal.fire("Tournoi supprimé avec succès", "", "success");
          } catch (error) {
            Swal.fire("Erreur lors de la suppression du tournoi", error.message, "error");
          }
        }
      });
    },
    Voir(tournoiId) {
      this.$router.push({ name: 'Tournois', query: { id: tournoiId } });
    },
    modifier(tournoiId) {
      this.$router.push({ name: 'modifierT', query: { id: tournoiId } });
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
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f0f0f0;
  padding: 20px;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

.containers {
  display: flex;
  justify-content: space-between;
  gap: 60px;
}

button {
  padding: 10px;
}

.tournois-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;
}

body {
  font-family: 'Poppins', sans-serif;
}

h2 {
  color: #00f2ff;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

h3 {
  color: white;

}

.section {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  overflow-x: auto;
}

.tournoi {
  width: 350px;
  border-radius: 20px;
  padding: 10px;
  overflow: hidden;
  background-color: #007E85;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.images-container {
  background-color: #007E85;
}

.img {
  max-width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

.tournoi-details p {
  font-size: 1.25rem;
}

td button {
  margin-right: 10px;
}

.btn {
  margin-bottom: 20px;
}

.pp {
  width: 70%;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
  .containers {
    display: flex;
    flex-direction: column;
  }

  .tournois-container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }

  .section {
    align-items: baseline;
  }
  .tournoi{
    width: 300px;
    padding: 0px;
  }
}
</style>