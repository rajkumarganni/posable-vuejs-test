<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2>Reset Password</h2>
            <form @submit.prevent="handleSubmit">
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
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  v-model="user.confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }"
                />
                <div
                  v-if="submitted && $v.user.confirmPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.confirmPassword.required"
                    >Confirm Password is required</span
                  >
                  <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                    >Passwords must match</span
                  >
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-primary">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from 'axios';

export default {
    name: "app",
    data() {
        return {
            user: {
                password: "",
                confirmPassword: "",
                token:""
            },
            submitted: false
        };
    },
    validations: {
        user: {
            password: { required },
            confirmPassword: { required }

        }
    },
    methods: {
        handleSubmit() {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            else {
                this.user.token = this.$route.query.token;
                axios.post('http://backend.local/api/password/reset', this.user, {
      }).then((res) => {
        if(res.status === 200)
            return this.$router.push({path: '/login', query: {'reset': true}});
        else(res.status !== 200)
           return  this.$router.push({path: '/'});
       }).catch(() => {
                 // error.response.status Check status code
             }).finally(() => {
                 //Perform action in always
             });

            }
        }
    }
};
</script>
