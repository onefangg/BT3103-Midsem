<template>
<div>
<nb></nb>
<b-container class="big">
    <br>
    <div class="info">
    <b-row class="justify-content-md-center" >
        
           <b-col class = "icon" col lg="3">
               
            <b-img left src="https://picsum.photos/125/125/?image=58" rounded="circle" width=150px></b-img>
            </b-col>
            <b-col id ='about'>
               
                <b-row id = "Name">

                
                {{me.name}} </b-row> 
                <b-row id = "username">@{{me.username}}</b-row>
                <b-row id = 'details' cols=6>
               Year {{me.year}} {{me.major}} student
            </b-row><br><br>
  
                </b-col>
            
            </b-row>
            
            </div>
    
        <b-row>
            <b-col>
            <b-card no-body >
                <b-tabs pills card>
                    <b-tab title="Groups Created" active>
                        
                    </b-tab>
                    <b-tab title = 'Groups Joined'></b-tab>
                    </b-tabs>
            </b-card></b-col>
           

        
    </b-row> 
    
    
</b-container>
</div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
    components: {
        'nb' : NavBar
    },
    props: ["icon", "name", "userId", "img", "major", "username"],
    data() {
        return {
            me: {
                name: 'Jane Doe',
                userId: 1,
                major: 'Business Analytics',
                username: "abcde",
                year: 2

            }
        }
    }
}
</script>

<style>
.profile-sidebar {
    background-color: paleturquoise
}

.profile-activity {
    background-color: palegoldenrod
}

#Name {
    font-size: 32px;
    text-align: center;
    letter-spacing: 1px;
    font-weight: bold;
}

#username {
    color:gray;
}
#details {
    margin-top: 5px;
    
}
#about {
    margin-left: -30px;
}

.icon {
    margin-bottom: 20px;
}


</style>