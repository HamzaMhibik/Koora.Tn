<template>
  <div class="bodyy">
    <br><br>
    <h2> Mot de passe oublié</h2>
    <div>
      <form>
        <div class="a3">
          <div class="a3">
            <label for="email">Entrez votre adresse e-mail :</label>
            <input type="email" v-model="email" placeholder="Adresse e-mail">
          </div>
          <button @click="resetPassword">Réinitialiser mot de passe</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      </form>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";
}

.bodyy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-image: url('../assets/back (16).jpg');
  background-size: cover;
  background-position: center;
}

form {
  width: 100%;
  height: 25vh;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 20px;
  color: rgba(243, 244, 246, 1);
  min-width: 450px;
}

.a3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

}

label {
  display: block;
  color: rgba(156, 163, 175, 1);


}

.all {
  background: #222831;
  height: 100vh;
  width: 100%;
}

.kk {
  padding: 20px;

  width: 100%;


}

h2 {
  color: #00747c;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

input[type="email"],
input[type="password"] {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
  outline: none;
}

button {
  display: block;
  width: 100%;
  background: #007E85;
  padding: 0.75rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: .3s;
  outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: rgba(167, 139, 250);
}

button:hover {
  background: #00686f;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  text-transform: uppercase;
  color: #00686f;
  font-weight: 700;
}

.error-message,
.success-message {
  margin-top: 10px;
  font-size: 14px;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}

@media only screen and (max-width: 380px) {
  .all {
    height: auto;
    padding: 20px;
  }

  .kk {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  form {
    min-width: auto;
  }

  .a3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    font-size: 0.9rem;
  }

  input[type="email"] {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .error-message,
  .success-message {
    font-size: 0.9rem;
  }
}
</style>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
import Swal from 'sweetalert2';

const auth = getAuth();

export default {
  data() {
    return {
      email: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async resetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.email); 
        Swal('Un email de réinitialisation de mot de passe a été envoyé à votre adresse.');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe:', error.message);
        Swal('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe. Veuillez réessayer plus tard.');
      }
    },
  }
}
</script>
