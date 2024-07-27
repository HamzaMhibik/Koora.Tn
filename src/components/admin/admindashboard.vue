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
      <div class="contenu">
        <div class="stade-container"><br>
          <h2> Derniers Stades Ajoutés</h2>
          <div class="stades">
            <div v-for="(stade, index) in stades" :key="index" class="stade">
              <div class="stade-image">
                <img v-if="stade.images && stade.images.length > 0&& index<3" :src="stade.images[0].url" alt="Stade Image"
                  class="imgstade">
              </div>
              <div class="stade-details" v-if="index<3">
                <h3>{{ stade.stadiumName }}</h3>
                <p><strong>Ville:</strong> {{ stade.ville }}</p>
                <p><strong>Responsable:</strong> {{ stade.nom }}</p>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="stade-container">
          <h2> Derniers Tournois Ajoutés</h2>
          <div class="stades">
            <div v-for="(tournoi, index) in tournois" :key="index" class="stade">
              <div class="stade-image">
                <img v-if="tournoi.images && tournoi.images.length > 0" :src="tournoi.images[0].url" alt="Stade Image"
                  class="imgtournoi">
              </div>
              <div class="stade-details">
                <h2>{{ tournoi.nom_tournoi }}</h2>
                <p><strong>stade:</strong> <span @click="voir(tournoi)" class="stade">{{
                  tournoi.nom_stade
                    }}</span></p>
                <p><strong>Date de début:</strong> {{ tournoi.date_debut }}</p>
                <p><strong>Ville:</strong> {{ tournoi.ville }}</p>
              </div>
            </div>
          </div>
        </div>
        <br>
        <h1>Utilisation de plateforme</h1>
        <br>
        <div class="content">
          <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Stades</h5>
              <p class="card-text">Nombre des stades enregistré: <center>
                  <h1>{{ stades2.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Equipe</h5>
              <p class="card-text">Nombre des equipes creé: <center>
                  <h1>{{ equipes.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Joueurs</h5>
              <p class="card-text">Nombre des joueurs enregistré: <center>
                  <h1>{{ joueurs.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Tournois</h5>
              <p class="card-text">Nombre des tournois organisé: <center>
                  <h1>{{ tournois2.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Commentaires de plateform</h5>
              <p class="card-text">Nombre des commentaires sur la plateform: <center>
                  <h1>{{ commentP.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-dark bg-info mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Reservations</h5>
              <p class="card-text">Nombre des Reservation affectué: <center>
                  <h1>{{ reservations.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Defis</h5>
              <p class="card-text">Nombre des defis creé: <center>
                  <h1>{{ defis.length }}</h1>
                </center>
              </p>
            </div>
          </div>
          <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Demandes de recrutement</h5>
              <p class="card-text">Nombre des demandes de recrutement creé: <center>
                  <h1>{{ recrutements.length }}</h1>
                </center>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db, storage, auth } from "../../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import navbar from "../admin/NavBar"
export default {
  components: {
    navbar
  },
  data() {
    return {
      commentS: [],
      commentP: [],
      defis: [],
      equipes: [],
      joueurs: [],
      demandes: [],
      reservations: [],
      stades2: [],
      tournois2: [],
      recrutements: [],
      stades: [],
      tournois: [],
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.getStades()
    await this.fetchImagesForStades()
    await this.getTournois()
    await this.getImagesForTournoi()
    await this.fetchTournois()
    await this.fetchCommentP()
    await this.fetchCommentS()
    await this.fetchDefis()
    await this.fetchEquipes()
    await this.fetchJoueurs()
    await this.fetchDemandesRecrutement()
    await this.fetcheReservation()
    await this.fetchStades()
    await this.fechrecrutement()
    await this.$store.dispatch('fetchUserDetails');
  },
  methods: {
    async fetchCommentP() {
      try {
        const resulat = await getDocs(collection(db, 'commentaire-plateform'));
        resulat.forEach((doc) => {
          this.commentP.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires : ', error);
      }
    },
    async fetchCommentS() {
      try {
        const resulat = await getDocs(collection(db, 'comments'));
        resulat.forEach((doc) => {
          this.commentS.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires : ', error);
      }
    },
    async fetchDefis() {
      try {
        const resulat = await getDocs(collection(db, "defis"));
        this.defis = resulat.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Erreur lors de la récupération des défis :", error);
      }
    },
    async fetchEquipes() {
      try {
        const resulat = await getDocs(collection(db, 'equipes'));
        resulat.forEach((doc) => {
          this.equipes.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes : ', error);
      }
    },
    async fetchJoueurs() {
      const resulat = await getDocs(collection(db, 'joueures'));
      resulat.forEach((doc) => {
        this.joueurs.push({ id: doc.id, ...doc.data() });
      });
    },
    async fetchStades() {
      const stadesRef = collection(db, 'proprietaire');
      const resulat = await getDocs(stadesRef);
      resulat.forEach(doc => {
        const stadeData = { id: doc.id, ...doc.data() };
        this.stades2.push(stadeData);
      });
    },
    async fetchDemandesRecrutement() {
      try {
        const resulat = await getDocs(collection(db, "recrutement"));
        resulat.forEach(doc => {
          this.demandes.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des recrutements :", error);
      }
    },
    async fetcheReservation() {
      try {
        const resulat = await getDocs(collection(db, 'historiquedereservation'));
        resulat.forEach((doc) => {
          this.reservations.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des reservations : ', error);
      }
    },
    async fetchTournois() {
      const tournoisRef = collection(db, 'tournois');
      const resulat = await getDocs(tournoisRef);
      resulat.forEach(doc => {
        const stadeData = { id: doc.id, ...doc.data() };
        this.tournois2.push(stadeData);
      });
    },
    async fechrecrutement() {
      const tournoisRef = collection(db, 'recrutement');
      const resulat = await getDocs(tournoisRef);
      resulat.forEach(doc => {
        const stadeData = { id: doc.id, ...doc.data() };
        this.recrutements.push(stadeData);
      });
    },
    /* ---------------------------------------------------------------------------------------------------- */
    async getStades() {
      const colRef = collection(db, 'proprietaire');
      const resulat = await getDocs(colRef);
      resulat.forEach((doc) => {
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
        const resulat = await getDocs(collection(db, "tournois"));
        const tournois = [];
        for (const doc of resulat.docs) {
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

        tournois.sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut));

        this.tournois = tournois.slice(0, 3);
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


  }
}
</script>
<style scoped>
.bodyy{
  background-color: #e4e3e3;
}
.container {
  margin-left: 200px;
}
.router-link-exact-active {
  padding: 10px;
  background-color: #555;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.card {
  width: calc(33.33% - 20px);
  /* Pour que chaque carte occupe environ un tiers de la largeur, en tenant compte de l'espace entre les cartes */
  margin-bottom: 20px;
  /* Ajoute un espace en bas de chaque carte */
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



/* -----------------------------------------------------------------------stade---------------------------------------------------------------- */
.stade-container {
  width: 108%;
}

.stades {
  margin-top: 20px;
  padding: 10px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between
}

.stade-image {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.stade {
  display: flex;
}

.stade-details {
  padding: 15px;
}

.stade-details h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: rgb(0, 196, 196);
}

.stade-details p {
  margin: 5px 0;
  font-size: 1.25rem;
  color: rgb(0, 0, 0);
}

.stade-details p strong {
  font-weight: bold;
}

.imgstade {
  width: 300px;
  height: 180px
}

.imgtournoi {
  width: 200px;
}
</style>