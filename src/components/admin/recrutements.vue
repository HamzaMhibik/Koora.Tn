<template>
  <div class="bodyy">
  <div class="container">
    <nav>
      <div class="div1">
        <div><router-link to="/dashboard" class="link1">dashboard</router-link></div>
        <div><router-link to="/AjoutAdmin" class="link1">Ajouter admin</router-link></div>
        <div><router-link to="/ContactA" class="link1">Contact</router-link></div>
      </div>
      <div><router-link to="/equipes" class="link"><img src="../../assets/group.png" class="icon"> Equipes</router-link>
      </div>
      <div><router-link to="/stades" class="link"><img src="../../assets/stade.png" class="icon"> Stades</router-link>
      </div>
      <div><router-link to="/joueurs" class="link"><img src="../../assets/joueur.png" class="icon">
          Joueurs</router-link></div>
      <div><router-link to="/tournois" class="link"><img src="../../assets/tournoi.png" class="icon">
          Tournois</router-link></div>
      <div><router-link to="/defis" class="link"><img src="../../assets/defi.png" class="icon"> Défis</router-link>
      </div>
      <div><router-link to="/recrutements" class="link"><img src="../../assets/recruitment.png" class="icon">
          Recrutements</router-link></div>
      <div><router-link to="/commentairesS" class="link"><img src="../../assets/comment.png" class="icon">
          CommentairesS</router-link></div>
      <div><router-link to="/commentairesp" class="link"><img src="../../assets/comment.png" class="icon">
          CommentairesP</router-link></div>
      <div><router-link to="/reservation" class="link"><img src="../../assets/reservation.png" class="icon">
          reservation</router-link></div>
    </nav>
    <div class="content">
      <h2>Liste des demandes de recrutement</h2><br>
      <div v-if="demandes.length === 0" class="empty-message">
        Aucune demande de recrutement pour le moment.
      </div>
      <div v-else>
        <table class="demandes-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Non d'equipe</th>
              <th>Âge du joueur</th>
              <th>Poste</th>
              <th>Niveau</th>
              <th>Ville</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demande in demandes" :key="demande.id">
              <td><img :src=demande.logo></td>
              <td>{{ demande.equipename }}</td>
              <td>{{ demande.ageMin }} - {{ demande.ageMax }}</td>
              <td>{{ demande.poste }}</td>
              <td>{{ demande.niveau }}</td>
              <td>{{ demande.ville }}</td>
              <td>{{ demande.numero }}</td>
              <td>{{ demande.email }}</td>
              <td>
                <button @click="supprimerDemande(demande.id)" class="delete-button">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { db, auth } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export default {
  name: 'RecruitmentForm',
  data() {
    return {
      storedEmail: '',
      demandes: [],
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    this.fetchDemandesRecrutement();
  },
  methods: {
    async fetchDemandesRecrutement() {
      try {
        const querySnapshot = await getDocs(collection(db, "recrutement"));
        querySnapshot.forEach(doc => {
          this.demandes.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des recrutements :", error);
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
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.bodyy{
  background-color: #e4e3e3;
  min-height: 100vh;
}

.demandes-table {
  width: 100%;
  border-collapse: collapse;
}

.demandes-table th,
.demandes-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.demandes-table th {
  background-color: #f2f2f2;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.navbar-container {
  display: grid;
  align-items: flex-start;
  /* Aligner les éléments en haut */
}

.container {

  display: flex;
  flex-wrap: wrap;
}

.content {
  padding: 10px;
}
.link {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 3px;
  transition: background-color 0.3s;
  display: block;
}
.link:hover {
  background-color: #555;
}
nav {
  background-color: rgb(148, 148, 148);
  width: 200px;
  position: fixed;
  margin-top: 10px;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 60px;
}
.link1 {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 3px;
  display: block;
  margin-top: 10px;
}

.icon {
  width: 30px;
}


nav img {
  vertical-align: middle;
}
.router-link-exact-active {
  padding: 10px;
  background-color: #555;
}
</style>