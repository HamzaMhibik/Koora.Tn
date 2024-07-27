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
        <h1>Liste des Joueurs Enregistrés</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Âge</th>
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Poste</th>
              <th>Niveau</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(joueur, index) in joueurs" :key="index">
              <td>{{ joueur.nom }}</td>
              <td>{{ joueur.age }}</td>
              <td>{{ joueur.telephone }}</td>
              <td>{{ joueur.ville }}</td>
              <td>{{ joueur.poste }}</td>
              <td>{{ joueur.niveau }}</td>
              <td><img :src="joueur.logoUrl" alt="Photo du joueur" style="max-width: 100px; max-height: 100px;"></td>
              <td><button @click="deleteJoueur(joueur.id)">Supprimer</button></td>
            </tr>
          </tbody>
        </table>
        <div v-if="joueurs.length === 0">Aucun joueur trouvé.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import { collection, getDocs, doc } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      joueurs: []
    }
  },

  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.fetchJoueurs();
  },
  methods: {
    async fetchJoueurs() {
      try {
        const joueursRef = collection(db, 'joueures');
        const querySnapshot = await getDocs(joueursRef);
        this.joueurs = [];
        querySnapshot.forEach(async (doc) => {
          const joueurData = doc.data();
          const storageRef = ref(storage, `joueurs/${joueurData.nom}/photo`);
          const logoUrl = await getDownloadURL(storageRef);
          this.joueurs.push({ id: doc.id, ...joueurData, logoUrl: logoUrl });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs : ', error);
      }
    },
    async deleteJoueur(joueurId) {
      try {
        await deleteDoc(doc(db, 'joueurs', joueurId));

        // Supprimer le photo de joueur
        const imageRef = ref(storage, `joueurs/${joueurId}/photo`);
        await deleteObject(imageRef);
        this.joueurs = this.joueurs.filter(joueur => joueur.id !== joueurId);
        Swal.fire('Joueur supprimé avec succès', '', 'success');
      } catch (error) {
        console.error('Erreur lors de la suppression du joueur : ', error);
        Swal.fire('Erreur lors de la suppression du joueur', '', 'error');
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.bodyy{
  background-color: #e4e3e3;
  min-height: 100vh;
}

.content {
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}
.router-link-exact-active {
  padding: 10px;
  background-color: #555;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f2f2f2;
}

h1 {
  color: #333;
  font-family: Arial, sans-serif;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #d32f2f;
}

img {
  max-height: 150px;
  max-width: 150px;
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

</style>