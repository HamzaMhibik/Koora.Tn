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
        <h2>Liste des Équipes Enregistrées</h2>
        <table class="equipe-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom de l'équipe</th>
              <th>Capitaine</th>
              <th>Email</th>
              <th>Ville</th>
              <th>Téléphone</th>
              <th>Joueurs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipe in equipes" :key="equipe.id">
              <td><img :src="equipe.logoURL" alt="Logo de l'équipe" class="logo-equipe"></td>
              <td>{{ equipe.nomEquipe }}</td>
              <td>{{ equipe.nomCapitaine }}</td>
              <td>{{ equipe.email }}</td>
              <td>{{ equipe.ville }}</td>
              <td>{{ equipe.telephone }}</td>
              <td>
                <ul class="joueurs-liste">
                  <li v-for="joueur in equipe.joueurs" :key="joueur">{{ joueur }}</li>
                </ul>
              </td>
              <td>
                <button @click="confirmDelete(equipe)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { db, storage, auth } from '../../firebase/firebase';
import { deleteDoc, doc, collection, getDocs } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';

export default {
  name: 'EquipeList',
  data() {
    return {
      equipes: [],
    };
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.fetchEquipes();
  },
  methods: {
    async fetchEquipes() {
      try {
        const querySnapshot = await getDocs(collection(db, 'equipes'));
        querySnapshot.forEach(async (doc) => {
          const equipeData = doc.data();
          const imageRef = ref(storage, `logos/${equipeData.nomEquipe}`);
          const imageUrl = await getDownloadURL(imageRef);
          this.equipes.push({ id: doc.id, ...equipeData, logoURL: imageUrl });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes : ', error);
      }
    },
    async deleteEquipe(equipe) {
      try {
        await deleteDoc(doc(db, 'equipes', equipe.id));
        const imageRef = ref(storage, `logos/${equipe.nomEquipe}`);
        await deleteObject(imageRef);
        this.equipes = this.equipes.filter((e) => e.id !== equipe.id);
        Swal.fire('Équipe supprimée', '', 'success');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'équipe : ', error);
      }
    },
    async confirmDelete(equipe) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Vous ne pourrez pas annuler cette action !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEquipe(equipe);
        }
      });
    }
  }
};
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

.equipe-table {
  width: 100%;
  /* Utiliser toute la largeur disponible */
  border-collapse: collapse;
}

.equipe-table th,
.equipe-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  width: calc(100% / 8);
  /* Répartir la largeur équitablement sur les 8 colonnes */
}

.logo-equipe {
  max-width: 150px;
  max-height: 150px;
}

.actions button {
  padding: 8px 12px;
  background-color: #3085d6;
  color: white;
  border: none;
  cursor: pointer;
}

.actions button:hover {
  background-color: #286090;
}

.joueurs-liste {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.joueurs-liste li {
  margin-bottom: 4px;
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
