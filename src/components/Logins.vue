
<template>
  <div>
    <div class="container" fluid="md">
       <b-form   novalidate>
        
          <b-col  cols="4">
            <b-form-group
              id="input-group-1"
              label="User Name:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.Email"
                type="text"
                required
                placeholder="Enter UserName"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
              <b-form-input id="input-2" 
              v-model="form.Password" 
              required 
              placeholder="Enter Passwod">

              </b-form-input>
            </b-form-group>
          </b-col>
           <b-col cols="4">
             <b-button :disabled='!isLoginFormComplete' 
                            @click="vlidate( $event.target)"
                            variant="success"
                            >Login
                    </b-button>
          </b-col>
        
       
    
      </b-form>
    </div>
    </div>
</template>

<script>

import { EventBus } from "../event-bus";
import UtilityResource from '../services/utilityService';

export default {
  name: "Test",
   data() {
    return {
         form: {
        Email: "",
        Password: "",
       
      }
    }
   },
   methods:{
       vlidate(button) {

        let sdfdswf=this;
        let url="Login";
        
         let asf = this.$root.PostSample(url,this.form);
      asf.then(resp => {
          if(resp.data.data.status)
          {
          this.$root.isLoggedIn=true;
          EventBus.$emit("loggedinUserName", resp.data.data.account.Email);
          UtilityResource.SetUserInfo(JSON.stringify( resp.data.data.account));
         sessionStorage.setItem("token",resp.data.data.account.Token);
         this.$router.push({ name: 'Hello'});
          }
          else{
             sdfdswf.$bvToast.toast(`Invalid Credentials`, {
                    title: 'BootstrapVue Toast',
                    autoHideDelay: 3000,
                    appendToast: true,
                    variant: 'danger',
                  })
          }
      
         console.log(resp);
        
       // this.$router.push({ name: 'Hello'});
        })
        .catch(err => {
          console.log(err);
        });

        
    },
   },
 computed: {
    
  isLoginFormComplete () {
    return this.form.Email  && this.form.Password  ;
  }
}

 
};
</script>
