<template>
    <div class="bodyy">
        <div class="kk">
            <form @submit.prevent="submitRecruitmentRequest">
                <h2>Creer un demande de recrutement</h2><br>
                <label for="age_min">Âge minimal du joueur :</label><br>
                <input type="number" v-model="ageMin" required><br><br>
                <label for="age_max">Âge maximal du joueur :</label><br>
                <input type="number" v-model="ageMax" required><br><br>
                <label for="poste">Poste :</label><br>
                <select v-model="poste" required>
                    <option value="">Sélectionner un poste</option>
                    <option value="gardien">Gardien</option>
                    <option value="défenseur">Défenseur</option>
                    <option value="milieu">Milieu</option>
                    <option value="attaquant">Attaquant</option>
                </select><br><br>
                <label for="niveau">Niveau :</label><br>
                <select v-model="niveau" required>
                    <option value="">Sélectionner un niveau</option>
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="professionnel">Professionnel</option>
                </select><br><br>
                <input type="submit" value="Soumettre la demande">
            </form>
        </div>
    </div>
</template>
<style scoped>
form {
    background-color: #007E85;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px 50px;
    width: 600px;
    margin: 50px auto;
}

.bodyy {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 20px;
    background-color: #48c2b2;
}


label {
    display: block;
    margin-bottom: 10px;
    color: #ffffff;
}

input,
select {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input[type="submit"] {
    background-color: #118e26;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
}

h2 {
    text-align: center;
    color: #00f2ff;
}

input[type="submit"]:hover {
    background-color: #153a1f;
}

@media only screen and (max-width: 380px) {
    form {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 400px;
        /* Largeur pour les écrans plus larges */
        margin: 50px auto;
    }

    .bodyy {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        background: #f0f0f0;
        padding: 20px;
    }

    h2 {
        text-align: center;
        color: #333;
    }

    label {
        display: block;
        margin-bottom: 10px;
        color: #333;
    }

    input,
    select {
        width: calc(100% - 20px);
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input[type="submit"] {
        background-color: #0f3816;
        color: #fff;
        border: none;
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 5px;
    }

    input[type="submit"]:hover {
        background-color: #153a1f;
    }

    @media only screen and (max-width: 380px) {
        form {
            width: calc(100% - 40px);
            /* Réduire la largeur du formulaire */
            padding: 15px;
            /* Réduire le padding du formulaire */
        }

        input[type="submit"] {
            padding: 8px 16px;
            /* Réduire le padding du bouton */
            font-size: 14px;
            /* Réduire la taille de la police du bouton */
        }
    }
}
</style>
<script>
import { db, storage, auth } from "../../firebase/firebase"; // Import db and storage from init.js
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage"
import Swal from 'sweetalert2'
export default {
    name: 'RecruitmentForm',
    data() {
        return {
            storedEmail: '',
            poste: '',
            niveau: '',
            equipe: null,
            logoUrl: '',
            ageMin: null,
            ageMax: null,
            joueurs: [],
        }
    },
    computed: {
        userDetails() {
            return this.$store.state.userDetails;
        },
    },
    async mounted() {
        await new Promise((resolve) => {
            this.unsubscribe = auth.onAuthStateChanged((user) => {
                if (!user) { this.$router.push('/'); resolve(); }
                else if (user.photoURL !== 'equipe') { this.$router.push('/'); resolve(); }
                else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
                else { this.user = user; resolve(); }
            });
        });
        this.storedEmail = this.userDetails?.email ?? '';
        this.fetchEquipeByEmail(this.storedEmail);
    },
    methods: {
        async fetchEquipeByEmail(storedEmail) {
            try {
                const q = query(collection(db, "equipes"), where("email", "==", storedEmail));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async doc => {
                    this.equipe = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document

                    // Récupérer l'URL du logo depuis Firebase Storage
                    const storageRef = ref(storage, `logos/${this.equipe.nomEquipe}`);
                    this.logoUrl = await getDownloadURL(storageRef);
                    console.log("logoUrl from fetchEquipeByEmail " + this.logoUrl)
                });
            } catch (error) {
                console.error("Erreur lors de la récupération de l'équipe : ", error);
            }
        },
        async submitRecruitmentRequest() {
            Swal.fire({
                title: "Soumettre le demande?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Oui",
                denyButtonText: `Non`
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        // Attendre la récupération des détails de l'équipe, y compris l'URL du logo

                        // Une fois que les détails de l'équipe ont été récupérés, soumettre la demande de recrutement
                        addDoc(collection(db, "recrutement"), {
                            ageMin: this.ageMin,
                            ageMax: this.ageMax,
                            poste: this.poste,
                            ville: this.equipe.ville,
                            niveau: this.niveau,
                            numero: this.equipe.telephone,
                            email: this.storedEmail,
                            equipename: this.equipe.nomEquipe,
                            ville: this.equipe.ville,
                            logo: this.logoUrl,
                            joueurs: this.joueurs
                        });
                        console.log("Demande de recrutement soumise avec succès !");
                        // Réinitialiser les champs après la soumission
                        this.ageMin = null;
                        this.ageMax = null;
                        this.poste = '';
                        this.niveau = '';
                        this.$router.push('mesrecrutement')
                    } catch (error) {
                        console.error("Erreur lors de la soumission de la demande de recrutement :", error);
                    }
                    Swal.fire("demande enregistré", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("demande n'est pas enregisté", "", "info");
                }
            });

        }
    }
}
</script>
