<template>
  <div class="bodyy">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <div class="img-container">
      <Carousel :items-to-show="isMobile ? 1 : 2.8" :wrap-around="true" :autoplay="5000" class="imgs">
        <Slide v-for="slide in 6" :key="slide" class="stade-slide">
          <img v-if="slide == 1" src="../assets/logo8.png" class="imgtop">
          <img v-if="slide == 2" src="../assets/stade(1).jpg" class="imgtop">
          <img v-if="slide == 3" src="../assets/stade(2).jpg" class="imgtop">
          <img v-if="slide == 4" src="../assets/stade(3).jpg" class="imgtop">
          <img v-if="slide == 5" src="../assets/foot (4).jpg" class="imgtop">
          <img v-if="slide == 6" src="../assets/stade(5).jpg" class="imgtop">
        </Slide>
      </Carousel>
    </div>
    <div>
      <h2> Derniers Tournois Créer </h2><br>
      <Carousel :items-to-show="isMobile ? 1.5 : 4.5" :wrap-around="true" class="tournois" :autoplay="9000">
        <Slide v-for="(tournoi, index) in tournois" :key="tournoi.id" class="tournoi-slide">
          <img class="tournoi-image" v-for="(image, imgIndex) in tournoi.images" :src="image.url"
            :alt="'Image ' + (imgIndex + 1)">
          <div class="tournoi-details">
            <h2>{{ tournoi.nom_tournoi }}</h2>
            <p><strong>Stade: <span class="tournoiinfo">{{ tournoi.nom_stade }}</span></strong></p>
            <p><strong>Ville: <span class="tournoiinfo">{{ tournoi.ville }}</span></strong></p>
            <p><strong>Prix d'inscription: <span class="tournoiinfo">{{ tournoi.frais_inscription }} Dt</span></strong>
            </p>
            <button v-if="userDetails.photoURL === 'equipe'" @click="participer(tournoi.id)"
              class="participer-button">Voir le tournoi</button>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div><br>
    <div>
      <h2> Derniers Stades Ajoutés</h2>
      <br>
      <Carousel :items-to-show="isMobile ? 1 : 2.5" :wrap-around="true">
        <Slide v-for="(stade, index) in stades" :key="index" class="stade-slide">
          <img v-if="stade.images && stade.images.length > 0" :src="stade.images[0].url" alt="Stade Image"
            class="stade-image">
          <div class="stade-details">
            <h3>{{ stade.stadiumName }}</h3>
            <p><strong>Ville:</strong> {{ stade.ville }}</p>
            <p><strong>Prix de réservation:</strong> {{ stade.reservationPrice }} dt</p>
            <button v-if="userDetails.photoURL === 'equipe'" @click="reserver(stade)">Réserver</button>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div><br>
    <h2>Utilisation de plateforme</h2>
    <div class="statistique d-flex justify-content-around flex-wrap">
      <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-body" style="display: block;">
          <h5 class="card-title">Stades</h5>
          <p class="card-text">Nombre des stades enregistrés:
            <center>
              <h1>{{ stadesS.length }}</h1>
            </center>
          </p>
        </div>
      </div>
      <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-body" style="display: block;">
          <h5 class="card-title">Equipe</h5>
          <p class="card-text">Nombre des équipes créées:
            <center>
              <h1>{{ equipesS.length }}</h1>
            </center>
          </p>
        </div>
      </div>
      <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
        <div class="card-body" style="display: block;">
          <h5 class="card-title">Joueurs</h5>
          <p class="card-text">Nombre des joueurs enregistrés:
            <center>
              <h1>{{ joueursS.length }}</h1>
            </center>
          </p>
        </div>
      </div>
      <div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
        <div class="card-body" style="display: block;">
          <h5 class="card-title">Tournois</h5>
          <p class="card-text">Nombre des tournois organisés:
            <center>
              <h1>{{ tournoisS.length }}</h1>
            </center>
          </p>
        </div>
      </div>
    </div>

    <div class="comment-section">
      <h2 class="bestcomments">Meilleurs Commentaires</h2>
      <div v-if="isMobile">
        <Carousel :items-to-show="1" :wrap-around="true">
          <Slide v-for="(comment, index) in comments" :key="index" class="commentb">
            <div class="card text-white bg-success mb-3">
              <div class="card-header">{{ comment.user }}</div>
              <div class="card-body">
                <h5 class="card-title">{{ comment.content }}</h5>
                <div>
                  <p class="card-text">{{ comment.nblike }} J'aime</p>
                  <button @click="likeComment(comment)" class="like-button">J'aime</button>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <center v-if="!isMobile">
        <div class="statistique d-flex justify-content-around flex-wrap">
          <div v-for="(comment, index) in comments" :key="index" class="commentb">
            <div class="card text-white bg-success mb-3">
              <div class="card-header">{{ comment.user }}</div>
              <div class="card-body">
                <h5 class="card-title">{{ comment.content }}</h5>
                <div>
                  <p class="card-text">{{ comment.nblike }} J'aime</p>
                  <button @click="likeComment(comment)" class="like-button">J'aime</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
    <div class="comment-section2">
      <center>
        <h2>Commentaires</h2>
      </center>
      <form @submit.prevent="addComment">
        <textarea rows="4" cols="50" placeholder="Laissez votre commentaire ici" v-model="newComment"></textarea><br />
        <div class="buttoncomment">
          <button type="submit">Ajouter Commentaire</button>
        </div>
      </form><br>
      <center><button @click="afficheplusf" class="btn btn-warning">{{ afficheplus ? 'Masquer' : 'Afficher commentaires'
          }}</button></center>
      <div v-if="comments && afficheplus" class="comments-container">
        <div v-for="(comment, index) in comments2" :key="index" class="comment">
          <div class="commentpart1">
            <p class="comment-user">{{ comment.user }}:</p>
            <p class="">{{ comment.nblike }} J'aime</p>
          </div>
          <div style="display: flex;" class="commentcontent">
            <p class="comment-p">{{ comment.content }}</p>
          </div>
          <div style="display: flex;">
            <div>
              <button @click="likeComment(comment)" class="jaimeb">J'aime</button>
              <button v-if="comment.user === userDetails.displayName" @click="deleteComment(comment)"
                class="suppb">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
      <p style="color: white;">aaaa</p>
    </div>
  </div>
