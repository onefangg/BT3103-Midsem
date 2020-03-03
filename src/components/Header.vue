<template>
    
    <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <div class="jumbotron">
            
            <h3>Welcome to loNUS</h3>
            
            <h6 align="center"><img src="https://www.comp.nus.edu.sg/images/resources/content/01-ugbanner.jpg" alt="NUS Computing Logo"> </h6>
            
            <p><router-link to="/SignUp">SignUp</router-link></p>
            <p><router-link to="/group-page">Group</router-link></p>
        </div>

        <div class="row">
            <div class="col-4">
               <p><router-link to="/MainPage">Main Page</router-link></p>
              
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>