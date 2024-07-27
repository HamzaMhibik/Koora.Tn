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
        <h1>Liste des Stades Enregistrés</h1>
        <table v-if="stades.length > 0">
          <thead>
            <tr>
              <th>Nom du Stade</th>
              <th>Nom de responsable</th>
              <th>Ville</th>
              <th>Prix(DT)</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stade, index) in stades" :key="index">
              <td>{{ stade.stadiumName }}</td>
              <td>{{ stade.nom }}</td>
              <td>{{ stade.ville }}</td>
              <td>{{ stade.reservationPrice }}</td>
              <td>{{ stade.address }}</td>
              <td>{{ stade.telephone }}</td>
              <td>
                <div class="images-container">
                  <img v-for="(image, i) in stade.images" :key="i" :src="image" alt="Image du stade"
                    class="stade-image">
                </div>
              </td>
              <td><button @click="deleteStade(stade.id)">Supprimer</button></td>
            </tr>
          </tbody>
        </table>
        <div v-else>Aucun stade trouvé.</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

.images-container {
  display: flex;
  flex-wrap: wrap;
}
.stade-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 5px;
}
.container {
  margin-left: 270px;
  width: 1500px;

}
.content {
  width: 1500px;
  overflow-x: auto;
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
<script>
import { db, storage, auth } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      stades: [],
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.fetchStades();
  },
  methods: {
    async fetchStades() {
      try {
        const stadesRef = collection(db, 'proprietaire');
        const querySnapshot = await getDocs(stadesRef);
        this.stades = [];

        querySnapshot.forEach(doc => {
          const stadeData = { id: doc.id, ...doc.data() };
          this.stades.push(stadeData);
        });

        await Promise.all(this.stades.map(async stade => {
          const imagesRef = ref(storage, `Stades/${stade.stadiumName}/`);
          const imagesList = await listAll(imagesRef);
          stade.images = await Promise.all(imagesList.items.map(async imageRef => {
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
          }));
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des stades : ', error);
      }
    },
    async deleteStade(stadeId) {
      try {
        await deleteDoc(doc(db, 'proprietaire', stadeId));
        // Supprimer las image du stade du stockage
        const imagesRef = ref(storage, `Stades/${stadeId}/`);
        const imagesList = await listAll(imagesRef);
        await Promise.all(imagesList.items.map(async imageRef => {
          await deleteDoc(imageRef);
        }));

        // changer la liste actuel
        this.stades = this.stades.filter(stade => stade.id !== stadeId);
      } catch (error) {
        console.error('Erreur lors de la suppression du stade : ', error);
      }
    },
  }
}
</script>
