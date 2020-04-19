<template>
  <div>
    <nb></nb>
    <div id="my-container" class="hi" align="center">
      <div class="img" id='main'
        style="background-image: linear-gradient(150deg, rgba(63, 174, 255, .3)15%, rgba(63, 174, 255, .3)70%, rgba(63, 174, 255, .3)94%), url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);height: 200px;width:100%;background-size: cover;">
      </div>
      <div class="card social-prof" id='img1' style = "height: 290px">
        <div class="card-body">
          <div class="wrapper">
            <b-img v-bind:src="details.Picture" alt="" class="user-profile" width="100px" height="100px"
              rounded="circle"></b-img>
            <h4 id = "name_field">{{details.FirstName}} {{details.LastName}}</h4>
            <h6 id = "username_field">@{{$route.params.userId}}</h6>
            <h6 id = "yearmajor_field">Year {{details.Year}} {{details.Major}}</h6>
            <b-button v-if="$route.params.userId===this.myaccid" id="popover-reactive-1" v-on:click="changePic()">Change My Picture</b-button>
            <b-button class='ml-3' v-if="$route.params.userId===this.myaccid" variant="secondary" to="/Edit-Details">Edit Details</b-button>
          </div>

          <b-popover target="popover-reactive-1" triggers="click" :show.sync="popoverShow" placement="auto"
            container="my-container" ref="popover" @show="onShow" @shown="onShown" @hidden="onHidden">
            <template v-slot:title>
              <b-button @click="onClose" class="close" aria-label="Close">
                <span class="d-inline-block" aria-hidden=true>&times;</span>
              </b-button>
              Change my profile picture
            </template>

            <div>
              <b-form-group label="URL" label-for="popover-input-1" label-cols="3" :state="input1state" class="mb-1"
                description="Enter URL" invalid-feedback="This field is required">
                <b-form-input ref="input1" id="popover-input-1" v-model="input1" :state="input1state" size="sm">
                </b-form-input>
              </b-form-group>

              <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
              <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
            </div>
          </b-popover>
        </div>
      </div>
      <div>
        
        <b-row>
          <b-col>
            <!-- This card contains 4 tabs - Profile (active), Group Created, Groups Joined, User Dashboard -->
            <b-card no-body>
              <!-- setting active makes it the default tab -->
              <b-tabs pills card active>               
                <b-tab title='Group Joined' >
                  <h1>Project Groups</h1>
                  <span class = 'divider'></span>
                  <br>
                  <b-row align-h="start">
                      <ProjectGroup v-for = "(item) in this.details['GroupsJoined']" v-bind:key = "item.id"  
                      v-bind:module = "item.ModuleCode"
                      v-bind:userId = "item.Poster"
                      v-bind:post_desc = "item.Description"
                      v-bind:post_status = "item.Limit > item.UserNames.length ? item.Limit- item.UserNames.length + ' more needed' : 'Closed'"
                      v-bind:post_date = "item.DatePosted.toDate()"
                      v-bind:members = "item.UserNames"
                      :doc_id = "item.id"
                      :hide_post = "item.hidden"
                      ></ProjectGroup>
                      <div v-show = "this.details['GroupsJoined'].length == 0" class='ml-3'>
                        No Project Groups joined yet.
                      </div>
                  </b-row>

                  <br>
                  <h1>Study Groups</h1>
                  <span class = 'divider'></span>
                  <br>
                  <b-row align-h= "start">
                    <StudyGroup v-for = "(item) in this.details['StudyJoined']" 
                    :key = "item.id"
                    :groupName = "item.GroupName"
                    :userId = "item.Poster" 
                    :post_desc = "item.Description"
                    :mod_code = "item.ModuleCode"
                    :post_status= "item.UserNames.length < item.Limit ? item.Limit- item.UserNames.length + ' Needed' : 'Closed'"
                    :post_date = "item.DatePosted.toDate()"
                    :location = "item.Location"
                    :members = "item.UserNames"
                    :doc_id = "item.id"
                    :hide_post = "item.hidden">
                    </StudyGroup>
                    <div v-show = "this.details['StudyJoined'].length == 0" class='ml-3'>
                        No Study Groups joined yet.
                      </div>  
                  </b-row>
                </b-tab>

                <b-tab title='Groups Created'>
                  <h1>Project Groups</h1>
                  <span class = 'divider'></span>
                  <br>
                  <b-row align-h="start">
                      <ProjectGroup v-for = "(item) in this.details['GroupsCreated']" v-bind:key = "item.id"  
                      v-bind:module = "item.ModuleCode"
                      v-bind:userId = "item.Poster"
                      v-bind:post_desc = "item.Description"
                      v-bind:post_status = "item.Limit > item.UserNames.length ? item.Limit- item.UserNames.length + ' more needed' : 'Closed'"
                      v-bind:post_date = "item.DatePosted.toDate()"
                      v-bind:members = "item.UserNames"
                      :doc_id = "item.id"
                      :hide_post = "item.hidden"
                      ></ProjectGroup>
                    <div v-show = "this.details['GroupsCreated'].length == 0" class='ml-3'>
                        No Project Groups created yet.
                    </div> 
                  </b-row>

                  <br>
                  <h1>Study Groups</h1>
                  <span class = 'divider'></span>
                  <br>
                  <b-row align-h= "start">
                    <StudyGroup v-for = "(item) in this.details['StudyCreated']" 
                      :key = "item.id"
                      :groupName = "item.GroupName"
                      :userId = "item.Poster" 
                      :post_desc = "item.Description"
                      :mod_code = "item.ModuleCode"
                      :post_status= "item.UserNames.length < item.Limit ? item.Limit- item.UserNames.length + ' Needed' : 'Closed'"
                      :post_date = "item.DatePosted.toDate()"
                      :location = "item.Location"
                      :members = "item.UserNames"
                      :doc_id = "item.id"
                      :hide_post = "item.hidden">
                      </StudyGroup>
                      <div v-show = "this.details['StudyCreated'].length == 0" class='ml-3'>
                        No Study Groups created yet.
                      </div>          
                  </b-row>
                </b-tab>

                <b-tab title='User Dashboard' id='dashboard'>
                  <b-row>
                    <b-col xl="4">
                      <div v-if="!chart1show" style="text-align: center; width: 100%; height: 100%; position: absolute; left: 0; top: 100px; z-index: 20;">
                        <b>No groups created or joined yet!</b>
                      </div>
                    <pie-chart :chartdata="chartData" :options="chartOptions"/>
                    </b-col>
                  
                    <b-col xl="4">
                      <div v-if="!chart2show" style="text-align: center; width: 100%; height: 100%; position: absolute; left: 10px; top: 100px; z-index: 20;">
                        <b>No groups joined yet!</b>
                      </div>
                    <bar-chart :chartdata="chartData2" :options="chartOptions2"/>
                    </b-col>

                    <b-col xl="4">
                      <div v-if="!chart3show" style="text-align: center; width: 100%; height: 100%; position: absolute; left: 10px; top: 100px; z-index: 20;">
                        <b>No groups created yet!</b>
                      </div>
                    <bar-chart :chartdata="chartData3" :options="chartOptions3"/>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar.vue'
  import firebase from 'firebase'
  import database from '../firebase.js'
  import ProjectGroup from './ProjectGroup.vue'
  import StudyGroup from './StudyGroup.vue'
  import Pie from '../Pie.js'
  import Bar from '../Bar.js'

  export default {
    name: 'Profile',
    components: {
      'nb': NavBar,
      ProjectGroup,
      StudyGroup,
      'pie-chart': Pie,
      'bar-chart': Bar
    },
    data() {
      return {
        /* Data for Group types graph */
        chart1show:true,
        chartData: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor:[],
              borderWidth:0.5,
              borderColor:'#000'
            }
          ]
        },
        chartOptions: {
            title:{
                display:true,
                text:'Breakdown of all Group Joined and Created',
                fontColor:'Black',
                fontSize:15
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }
                }]
            },
            layout:{
              padding:{
                  left: 5,
                  right: 0,
                  top: 0,
                  bottom: 10
              }
          }
        },
        /* Data for joined groups graph */
        chart2show:true,
        chartData2: {
          labels: [],
          datasets: [
            {
              label: 'Project Groups Joined',
              data: [],
              backgroundColor:['cyan'],
              borderWidth:0.5,
              borderColor:"#000"
            },
            {
              label: 'Study Groups Joined',
              data: [],
              backgroundColor:['hotpink'],
              borderWidth:0.5,
              borderColor:"#000"
            }
          ]
        },
        chartOptions2: {
            title:{
                display:true,
                text:'Breakdown of Groups Joined over time',
                fontColor:'Black',
                fontSize:15
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }
                }]
            },
            layout:{
              padding:{
                  left: 5,
                  right: 0,
                  top: 0,
                  bottom: 10
              }
          }  
        },
        /* Data for created groups graph */
        chart3show:false,
        chartData3: {
          labels: [],
          datasets: [
            {
              label: 'Project Groups Created',
              data: [],
              backgroundColor:'springgreen',
              borderWidth:0.5,
              borderColor:"#000",
              hoverBackgroundColor: "springgreen"
            },
            {
              label: 'Study Groups Created',
              data: [],
              backgroundColor:'Orange',
              borderWidth:0.5,
              borderColor:"#000",
              hoverBackgroundColor: "Orange"
            }
          ]
          
        },
        chartOptions3: {
            title:{
                display:true,
                text:'Breakdown of Groups Created over time',
                fontColor:'Black',
                fontSize:15
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }
                }]
            },
            layout:{
              padding:{
                  left: 5,
                  right: 0,
                  top: 0,
                  bottom: 10
              }
          }
        },
        showModal: false,
        user: null,
        email: '',
        id: '',
        myaccid: '',
        details: {
          FirstName: '',
          GroupsCreated: [],
          GroupsJoined: [],
          StudyCreated: [],
          StudyJoined: [],
          LastName: '',
          Major: '',
          NUSNET: '',
          Password: '',
          UserName: '',
          Year: '',
          Picture: ''
        },
        routeuserid: this.$route.params.userId,
        input1: '',
        input1state: null,
        popoverShow: false
      }
    },
    watch: {
      input1(val) {
        if (val) {
          this.input1state = true
        }
      }
    },
    methods: {
      changePic: function() {
        this.popoverShow =true
      },
      submitChanges: function () {
        database.collection('Users')
          .doc(this.id)
          .update({
            Picture: this.details.Picture
          })
          .then(() => {
            console.log('account details updated!')
            this.showModal = true;
          })
      },
      onClose() {
        this.popoverShow = false
      },
      onOk() {
        if (!this.input1) {
          this.input1state = false
        }
        if (this.input1) {
          this.onClose()
          // Return our popover form results
          this.details.Picture = this.input1
          this.submitChanges()
        }
      },
      onShow() {
        // This is called just before the popover is shown
        // Reset our popover form variables
        this.input1 = ''
        this.input1state = null
      },
      onShown() {
        // Called just after the popover has been shown
        // Transfer focus to the first input
        this.focusRef(this.$refs.input1)
      },
      onHidden() {
        // Called just after the popover has finished hiding
        // Bring focus back to the button
        this.focusRef(this.$refs.button)
      },
      focusRef(ref) {
        // Some references may be a component, functional component, or plain element
        // This handles that check before focusing, assuming a `focus()` method exists
        // We do this in a double `$nextTick()` to ensure components have
        // updated & popover positioned first
        this.$nextTick(() => {
          this.$nextTick(() => {
            (ref.$el || ref).focus()
          })
        })
      },
      getGroups: function () {
        let grp = {};
        database.collection("Project Group").where("UserNames", "array-contains", this.details.UserName).get().then(
          (querySnapshot) => {
              querySnapshot.forEach(doc => {
                grp = doc.data()
                grp.id = doc.id
                if (grp.Poster === this.details.UserName) {
                  this.details.GroupsCreated.push(grp);
                } else {
                  this.details.GroupsJoined.push(grp)
                }          
          })  
        });
        database.collection("Study Group").where("UserNames", "array-contains", this.details.UserName).get().then(
          (querySnapshot) => {
              querySnapshot.forEach(doc => {
                grp = doc.data()
                grp.id = doc.id
                if (grp.Poster === this.details.UserName) {
                  this.details.StudyCreated.push(grp);
                } else {
                  this.details.StudyJoined.push(grp)
                }          
          })  
        })
      }
    },
    created: function () {
      var vm = this;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.user = user;
          vm.email = user.email;
          vm.email = vm.email.substring(0, vm.email.indexOf("@"))
          const emailToCheck = vm.email;
          database.collection('Users')
            .where('NUSNET' , '==', emailToCheck.toUpperCase())
            .get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    vm.myaccid = doc.data().UserName;
                })
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
             });


          const userToCheck = vm.routeuserid;
          database.collection('Users')
            .where('UserName', '==', userToCheck)
            .get().then((querySnapShot) => {
              querySnapShot.forEach((doc) => {
                vm.id = doc.id
                vm.details.FirstName = doc.data().FirstName;
                vm.details.LastName = doc.data().LastName;
                vm.details.Major = doc.data().Major;
                vm.details.UserName = doc.data().UserName;
                vm.details.Year = doc.data().Year;
                vm.details.Picture = doc.data().Picture;
                if (doc.data().ProjectGroupsCreated.length>0) {
                  vm.chartData.datasets[0].data.push(doc.data().ProjectGroupsCreated.length);
                  vm.chartData.labels.push("Project Groups Created")
                  vm.chartData.datasets[0].backgroundColor.push('springgreen')
                  vm.chart3show = true;
                  /* for chartData3 (created) */
                  doc.data().ProjectGroupsCreated.forEach((grpid) => {
                    // look into Project Groups database using this grpid
                    database.collection('Project Group')
                    .doc(grpid).get()
                    .then((grpdoc) => {
                      const t = grpdoc.data().DatePosted;
                      var day = t.toDate().getDate();
                      var month = t.toDate().getMonth() + 1;
                      var year = t.toDate().getFullYear();
                      var dmy = day + "/" + month + "/" + year;
                      if (!vm.chartData3.labels.includes(dmy)) { 
                        vm.chartData3.labels.push(dmy);
                        vm.chartData3.datasets[1].data.push(0); 
                        vm.chartData3.datasets[0].data.push(1); //[1] is study, [0] is prj
                      } else { 
                        vm.chartData3.datasets[0].data[vm.chartData3.labels.indexOf(dmy)] = vm.chartData3.datasets[0].data[vm.chartData3.labels.indexOf(dmy)]+1
                      }
                    } ) } )                    
                }
                if (Object.keys(doc.data().ProjectGroupsJoined).length>0) {
                  vm.chartData.datasets[0].data.push(doc.data().ProjectGroupsJoined.id.length);
                  vm.chartData.labels.push("Project Groups Joined")
                  vm.chartData.datasets[0].backgroundColor.push('cyan')
                  /* for chartData2 (joined) */
                  doc.data().ProjectGroupsJoined.timestamp.forEach((t) => {
                    var day = t.toDate().getDate();
                    var month = t.toDate().getMonth() + 1;
                    var year = t.toDate().getFullYear();
                    var dmy = day + "/" + month + "/" + year;
                    if (!vm.chartData2.labels.includes(dmy)) { 
                      vm.chartData2.labels.push(dmy);
                      vm.chartData2.datasets[1].data.push(0); 
                      vm.chartData2.datasets[0].data.push(1); //[1] is study, [0] is prj
                    } else { 
                      vm.chartData2.datasets[0].data[vm.chartData2.labels.indexOf(dmy)] = vm.chartData2.datasets[0].data[vm.chartData2.labels.indexOf(dmy)]+1
                    }
                  })
                }
                if (doc.data().StudyGroupsCreated.length>0) {
                  vm.chartData.datasets[0].data.push(doc.data().StudyGroupsCreated.length);
                  vm.chartData.labels.push("Study Groups Created")
                  vm.chartData.datasets[0].backgroundColor.push('orange')
                  vm.chart3show = true;
                  /* for chartData3 (created) */
                  doc.data().StudyGroupsCreated.forEach((grpid) => {
                    // look into Project Groups database using this grpid
                    database.collection('Study Group')
                    .doc(grpid).get()
                    .then((grpdoc) => {
                      const t = grpdoc.data().DatePosted;
                      var day = t.toDate().getDate();
                      var month = t.toDate().getMonth() + 1;
                      var year = t.toDate().getFullYear();
                      var dmy = day + "/" + month + "/" + year;
                      if (!vm.chartData3.labels.includes(dmy)) { 
                        vm.chartData3.labels.push(dmy);
                        vm.chartData3.datasets[0].data.push(0); 
                        vm.chartData3.datasets[1].data.push(1); //[1] is study, [0] is prj
                      } else { 
                        vm.chartData3.datasets[1].data[vm.chartData3.labels.indexOf(dmy)] = vm.chartData3.datasets[1].data[vm.chartData3.labels.indexOf(dmy)]+1
                      }
                    } ) } )
                }
                if (Object.keys(doc.data().StudyGroupsJoined).length>0) {
                  vm.chartData.datasets[0].data.push(doc.data().StudyGroupsJoined.id.length);
                  vm.chartData.labels.push("Study Groups Joined")
                  vm.chartData.datasets[0].backgroundColor.push('hotpink')
                  /* for chartData2 (joined) */
                  doc.data().StudyGroupsJoined.timestamp.forEach((t) => {
                    var day = t.toDate().getDate();
                    var month = t.toDate().getMonth() + 1;
                    var year = t.toDate().getFullYear();
                    var dmy = day + "/" + month + "/" + year;
                    if (!vm.chartData2.labels.includes(dmy)) { 
                      vm.chartData2.labels.push(dmy);
                      vm.chartData2.datasets[1].data.push(1); //[1] is study, [0] is prj
                      vm.chartData2.datasets[0].data.push(0); 
                    } else {
                      vm.chartData2.datasets[1].data[vm.chartData2.labels.indexOf(dmy)] = vm.chartData2.datasets[1].data[vm.chartData2.labels.indexOf(dmy)]+1
                    }
                  })
                }
                if (vm.chartData.labels.length == 0) {vm.chart1show=false;}
                if (vm.chartData2.labels.length == 0) {vm.chart2show=false;}
                vm.getGroups();
              })
            })
            .catch(function (error) {
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

  .divider {
    display:block;
    width: 100 px;
    height: 2px;
    background-color:#28384d;
  }

  #img1 {
    height: 250px;
  }

  .hi {
    padding-left: 10%;
    padding-right: 10%
  }

  #info {
    height: 1000px;
    width: 1230px;
  }

  #dashboard {
    height: 500px
  }
  /* Styling the name */
  #name_field {
    padding-top: 5px;
    font-weight:bold;
  }
  /* Styling username */
  #username_field {
    font-style:italic;
  }
  /* Styling year and major  */
  #yearmajor_field {
    font-size:110%;
  }
</style>
