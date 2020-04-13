<template>
<div>
<nb>
</nb>

<div class="container">
  <div class="row">
    <div class="col-md-12">
        <div class="top-breadcrumb">
        </div>
    </div>
  </div>
        <div class="img" style="    background-image: linear-gradient(150deg, rgba(63, 174, 255, .3)15%, rgba(63, 174, 255, .3)70%, rgba(63, 174, 255, .3)94%), url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);height: 350px;background-size: cover;"></div>
        <div class="card social-prof">
            <div class="card-body">
                <div class="wrapper">
                    <b-img src="https://i.picsum.photos/id/58/125/125.jpg" alt="" class="user-profile" width="150px" height="150px" rounded="circle"></b-img>
                    <h2>{{details.FirstName}}</h2>
                    <p>I am from {{details.Major}} </p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 gedf-main">

                <div class="card social-timeline-card">
                    <div class="card-header">
                        <div class="nav nav-tabs card-header-tabs" id="myTab" role="tab4list">
                                <h5 class="nav-link active" id="posts-tab">My Profile</h5>
                                
                        </div>
                    </div>
                    
                    <div class="profiletab">
                      <b-container class="bv-example-row">
                        <b-row>
                          <b-col cols = "6">
                            <h5>First Name: {{details.FirstName}}</h5>
                          </b-col >
                          <b-col cols = "6">
                            <h5>Last Name: {{details.LastName}}</h5>
                          </b-col>
                        </b-row>
                      </b-container>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>

</template>

<script>
import NavBar from './NavBar.vue'
import firebase from 'firebase'
import database from '../firebase.js'

export default {
    name: 'ProfileNew',
    components: {
        'nb':NavBar
      },
      data () {
      return {
        showModal: false,
        user: null,
        email: '',
        id: '',
        details: {
          FirstName:'',
          GroupsCreated:[],
          GroupsJoined:[],
          LastName:'',
          Major:'',
          NUSNET: '',
          Password: '',
          UserName: '',
          Year: ''
        }
      }
    },
    methods: {
        submitChanges: function() {
            database.collection('Users')
                .doc(this.id)
                .update({ 
                    FirstName: this.details.FirstName,
                    LastName: this.details.LastName,
                    Major: this.details.Major,
                    UserName: this.details.UserName,
                    Year: this.details.Year   
                })
                .then(() => {
                    console.log('account details updated!')
                    this.showModal = true;
                })
            }
        
    },
  created: function () {
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user;
        vm.email = user.email;
        vm.email = vm.email.substring(0, vm.email.indexOf("@"))
        const emailToCheck = vm.email;
        database.collection('Users')
            .where('NUSNET' , '==', emailToCheck)
            .get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    vm.id = doc.id
                    vm.details.FirstName = doc.data().FirstName;
                    vm.details.LastName = doc.data().LastName;
                    vm.details.Major = doc.data().Major;
                    vm.details.UserName = doc.data().UserName;
                    vm.details.Year = doc.data().Year;
                })
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
             });
      } else {
        vm.user = null;
      }
    });
  }
  }
</script>

<style scoped>
body {
    background-color: #f0f6ff;
    color: #28384d;

}

.profiletab {
  background-color:#fff;
  text-align:left
}
/*social */
.card-one {
    position: relative;
    width: 300px;
    background: #fff;
    box-shadow: 0 10px 7px -5px rgba(0, 0, 0, 0.4);
}
.card {
    margin-bottom: 35px;
    box-shadow: 0 10px 20px 0 rgba(26, 44, 57, 0.14);
    border: none;
}

.follower-wrapper li {
    list-style-type: none;
    color: #fff;
    display: inline-block;
    float: left;
    margin-right: 20px;
}


.text-blue {
    color: #3afe;
}


.info-card h4 {
    font-size: 15px;
}

.info-card h2 {
    font-size: 18px;
    margin-bottom: 20px;
}

.info-card i {
    color: #3afe;
}

.card-one {
    position: relative;
    width: 300px;
    background: #fff;
    box-shadow: 0 10px 7px -5px rgba(0, 0, 0, 0.4);
}



.card-one h3 {
    position: relative;
    margin: 80px 0 30px;
    text-align: center;
}

.card-one h3::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    margin-left: -15px;
    width: 30px;
    height: 1px;
    background: #000;
}

.card-one .desc {
    padding: 0 1rem 2rem;
    text-align: center;
    line-height: 1.5;
    color: #777;
}

.card-one .footer {
    position: relative;
    padding: 1rem;
    background-color: #3afe;
    text-align: center;
}

.card-one .footer a {
    padding: 0 1rem;
    color: #e2e2e2;
    transition: color .4s;
}

.card-one .footer a:hover {
    color: #c8c;
}

.card-one .footer::before {
    content: '';
    position: absolute;
    top: -27px;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-bottom-color: #3afe;
}

.card-title, .card .card-title, .card-2 .card-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
}
a {
    color: #333;
}



/*end social*/
</style>
