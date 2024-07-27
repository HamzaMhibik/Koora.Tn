<template>
  <div class="bodyy">
    <div class="demandes-container">
      <h3>Demandes de recrutement</h3><br>
      <button @click="defier()">Créer une demande de recrutement</button><br><br>
      <div v-if="demandes.length === 0" class="empty-message">
        Aucune demande de recrutement pour le moment.
      </div>
      <div v-else class="demandes">
        <div v-for="demande in demandes" :key="demande.id" class="demande-card">
          <div class="demande-info">
            <p><strong>Âge du joueur:</strong> {{ demande.ageMin }} - {{ demande.ageMax }}</p>
            <p><strong>Poste:</strong> {{ demande.poste }}</p>
            <p><strong>Niveau:</strong> {{ demande.niveau }}</p>
            <p><strong>Ville:</strong> {{ demande.ville }}</p>
          </div>
          <div class="joueurs-liste">
            <strong>Listes de joueurs qui ont postulé:</strong>
            <table v-if="demande.joueurs && demande.joueurs.length > 0" class="joueurs-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Nom Complet</th>
                  <th>Téléphone</th>
                  <th>Ville</th>
                  <th>Poste</th>
                  <th>Âge</th>
                </tr>
              </thead>
              <tbody class="listeJoueurs">
                <tr v-for="joueur in demande.joueurs" :key="joueur.id">
                  <td v-for="photoUrl in joueur.photoUrls">
                    <img :src="photoUrl" alt="image de joueur">
                  </td>
                  <td>{{ joueur.nom }}</td>
                  <td>{{ joueur.telephone }}</td>
                  <td>{{ joueur.ville }}</td>
                  <td>{{ joueur.poste }}</td>
                  <td>{{ joueur.age }}</td>
                  <td>
                    <button @click="supprimerJoueur(demande.id, joueur.id)" class="delete-button">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else class="no-applicants">Aucun joueur n'a postulé pour cette demande.</p>
          </div>
          <center><button @click="supprimerDemande(demande.id)" class="delete-button">Supprimer la demande</button>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h3 {
  color: #00c7d1;
  text-align: center;
  font-family: 'poppins';
  position: relative;
  font-size: 2.5rem;
}

.bodyy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

.demandes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demandes-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.empty-message {
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.demande-card {
  width: 49%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  background-color: #007E85;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.demande-info p {
  margin: 5px 0;
}

.joueurs-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
}

.joueurs-table th,
.joueurs-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  display: table-cell;
}

.joueurs-table tr {
  display: table-row;
}

.no-applicants {
  margin-top: 10px;
  color: #888;
}

.delete-button {
  background-color: #b10000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #640000;
}

img {
  max-width: 100px;
}

button {
  background-color: #027ca1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

p,
strong,
td,
th,
tr {
  color: white;
  font-size: 1.15rem
}

@media only screen and (max-width: 600px) {
  .demandes {
    display: flex;
    flex-direction: column;
  }

  .demande-card {
    width: 100%;
  }

  .joueurs-table {
    display: flex;
    flex-direction: column;
    overflow-x: auto;
  }
}
</style>

<script>
import { db, auth, storage } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc, where, query, updateDoc, arrayRemove } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from "firebase/storage"
import Swal from 'sweetalert2'

export default {
  name: 'RecruitmentForm',
  data() {
    return {
      storedEmail: '',
      demandes: [],
    }
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    await new Promise((resolve) => {
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) { this.$router.push('/'); resolve(); }
        else if (user.photoURL !== 'equipe') { this.$router.push('/'); resolve(); }
        else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
        else { this.user = user; resolve(); }
      });
    });
    this.storedEmail = this.userDetails?.email ?? '';
    this.fetchDemandesRecrutement();
  },
  methods: {
    async fetchImageUrls(username) {
      try {
        const imagesRef = ref(storage, `joueurs/${username}/`);
        const imageUrls = [];
        // Récupérer les URLs de téléchargement de toutes les images de joueur
        const listResult = await listAll(imagesRef);
        for (const item of listResult.items) {
          const imageUrl = await getDownloadURL(item);
          imageUrls.push(imageUrl);
        }
        return imageUrls;
      } catch (error) {
        console.error("Erreur lors de la récupération des URLs des images :", error);
        return [];
      }
    },
    async fetchDemandesRecrutement() {
      try {
        const q = query(collection(db, "recrutement"), where("email", "==", this.storedEmail));
        const querySnapshot = await getDocs(q);
        this.demandes = [];
        for (const doc of querySnapshot.docs) {
          const demande = { id: doc.id, ...doc.data() };
          // Récupérer les URLs des images des joueurs et les ajouter à chaque joueur
          for (const joueur of demande.joueurs) {
            joueur.photoUrls = await this.fetchImageUrls(joueur.nom);
          }
          this.demandes.push(demande);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de recrutement :", error);
      }
    },
    async supprimerDemande(demandeId) {
      try {
        await deleteDoc(doc(db, "recrutement", demandeId));
        this.demandes = this.demandes.filter(demande => demande.id !== demandeId);
        Swal.fire('Demande supprimée!', 'La demande de recrutement a été supprimée avec succès.', 'success');
      } catch (error) {
        console.error("Erreur lors de la suppression de la demande de recrutement :", error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de la demande de recrutement.', 'error');
      }
    },
    defier() {
      this.$router.push('/recrutement')
    },
    async supprimerJoueur(demandeId, joueurId) {
      try {
        // Supprimer le joueur de la demande de recrutement dans la base de données
        const demandeRef = doc(db, "recrutement", demandeId);
        await updateDoc(demandeRef, {
          joueurs: arrayRemove(joueurId)
        });

        // Mettre à jour localement la liste des joueurs de la demande
        const demandeIndex = this.demandes.findIndex(demande => demande.id === demandeId);
        if (demandeIndex !== -1) {
          this.demandes[demandeIndex].joueurs = this.demandes[demandeIndex].joueurs.filter(joueur => joueur.id !== joueurId);
        }

        // Afficher un message de confirmation
        Swal.fire('Joueur supprimé!', 'Le joueur a été supprimé avec succès de cette demande de recrutement.', 'success');
      } catch (error) {
        console.error("Erreur lors de la suppression du joueur :", error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du joueur.', 'error');
      }
    },
  }
}
</script>
