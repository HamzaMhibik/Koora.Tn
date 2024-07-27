<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <header class="sticky-top">
    <div class="menu-btn">
      <div v-if="userDetails.displayName" class="autehntifier">
        <div>
          <i class="fas fa-bars" @click="toggleMenu"></i> <!-- Utilisez une icône de menu -->
          <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        </div>
        <p class="userName" @click="compteUser()">{{ userDetails.displayName }}</p>
        <button type="button" class="decoonection" @click="deconnect">Déconnecter</button>
      </div>
      <div v-else class="Nonauthentifier">
        <div class="partie1">
          <i class="fas fa-bars" @click="toggleMenu"></i> <!-- Utilisez une icône de menu -->
          <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        </div>
        <div class="create">
          <router-link to="/create" class="inscrire">S'inscrire</router-link>
          <select v-model="selectedType" @change="seConnecter" class="SeConnecter">
            <option value="">Se connecter</option>
            <option value="proprietaire">Proprietaire</option>
            <option value="equipe">Equipe</option>
            <option value="joueur">Joueur</option>
          </select>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------Admin-------------------------------------------------------------->
    <nav v-if="userDetails.photoURL === 'admin'" class="navbarA">
      <img src="../src/assets/logo8.png" alt="log" class="logo_3">
      <h1 class="link">Admin Dashboard</h1>
      <div class="auth2">
        <p class="userName">{{ userDetails.displayName }}</p>
        <button type="button" class="decoonection" @click="deconnect">Déconnecter</button>
      </div>
    </nav>
    <!-- ---------------------------------------Equipe----------------------------------------------------------------------->
    <nav v-else-if="userDetails.photoURL === 'equipe' && userDetails.emailVerified" class="navbarA">
      <div class="Menu">
        <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        <router-link to="/">Home</router-link>
        <router-link to="/stade">Stades</router-link>
        <router-link to="/tournoi">Tournoi</router-link>
        <router-link to="/listequipes">Equipes</router-link>
        <router-link to="/defispropose">Défis</router-link>
        <router-link to="/mesrecrutement">Recrutements</router-link>
        <router-link to='/historique'>Historique</router-link>
        <router-link to="/Contact">Contact</router-link>
      </div>
      <div class="auth2">
        <p class="userName" @click="this.$router.push('compteEquipe')">Equipe1</p>
        <button type="button" class="decoonection" @click="deconnect">Déconnecter</button>
      </div>
    </nav>
    <!-- ---------------------------------------------Joueur--------------------------------------------------------------- -->
    <nav v-else-if="userDetails.photoURL === 'joueur' && userDetails.emailVerified" class="navbarA">
      <div class="Menu">
        <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        <router-link to="/" class="link">Home</router-link>
        <router-link to="/demande" class="link">Demande</router-link>
        <router-link to="/stade" class="link">Stades</router-link>
        <router-link to="/tournoi" class="link">Tournoi</router-link>
        <router-link to="/listequipes" class="link">Equipes</router-link>
        <router-link to="/Contact">Contact</router-link>
      </div>
      <div class="auth2">
        <p class="userName" @click="this.$router.push('compteJoueur')">{{ userDetails.displayName }}</p>
        <button type="button" class="decoonection" @click="deconnect">Déconnecter</button>
      </div>
    </nav>
    <!-- --------------------------------------------Stade------------------------------------------------------------------>
    <nav v-else-if="userDetails.photoURL === 'proprietaire' && userDetails.emailVerified" class="navbarA">
      <div class="Menu">
        <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        <router-link to="/">Home</router-link>
        <router-link to="/emploi">Emploi</router-link>
        <router-link to="/MesTournois">Mes Tournois</router-link>
        <router-link to='/historiques'>Historique</router-link>
        <router-link to="/stade">Stades</router-link>
        <router-link to="/tournoi">Tournoi</router-link>
        <router-link to="/listequipes">Equipes</router-link>
        <router-link to="/Contact">Contact</router-link>
      </div>
      <div class="auth2">
        <p class="userName" @click="this.$router.push('compteStade')">{{ userDetails.displayName }}</p>
        <button type="button" class="decoonection" @click="deconnect">Déconnecter</button>
      </div>
    </nav>
    <!-- ------------------------------------------------NonVerifier------------------------------------------------------------ -->
    <nav v-else-if="userDetails.photoURL && !userDetails.emailVerified" class="navbarA">
      <div class="Menu">
        <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        <router-link to="/">Home</router-link>
        <router-link to="/stade">Stades</router-link>
        <router-link to="/tournoi">Tournoi</router-link>
        <router-link to="/listequipes">Equipes</router-link>
        <router-link to="/Contact">Contact</router-link>
        <router-link to="/vericationemail">Valide Email</router-link>
      </div>
      <div class="auth2">
        <p class="userName">{{ userDetails.displayName }}</p>
        <button type="button" class="decoonection" @click="deconnect">Déconnecter</button>
      </div>
    </nav>
    <!-- ------------------------------------------------User------------------------------------------------------------ -->
    <nav v-else class="navbarA">
      <div class="Menu">
        <img src="../src/assets/logo8.png" alt="log" class="logo_1">
        <router-link to="/">Home</router-link>
        <router-link to="/stade">Stades</router-link>
        <router-link to="/tournoi">Tournoi</router-link>
        <router-link to="/listequipes">Equipes</router-link>
        <router-link to="/Contact">Contact</router-link>
      </div>
      <div class="auth3">
        <router-link to="/create" class="inscrire">S'inscrire</router-link>
        <select v-model="selectedType" @change="seConnecter" class="SeConnecter">
          <option value="">Se connecter</option>
          <option value="proprietaire">Terrain</option>
          <option value="equipe">Equipe</option>
          <option value="joueur">Joueur</option>
        </select>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";
}

