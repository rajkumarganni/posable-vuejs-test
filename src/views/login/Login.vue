<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div v-if="$route.query.success === true" class="alert alert-success">
            Registration successfull, Please check your email.
          </div>
          <div v-if="$route.query.reset === true" class="alert alert-success">
            Password changed successfully, Please login.
          </div>
          <div v-if="$route.query.forgot === true" class="alert alert-success">
            Please check your email and change password.
          </div>
          <div v-show="display" class="alert alert-danger">
            You have entered an invalid userid or password.
          </div>
          <div>
            <h2>Login</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.password.$error }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.password.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >Password must be at least 6 characters</span
                  >
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-primary">Login</button>&nbsp;
                <a href="/forgotpassword">Forgot Password</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import axios from 'axios';

export default {
    name: "app",
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            submitted: false,
            display:false
        };
    },
    validations: {
        user: {
            email: { required, email },
            password: { required }
        }
    },
    methods: {
        handleSubmit() {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                axios.post('http://backend.local/api/login', this.user, {
      }).then((res) => {
        if(res.status === 200)
        {
            const token = res.data.data.token;
            const name = res.data.data.name;
            localStorage.setItem('user-token', token); // store the token in localstorage
            localStorage.setItem('user-first_name', name); // store the token in localstorage
            //console.log("ramstest ="+JSON.stringify(res.data.data.token));
           return this.$router.push({path: '/usersreport'});
         }
        else(res.status != 200)
           this.display = true;
         }).catch(() => {
            localStorage.removeItem('user-token'); // store the token in localstorage
            localStorage.removeItem('user-first_name'); // store the token in localstorage
             }).finally(() => {
                 //Perform action in always
             });

            }

            //alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
        }
    }
};
</script>
