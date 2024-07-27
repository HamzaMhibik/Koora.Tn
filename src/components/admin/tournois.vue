<template>
  <div class="bodyy">
    <div class="container">
      <nav>
        <div class="div1">
          <div><router-link to="/dashboard" class="link1">dashboard</router-link></div>
          <div><router-link to="/AjoutAdmin" class="link1">Ajouter admin</router-link></div>
          <div><router-link to="/ContactA" class="link1">Contact</router-link></div>
        </div>
        <div><router-link to="/equipes" class="link"><img src="../../assets/group.png" class="icon">
            Equipes</router-link>
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
        <h2>Liste des Tournois</h2>
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom du Tournoi</th>
              <th>Date de Début</th>
              <th>Date de Fin</th>
              <th>Catégorie</th>
              <th>Description</th>
              <th>Frais d'Inscription</th>
              <th>Nombre d'Équipes Max</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tournoi in tournois" :key="tournoi.id">
              <td>
                <img :src="tournoi.logoUrl" alt="Logo du tournoi" width="150">
              </td>
              <td>{{ tournoi.nom_tournoi }}</td>
              <td>{{ tournoi.date_debut }}</td>
              <td>{{ tournoi.date_fin }}</td>
              <td>{{ tournoi.categorie }}</td>
              <td>{{ tournoi.description }}</td>
              <td>{{ tournoi.frais_inscription }}</td>
              <td>{{ tournoi.nb_equipes_max }}</td>
              <td>
                <button @click="supprimerTournoi(tournoi.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from "firebase/storage";

export default {
  name: 'ListeTournois',
  data() {
    return {
      tournois: [],
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.fetchTournois();
  },
  methods: {
    async fetchTournois() {
      const tournoisRef = collection(db, 'tournois');
      const snapshot = await getDocs(tournoisRef);
      this.tournois = await Promise.all(snapshot.docs.map(async doc => {
        const tournoiData = doc.data();
        const imagesRef = ref(storage, `tournois/${tournoiData.nomstade}/${tournoiData.nom_tournoi}`);
        const imagesList = await listAll(imagesRef);
        const logoUrl = await getDownloadURL(imagesList.items[0]);
        return { id: doc.id, logoUrl, ...tournoiData };
      }));
    },
    async supprimerTournoi(tournoiId) {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce tournoi ?");
      if (confirmation) {
        try {
          await deleteDoc(doc(db, 'tournois', tournoiId));
          await this.fetchTournois();
          console.log("Tournoi supprimé avec succès !");
        } catch (error) {
          console.error("Erreur lors de la suppression du tournoi :", error);
        }
      }
    },
  }
}
</script>

<style scoped>
/* Ajoutez votre CSS personnalisé ici */
table {
  width: 100%;
  border-collapse: collapse;
}
.bodyy{
  background-color: #e4e3e3;
  min-height: 100vh;
}

thead {
  background-color: #f2f2f2;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h1 {
  color: #333;
  font-family: Arial, sans-serif;
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