.sticky-top {
  position: sticky;
}

.navbarA {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #11263b;
}

.Menu {
  width: 100% !important;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-left: auto;
}

.marqueret {
  display: flex;
  align-items: center;
  text-align: center;
}

.auth2 {
  display: flex;
  text-align: center;
  justify-content: center;
}

.auth3 {
  display: flex;
  text-align: center;
  justify-content: center;
}

.logo_1 {
  margin: 0;
  width: 160px;
  height: 80px;
  border-right: 2px solid rgb(255, 255, 255);
  background-color: #007E85;
}

.logo_2 {
  padding: 0 20px;
  margin: 0;
  width: 200px;
  height: 80px;
  background-color: #007E85;
}
.logo_3 {
  padding: 0 20px;
  margin: 0;
  width: 200px;
  height: 80px;
}

nav {
  a {
    text-decoration: none;
    font-weight: bold;
    color: #fff;
    font-size: 1.25rem;

    &.router-link-exact-active {
      padding: 10px;
      background-color: #007E85;
    }
  }

  a:hover {
    color: #bd6c03;
  }
}

.inscrire {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
  font-size: 1.25rem;
  padding: 10px;
  background-color: #007E85;
  padding: 10px;
  margin-right: 10px;
  border-radius: 4rem;
}

select {
  border: none;
  padding: 10px 20px;
  outline: none;
  border-radius: 0;
  font-family: "poppins";
  font-weight: 500;
  cursor: pointer;
  border-radius: 4rem;
}

.fas {
  cursor: pointer;
}

h1 {
  color: white;
}

.menu-btn {
  display: none;
}

.menu-btn img {
  margin-right: 10px;
}

.btn {
  margin-top: 5px;
  height: 50%;
}

