import SignUp from './components/SignUp.vue'
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
    {path:'/SignIn', component: SignUp, meta:{title:'Sign In'}},
    {path: "/group-page", component: GroupPg, meta:{title:'Join Group'}},
    {path: "/home-page", component: HomePage, meta:{title:'Home'}},
    {path: "/About", component: About, meta:{title:'About'}},
    {path: "/profile", component: Profile, meta:{title:'Profile'}},
    {path: "/myprofile", component: MyProfile, meta:{title:'Profile'}},
    {path: "/users/:userId", component: Profile, props: true, meta : {title : 'User Profile'}},
    {path: "/Create-Post", component: CreatePost, meta:{title:'Create Post'}},
    {path: "/Contact", component: Contact, meta:{title:'Contact Us'}},
    {path: "/Register", component: Register, meta:{title:'Register'}}
]