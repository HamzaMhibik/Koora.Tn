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
        <h2>Liste des Défis</h2>
        <table>
          <thead>
            <tr>
              <th>Équipe 1</th>
              <th>Équipe 2</th>
              <th>Stade</th>
              <th>Date du Match</th>
              <th>Heure du Match</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(defi, index) in defis" :key="index">
              <td>{{ defi.equipe1 }}</td>
              <td>{{ defi.equipe2 }}</td>
              <td>{{ defi.stade }}</td>
              <td>{{ defi.dateMatch }}</td>
              <td>{{ defi.heureMatch }}</td>
              <td>{{ defi.etat }}</td>
              <td>
                <button @click="supprimerDefi(defi.id, index)">Supprimer</button>
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

export default {
  data() {
    return {
      defis: [], 
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.fetchDefis();
  },
  methods: {
    async fetchDefis() {
      try {
        const querySnapshot = await getDocs(collection(db, "defis"));
        this.defis = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Erreur lors de la récupération des défis :", error);
      }
    },
    async supprimerDefi(defiId, index) {
      try {
        await deleteDoc(doc(db, 'defis', defiId));
        this.defis.splice(index, 1); 
      } catch (error) {
        console.error("Erreur lors de la suppression du défi :", error);
      }
    },
  }
}
</script>

<style scoped>
/* Ajoutez votre CSS personnalisé ici */
.bodyy{
  background-color: #e4e3e3;
  min-height: 100vh;
}
table {
  width: 100%;
  border-collapse: collapse;
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

.container {

  display: flex;
  flex-wrap: wrap;
}

.content {
  padding: 10px;
}

h1 {
  color: #333;
  font-family: Arial, sans-serif;
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