import mainView from'../App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import listequipes from '../views/listesequipes.vue'
import Contact from '@/views/Contact.vue'
//---------------------------------Creation-----------------------------
import ChooseAccountView from '../views/ChooseAccountView.vue'
import CreateAccount from '../views/CreateAccountView.vue'
import Password from '../views/Password.vue'
//---------------------------------coonection-----------------------------
import verificationemail from '../views/emailVerification.vue'
import seConnecter2 from '../views/seConnecter2'
//---------------------------------Joueure-----------------------------
import compteJoueure from '../components/joueure/monCompte.vue'
import pagededemande from '../components/joueure/demande.vue'
//---------------------------------equipe-----------------------------
import compteEquipe from '../components/equipe/compteEquipe.vue'
import pageStade from '../components/equipe/stades.vue'
import pagetournoi from '../components/equipe/tournoi.vue'
import Recrutement from '../components/equipe/Recrutement.vue'
import Reserver from '../components/equipe/reserver.vue'
import participer from '../components/equipe/participer.vue'
import mesrecrutement from '../components/equipe/MesRecrutement.vue'
import defierEquipe from '../components/equipe/defis/defierEquipe.vue'
import defiscree from '../components/equipe/defis/defiscree.vue'
import defispropose from '../components/equipe/defis/defispropose.vue'
import historique from '../components/equipe/historique.vue'
//---------------------------------stade-----------------------------
import compteStade from '../components/terrain/compteStade.vue'
import creeTournoi from '../components/terrain/creetournoi.vue'
import emploi from '../components/terrain/emploi.vue'
import MesTournoi from '../components/terrain/MesTournoi.vue'
import Tournoi from '../components/terrain/tournoi.vue'
import historiques from '../components/terrain/historique.vue'
import modifierT from '../components/terrain/modifiertournoi.vue'
//---------------------------------Admin-----------------------------
import Admin from '../components/admin/admin.vue'
import Dashboard from '../components/admin/admindashboard.vue'
import commentairesS from '../components/admin/commentairesS.vue'
import commentairesP from '../components/admin/commentairesP.vue'
import defisadmin from '../components/admin/defis.vue'
import equipes from '../components/admin/equipes.vue'
import joueurs from '../components/admin/joueurs.vue'
import recrutements from '../components/admin/recrutements.vue'
import stades from '../components/admin/stades.vue'
import tournois from '../components/admin/tournois.vue'
import reservation from '../components/admin/reservation.vue'
import AjoutAdmin from '../components/admin/AjoutAdmin.vue'
import ContactA from '../components/admin/Contact.vue'
import Repondre from '../components/admin/Repondre.vue'
const routes = [
  {
    name:'mainVue',
    path:('/main'),
    component: mainView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/create',
    name:'Create',
    component:ChooseAccountView
  },
  {
    path:'/account',
    component:CreateAccount
  },
  {
    name:'verificationemail',
    path:'/vericationemail',
    component:verificationemail
  },{
    name:'seConnecter2',
    path:'/seConnecter2',
    component:seConnecter2
  },
  {
    name:'listeEquipes',
    path:'/listequipes',
    component:listequipes
  },
  {
    name:'Password',
    path:'/password',
    component:Password
  },
  ,
  {
    name:'Contact',
    path:'/Contact',
    component:Contact
  },
  //----------------------------JOUEURE-------------------------------
  {
    name: 'comptejoueur',
    path: '/comptejoueur',
    component: compteJoueure
  },
  {
    name:'pageDemande',
    path:'/demande',
    component:pagededemande
  },
  //--------------------------- Equipe-----------------------------------
  {
    name:'compteEquipe',
    path:'/compteEquipe',
    component:compteEquipe
  },
  {
    name:'pageStade',
    path:'/stade',
    component:pageStade
  },
  {
    name:'pagetournoi',
    path:'/tournoi',
    component:pagetournoi
  },
  {
    name:'recrutement',
    path:'/recrutement',
    component:Recrutement
  },
  {
    name:'server',
    path:'/reserver',
    component:Reserver
  },
  {
    name:'participer',
    path:'/participer',
    component: participer
  },
  {
    name:'mesrecrutement',
    path:'/mesrecrutement',
    component: mesrecrutement
  },
  {
    name:'defierEquipe',
    path:'/defierEquipe',
    component:defierEquipe
  },
  {
    name:'defispropose',
    path:'/defispropose',
    component:defispropose
  },
  {
    name:'defiscree',
    path:'/defiscree',
    component:defiscree
  },
  {
    name:'historique',
    path:'/historique',
    component:historique
  },
  //----------------------------Terrain-----------------------------------
  {
    name:'monStade',
    path:'/compteStade',
    component:compteStade
  },
  {
    name:'creetournoi',
    path:'/creetournoi',
    component:creeTournoi
  },
  {
    name:'emploi',
    path:'/emploi',
    component:emploi
  },
  {
    name:'MesTournois',
    path:'/MesTournois',
    component:MesTournoi
  },
  {
    name:'Tournois',
    path:'/Tournois1',
    component:Tournoi
  },
  {
    name:'historiques',
    path:'/historiques',
    component:historiques
  },
  
  {
    name:'modifierT',
    path:'/modifierT',
    component:modifierT
  },
  //----------------------------Admin-----------------------------------
  {
    name:'Admin',
    path:'/admin',
    component:Admin
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component:Dashboard
  },
  {
    name:'commentairesS',
    path:'/commentairesS',
    component:commentairesS
  },
  {
    name:'commentairesP',
    path:'/commentairesP',
    component:commentairesP
  },
  {
    name:'defis',
    path:'/defis',
    component:defisadmin
  },
  {
    name:'equipes',
    path:'/equipes',
    component:equipes
  },
  {
    name:'joueurs',
    path:'/joueurs',
    component:joueurs
  },
  {
    name:'recrutements',
    path:'/recrutements',
    component:recrutements
  },
  {
    name:'stades',
    path:'/stades',
    component:stades
  },
  {
    name:'tournois',
    path:'/tournois',
    component:tournois
  },
  {
    name:'reservation',
    path:'/reservation',
    component:reservation
  },
  {
    name:'AjoutAdmin',
    path:'/AjoutAdmin',
    component:AjoutAdmin
  },
  {
    name:'ContactA',
    path:'/ContactA',
    component:ContactA
  },
  {
    name:'Repondre',
    path:'/Repondre',
    component:Repondre
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
