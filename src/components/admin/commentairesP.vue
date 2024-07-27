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
        <h2>Liste des Commentaires</h2>
        <table>
          <thead>
            <tr>
              <th>Centenu</th>
              <th>Utilisateur</th>
              <th>Nombre de j'aime</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comment, index) in commentP" :key="index">
              <td>{{ comment.content }}</td>
              <td>{{ comment.user }}</td>
              <td>
                <p v-if="comment.nblike">{{ comment.nblike }}</p>
                <p v-else>0</p>
              </td>
              <td>
                <button @click="confirmDelete(comment)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase'; // Importez votre configuration Firebase
export default {
  data() {
    return {
      commentP: [],
    };
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    this.fetchCommentP();
  },
  methods: {
    async fetchCommentP() {
      try {
        const querySnapshot = await getDocs(collection(db, 'commentaire-plateform'));
        querySnapshot.forEach((doc) => {
          this.commentP.push({ id: doc.id, ...doc.data() });
        });
        console.log(this.commentP)
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires : ', error);
      }
    },
    async deleteComment(comment) {
      try {
        await deleteDoc(doc(db, 'commentaire-plateform', comment.id));
        // Mettre à jour localement la liste des commentaires après la suppression
        this.commentP = this.commentP.filter((c) => c.id !== comment.id);
        Swal.fire('Commentaire supprimé', '', 'success');
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire : ', error);
      }
    },
    async confirmDelete(comment) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteComment(comment);
        }
      });
    },
  },
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

/* Vos styles existants */
table {
  width: 100%;
  border-collapse: collapse;
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

h2 {
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
.router-link-exact-active {
  padding: 10px;
  background-color: #555;
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