</template>
<style scoped>
.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  background-image: url('../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.img-container {
  margin-top: -10px;
}

.imgtop {
  width: 64.5vh;
  height: 40vh;
}

h2 {
  color: rgb(187, 17, 5);
  font-weight: bold;
}

/* ----------------------------------stade------------------------------------------------------------------------*/
.stade-slide {
  background: #007e855b;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: transform 0.2s ease-in-out;
  /* Ajoute un espace entre les slides */
}

.stade-slide:last-child {
  margin-right: 0;
  /* Supprime la marge droite pour le dernier slide */
}

.stade-slide:hover {
  transform: scale(1.05);
}

.stade-image {
  width: 700px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.stade-details {
  text-align: center;
}

.stade-details h3 {
  color: rgb(170, 14, 3);
}

.stade-details p {
  margin: 5px 0;
  font-size: 1.25rem;
}

.stade-details button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.stade-details button:hover {
  background-color: #0056b3;
}

/* ----------------------------------tournoi------------------------------------------------------------------------*/
.tournoi-slide {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #007e855b;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: transform 0.2s ease-in-out;
  margin-right: 20px;
  /* Ajoute un espace entre les slides */
}

.tournoi-slide:last-child {
  margin-right: 0;
  /* Supprime la marge droite pour le dernier slide */
}

.tournoi-slide:hover {
  transform: scale(1.05);
}

.tournoi-image {
  width: 60%;
  height: 230px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.tournoi-details {
  text-align: center;
}

.tournoi-details h2 {
  color: rgb(170, 14, 3);
  margin: 10px 0;
}

.tournoi-details p {
  margin: 5px 0;
  font-size: 1rem;
  color: white
}

.participer-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tournoiinfo {
  color: #F9F871;
}

.participer-button:hover {
  background-color: #0056b3;
}

/* -----------------------------------------------------------------comment-section1------------------------------------------------------------------ */
.statistique .card {
  flex: 1 0 100%;
  margin-bottom: 1rem;
}

.comment-section {
  margin: 0;
}

.comment-section h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.commentb .card {
  width: 25rem;
  min-height: 280px;
}

.card-header {
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.like-button {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.card-body button {
  width: 200px;
}

/* -----------------------------------------------------------------comment-section------------------------------------------------------------------ */
.comment-section2 {
  width: 95%;
  margin-top: 20px;
  margin-left: 2%;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.commentpart1 {
  display: flex;
  justify-content: space-between;
}

form button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buttoncomment {
  display: flex;
  justify-content: space-between;
}

form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.jaimeb {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 5px;
}

.suppb {
  margin-left: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #ff0000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 5px;
}

.comments-container {
  margin-top: 10px;
  padding: 20px;
}

.comment {
  padding: 0 20px;
  margin-top: 10px;
  border: #007E85 solid 2px;
}

.comment-user {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0056b3;
}

.comment p {
  border: none;
  font-size: 1.25rem;
  margin-top: -5px
}

.like-count {
  color: #ffffff;
}

@media screen and (max-width: 768px) {
  .imgp {
    width: 100%;
    border-bottom: 4px solid white;
  }

  .imgtop {
    width: 106%;
    height: 31vh;
  }

  .user-name,
  .like-count,
  .comment-content {
    color: white;
  }

  .participer-button {
    font-size: 80%;
    width: 70%;
    height: 20%;
  }

  .stade-details button {
    padding: 7.5px;
  }

  .comments-list .comment p {
    font-size: 1rem;
  }

  .statistique .card {
    flex: 1 0 48%;
    /* Adjust the width to display two cards per row */
    margin-bottom: 1rem;
  }

  .statistique .card:nth-child(odd) {
    margin-right: 4%;
  }

  .comment-section h2 {
    font-size: 1.7rem;
  }

  .comment-section form button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .commentb .card {
    max-width: 300px;
  }

  .commentcontent {
    margin-left: 18px
  }

  .card {
    width: 330px;
  }

  .card-text {
    font-size: 0.8rem;
  }

  .card-title {
    font-size: 1rem;
  }

  .stade-slide {
    width: 90%;
    margin-right: 0;
  }

  .stade-image {
    width: 100%;
    height: 250px;
  }

  .tournoi-slide {
    width: 10%;
    margin-right: 0;
  }

  .tournoi-image {
    width: 50%;
    height: auto;
  }

  .comment {
    padding: 0;
    margin-left: -45px;
    width: 134%;
  }

  .comment-p {
    margin-left: -18px;
    width: 150%;
  }

  .tournoi-image {
    width: 160px;
  }

  .buttoncomment {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jaimeb {
    padding: 5px 10px
  }
}
</style>
<script>
import chooseAccount from '../views/ChooseAccountView.vue'
import { db, storage } from "../firebase/firebase";
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore'; // Importer deleteDoc
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    Navigation,
    chooseAccount
  },
  data() {
    return {
      stades: [],
      tournois: [],
      newComment: '', // Variable pour stocker le nouveau commentaire
      comments: [],
      comments2: [],
      afficheplus: false,
      stadesS: [],
      joueursS: [],
      equipesS: [],
      tournoisS: [],
      user: null,
      isMobile: window.innerWidth <= 760
    };
  },
  /* created() {
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }, */
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    await this.getTournois();
    await this.fetchStades();
    await this.fetchImagesForStades();
    await this.fetchComments();
    await this.fetchComments2();
    await this.fetchEquipes();
    await this.fetchJoueurs();
    await this.fetchStadesS();
    await this.fetchTournois();
    await this.$store.dispatch('fetchUserDetails');
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 760;
    },
    async fetchEquipes() {
      try {
        const resultat = await getDocs(collection(db, 'equipes'));
        resultat.forEach((doc) => {
          this.equipesS.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes : ', error);
      }
    },
    async fetchJoueurs() {
      const resultat = await getDocs(collection(db, 'joueures'));
      resultat.forEach((doc) => {
        this.joueursS.push({ id: doc.id, ...doc.data() });
      });
    },
    async fetchStadesS() {
      const stadesRef = collection(db, 'proprietaire');
      const resultat = await getDocs(stadesRef);
      resultat.forEach(doc => {
        const stadeData = { id: doc.id, ...doc.data() };
        this.stadesS.push(stadeData);
      });
    },
    async fetchTournois() {
      const tournoisRef = collection(db, 'tournois');
      const resultat = await getDocs(tournoisRef);
      resultat.forEach(doc => {
        const stadeData = { id: doc.id, ...doc.data() };
        this.tournoisS.push(stadeData);
      });
    },
    /* -------------------------------------------------------------------------------------------------- */
    async fetchStades() {
      const colRef = collection(db, 'proprietaire');
      const resultat = await getDocs(colRef);
      resultat.forEach((doc) => {
        this.stades.push(doc.data());
      });
      this.stades.sort((a, b) => b.dateAdded - a.dateAdded);
      this.stades = this.stades.slice(0, 4);
    },
    async fetchImagesForStades() {
      for (let i = 0; i < this.stades.length; i++) {
        const stade = this.stades[i];
        const imagesRef = ref(storage, `Stades/${stade.stadiumName}/`);
        await listAll(imagesRef).then(async (res) => {
          if (res.items.length > 0) {
            const firstImage = res.items[0]; // Récupère uniquement la première image
            const imageUrl = await getDownloadURL(firstImage);
            this.stades[i].images = [{ url: imageUrl }]; // Ajoute seulement la première image au tableau d'images
          }
        }).catch((error) => {
          console.error('Error getting uploaded images:', error);
        });
      }
    },
    async getTournois() {
      try {
        const resultat = await getDocs(collection(db, "tournois"));
        const tournois = [];
        for (const doc of resultat.docs) {
          const tournoiData = doc.data();
          tournois.push({
            id: doc.id,
            nom_tournoi: tournoiData.nom_tournoi,
            nom_stade: tournoiData.nomstade,
            date_debut: tournoiData.date_debut,
            date_fin: tournoiData.date_fin,
            categorie: tournoiData.categorie,
            description: tournoiData.description,
            frais_inscription: tournoiData.frais_inscription,
            nb_equipes_max: tournoiData.nb_equipes_max,
            conditions_speciales: tournoiData.conditions_speciales,
            email: tournoiData.email,
            ville: tournoiData.ville
          });
        }
        tournois.sort((a, b) => b.dateAdded - a.dateAdded);
        this.tournois = tournois.slice(0, 5);
        for (const tournoi of this.tournois) {
          tournoi.images = await this.getImagesForTournoi(tournoi.nom_tournoi, tournoi.nom_stade);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tournois : ", error);
      }
    },
    async getImagesForTournoi(nomtournoi, nomstade) {
      const imagesRef = ref(storage, `tournois/${nomstade}/${nomtournoi}`);
      const imageUrls = [];
      const imageList = await listAll(imagesRef);
      for (const imageRef of imageList.items) {
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push({ url: imageUrl });
      }
      return imageUrls;
    },
    async addComment() {
      if (!this.userDetails.displayName) {
        this.$router.push('/create')
      }
      if (!this.newComment.trim()) {
        return;
      }
      const existingComment = this.comments2.find(comment => comment.user === this.userDetails.displayName);
      if (existingComment) {
        Swal.fire({
          icon: 'warning',
          title: 'Vous avez déjà commenté',
          text: 'Vous ne pouvez pas ajouter plus d\'un commentaire.'
        });
        return;
      }

      try {
        const commentData = {
          content: this.newComment.trim(),
          user: this.userDetails.displayName || 'Utilisateur Anonyme',
          timestamp: new Date(),
          nblike: 0
        };
        const docRef = await addDoc(collection(db, 'commentaire-plateform'), commentData);
        //Ajouter la commentaire a la liste local
        const newCommentWithId = { id: docRef.id, ...commentData };
        this.comments2.unshift(newCommentWithId); // Ajouter au début de la liste pour un ordre chronologique
        this.newComment = '';

        this.afficheplus = true;
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire : ', error);
      }
    },
    isUserComment(comment) {
      return this.userDetails.displayName && comment.user === this.userDetails.displayName;
    },
    async fetchComments() {
      try {
        const commentsSnapshot = await getDocs(collection(db, 'commentaire-plateform'));
        const comments = [];
        commentsSnapshot.forEach((doc) => {
          const commentData = doc.data();
          const commentWithId = {
            id: doc.id,
            ...commentData
          };
          comments.push(commentWithId);
        });
        comments.sort((a, b) => b.nblike - a.nblike);
        this.comments = comments.slice(0, 3);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires : ', error);
      }
    },
    async fetchComments2() {
      try {
        const resultat = await getDocs(collection(db, 'commentaire-plateform'));
        const comments = [];
        let userComment = null; 
        resultat.forEach((doc) => {
          const commentData = doc.data();
          const commentWithId = {
            id: doc.id,
            ...commentData 
          };
          if (this.userDetails.displayName && commentData.user === this.userDetails.displayName) {
            userComment = commentWithId;
          } else {
            comments.push(commentWithId);
          }
        });

        comments.sort((a, b) => b.timestamp - a.timestamp); // Trier par date de timestamp

        if (userComment) {
          comments.unshift(userComment); // Placez le commentaire de l'utilisateur connecté en haut
        }

        this.comments2 = comments;
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires : ', error);
      }
    },
    async afficheplusf() {
      if (!this.afficheplus) {
        this.afficheplus = true
      } else {
        this.afficheplus = false

      }
    },

    async likeComment(comment) {
      if (!this.userDetails.displayName) {
        this.$router.push('/create');
        return;
      }

      // Vérifiez si l'utilisateur a déjà aimé le commentaire
      const userLiked = comment.like && comment.like[this.userDetails.displayName];
      if (userLiked) {
        comment.nblike--;
        delete comment.like[this.userDetails.displayName];
      } else {
        comment.nblike++;
        if (!comment.like) {
          comment.like = {}; // Si l'objet like n'existe pas encore, créez-le
        }
        comment.like[this.userDetails.displayName] = true; // Enregistrez le nom d'utilisateur dans l'objet like
      }

      // Mettez à jour le commentaire dans la base de données Firestore
      try {
        const commentRef = doc(db, 'commentaire-plateform', comment.id); // Supposons que chaque commentaire ait un identifiant unique 'id'
        await setDoc(commentRef, comment);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du commentaire : ', error);
      }
    },
    async deleteComment(comment) {
      try {
        await deleteDoc(doc(db, 'commentaire-plateform', comment.id));
        Swal.fire({
          icon: 'success',
          title: 'Commentaire supprimé avec succès',
        });
        await this.fetchComments();
        await this.fetchComments2();
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire : ', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression du commentaire.',
        });
      }
    },
    reserver(stade) {
      this.$router.push({ path: 'reserver', query: { stade: stade.stadiumName } });
    },
    participer(tournoiId) {
      this.$router.push({ path: 'participer', query: { id: tournoiId } });
    }
  }
};
</script>