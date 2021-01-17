<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div v-show="display" class="alert alert-danger">
            Password reset was unsuccessfull, Enter valid email address.
          </div>
          <div>
            <h2>Forgot Password</h2>
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
import { required, email } from "vuelidate/lib/validators";
 import axios from 'axios';

export default {
    name: "app",
    data() {
        return {
            user: {
                email: ""
            },
            submitted: false,
            display:false
        };
    },
    validations: {
        user: {
            email: { required, email }

        }
    },
    methods: {
        handleSubmit() {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }else {
                axios.post('http://backend.local/api/password/forgot', this.user, {
      }).then((res) => {
        if(res.status == 200)
        {
            return this.$router.push({path: '/login', query: {'forgot': true}});
        }
        else(res.status != 200)
        {
            this.display = true;
        }
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