.create {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.userName {
  cursor: pointer;
  padding: 9px 5px;
  margin-top: 15px;
  font-size: 1.3rem;
  font-weight: bolder;
  margin-right: 10px;
  color: #ffffff;
  background-color: #007E85;
  white-space: nowrap;
  border-radius: 4px;
}

.userName:hover {
  background-color: #004447;
  color: #fdfdfc
}

.decoonection {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
  font-size: 1.25rem;
  height: 50%;
  margin-top: 15px;
  margin-right: 5px;
  padding: 10px;
  background-color: #bd6c03;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* Ajout de transition pour un effet de survol */
}

.decoonection:hover {
  background-color: #ff9100;
  /* Couleur de fond au survol */
}

@media screen and (max-width: 768px) {
  .menu-btn {
    display: flex;
    font-size: 1.5rem;
    color: white;
    margin-left: 10px;
    justify-content: center;
    /* Ajouté pour centrer horizontalement */
    align-items: center;
    /* Ajouté pour centrer verticalement */
    width: 100%;
    /* Ajouté pour s'assurer que le conteneur prend toute la largeur */
  }

  .navbarA {
    display: none;
  }

  .partie1 {
    display: flex;
    align-items: center;
    margin-left: 10px;

  }

  .sticky-top {
    position: relative;
    background-color: #11263b;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
  }

  .autehntifier {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    /* Ajouté pour s'assurer que le conteneur prend toute la largeur */
  }

  .Nonauthentifier {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* Ajouté pour s'assurer que le conteneur prend toute la largeur */
  }

  .auth3 {
    display: none;
  }

  .logo_1 {
    display: none;
  }

  .Menu {
    width: 100%;
    margin: 10px 0;
    flex-direction: column;
    align-items: center;
  }

  .auth2 {
    display: none;
  }

  select {
    font-size: 1rem
  }

  .userName {
    padding: 6px 5px;
    margin: 10px 0;
    margin-left: 90px;
    color: white;
  }

  .create {
    margin-left: 90px;
  }

  .decoonection {
    margin-top: 0;
    font-size: 1.1rem;
    padding: 8px;
    margin-right: -10px
  }

}

@media screen and (max-width: 600px) {
  .logo_2 {
    display: none;
  }

  .inscrire {
    margin-right: 80px;
    margin-left: -30px;
    font-size: 1.1rem;
  }

  .autehntifier {
    justify-content: space-between;
  }

  .userName {
    margin: 0 10px;
    color: white;
    background-color: #01a3ac;
    padding: 5px;
    font-size: 1.25rem;
  }

  .create {
    margin-left: 35px;
  }

  .menu-btn {
    margin-left: 0;
  }

  .decoonection {
    font-size: 0.9rem;
    padding: 6px;
    height: 40px
  }
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /*background-color: #adadad;*/
  ;
}
</style>
<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
<script>
import { auth } from "./firebase/firebase";
import { signOut } from 'firebase/auth'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      selectedType: '',
      usertype: ''
    };
  },
  computed: {
    userDetails() {
      this.usertype = this.$store.state.userDetails.photoURL;
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchUserDetails');
  },
  methods: {
    async deconnect() {
      Swal.fire({
        title: "Se déconnecter?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Annuler",
        denyButtonText: `Se déconnecter`
      }).then(async (result) => {
        if (result.isDenied) {
          // Redirection vers une autre page
          this.$router.push('/');

          // Déconnexion et actualisation après un court délai
          setTimeout(async () => {
            await signOut(auth)
              .then(() => {
                this.$store.commit('RESET_PHOTO_URL');
                location.reload(); // Actualisation de la page
              })
              .catch(error => {
                console.error('Error signing out:', error);
              });
          }, 1000); // Délai d'une seconde avant la déconnexion et l'actualisation
        }
      });
    },
    compteUser() {
      switch (this.usertype) {
        case 'proprietaire':
          this.$router.push('compteStade');
          break;
        case 'equipe':
          this.$router.push('compteEquipe');
          break;
        case 'joueur':
          this.$router.push('compteJoueur');
          break;
        default:
          break;
      }
    },
    async seConnecter() {
      switch (this.selectedType) {
        case 'proprietaire':
          await this.$router.push({ path: 'seConnecter2', query: { type: 'proprietaire' } });
          window.location.reload();
          break;
        case 'equipe':
          await this.$router.push({ path: 'seConnecter2', query: { type: 'equipe' } });
          window.location.reload();
          break;
        case 'joueur':
          await this.$router.push({ path: 'seConnecter2', query: { type: 'joueur' } });
          window.location.reload();
          break;
        default:
          break;
      }
    },
    toggleMenu() {
      const navbar = document.querySelector('.navbarA');
      navbar.style.display = navbar.style.display === 'none' ? 'flex' : 'none';
    }
  }
};
</script>
