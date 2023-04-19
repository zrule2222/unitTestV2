<template>
    
    <div class="hero is-fullheight">
        <section class="hero is-link is-small">
  <div class="hero-body is-small is-justify-content-center" >
    <p class="title">
      Registration
    </p>
  </div>
</section>
<div v-if="showError" class="notification is-danger has-text-centered">
      <p>{{errorMessage}}</p>
    </div>
      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
            <form @submit.prevent="register">
          <div class="column">
            <label for="name">Username</label>
            <input class="input is-link" type="text" placeholder="Username" :class="noUsername ? 'is-danger' : ''" v-model="username">
            <p v-show="noUsername" class="help is-danger">Username is empty</p>
          </div>
          <div class="column">
            <label for="Name">Password</label>
            <input class="input is-link" type="password" :class="noPassword ? 'is-danger' : ''" placeholder="Password" v-model="password">
            <p v-show="noPassword" class="help is-danger">Password is empty</p>
          </div>
          <div class="column">
            <button class="button is-link is-fullwidth" type="submit">Create an account</button>
          </div>
          <div class="has-text-centered">
            <p> Already have an account?  <a @click="$router.push('/')" class="has-text-primary has-text-link">Login</a>
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
   </template>
   
   <script>
   export default {
       name: 'registrationPage',
     data() {
       return {
         username: "",
         password: "",
         noUsername: false,
         noPassword: false,
         showError: false,
         errorMessage: "",
       };
     },
     methods:{
       async register(){
        if(!this.validateForm()){
        return
      }
         try {
        const response = await this.$articles.register({
           "username": this.username,
           "password": this.password
         })
         localStorage.setItem('token',response.data.auth_token)
         this.$router.push('/posts')
       }
       catch (error){
        this.showError = true
        this.errorMessage = error.response.data.message
       }
       },
       validateForm() {
      if (!this.username) {
        this.noUsername = true
        return false
      }
      else {
        this.noUsername = false
      }
      if (!this.password) {
        this.noPassword = true
        return false
      }
      else {
        this.noPassword = false
      }
      return true
    
  }
     }
   }
   </script>