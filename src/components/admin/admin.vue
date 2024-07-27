<template>
    <div class="bodyy">
        <div class="login-container">
            <form class="login-form" @submit.prevent="loginAdmin()">
                <center>
                    <h2 style="color: #02c4ce;">Admin</h2>
                </center>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" v-model="password">
                </div>
                <button type="submit">Se connecter</button>
                <div v-if="error" class="alert alert-danger">Email ou mot de passe invalide</div>
            </form>
        </div>
    </div>
</template>

<script>
import { auth, db } from "../../firebase/firebase.js";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth'
export default {
    data() {
        return {
            email: '',
            password: '',
            error: false
        }
    },
    async mounted() {
        this.unsubscribe = auth.onAuthStateChanged(user => { if (user) { this.$router.push('/'); } })
    },
    methods: {
        async loginAdmin() {
            const usersRef = collection(db, 'admin');
            const q = query(usersRef, where("email", "==", this.email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size === 1) {
                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then(() => {
                        this.$router.push('/dashboard');
                    })
                    .catch(error => {
                        this.error = true
                        console.error("Error signing in:", error);
                    });
            } else {
                this.errer = "Il y'a pas de compte avec cette email "
            }
        },
    }
}
</script>

<style scoped>
.bodyy {
    background-image: url('../../assets/back (16).jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 100vh;
}

.login-container {
    margin-top: -150px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form {
    width: 500px;
    padding: 50px;
    border-radius: 0.75rem;
    background-color: #11263b;
    color: white
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-size: 1.25rem;
    display: block;
    color: rgba(156, 163, 175, 1);
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
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.alert {
    margin-top: 10px;
    padding: 10px;
    background-color: #ffcaca;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 3px;
}
</style>
