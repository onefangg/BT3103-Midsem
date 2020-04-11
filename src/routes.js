import SignIn from './components/SignIn.vue'
import GroupPg from './components/GroupPg.vue'
import HomePage from './components/HomePage.vue'
import About from './components/About.vue'
import Profile from './components/Profile.vue'
import MyProfile from './components/MyProfile.vue'
import CreatePost from './components/CreatePost.vue'
import Contact from './components/Contact.vue'
import Register from './components/Register.vue'



export default [
    {path:"/", component: HomePage, meta:{title:'Home'}},
    {path:'/Sign-In', component: SignIn, meta:{title:'Sign In'}},
    {path: "/Group-Page", component: GroupPg, meta:{title:'Join Group', requiresAuth: true}},
    {path: "/Home-Page", component: HomePage, meta:{title:'Home', requiresAuth: true}},
    {path: "/About", component: About, meta:{title:'About'}},
    {path: "/profile", component: Profile, meta:{title:'Profile', requiresAuth: true}},
    {path: "/myprofile", component: MyProfile, meta:{title:'Profile', requiresAuth: true}},
    {path: "/users/:userId", component: Profile, props: true, meta : {title : 'User Profile', requiresAuth: true}},
    {path: "/Create-Post", component: CreatePost, meta:{title:'Create Post', requiresAuth: true}},
    {path: "/Contact", component: Contact, meta:{title:'Contact Us'}},
    {path: "/Register", component: Register, meta:{title:'Register'}}
]
