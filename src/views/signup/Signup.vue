<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2>Register new User</h2>
            <form
              v-on:submit.prevent="handleSubmit"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  v-model="user.first_name"
                  id="first_name"
                  name="first_name"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.first_name.$error }"
                />
                <div
                  v-if="submitted && !$v.user.first_name.required"
                  class="invalid-feedback"
                >
                  First Name is required
                </div>
                <div
                  v-if="!$v.user.first_name.minLength"
                  class="invalid-feedback"
                >
                  First Name must be at least 3 characters
                </div>
              </div>
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  v-model="user.last_name"
                  id="last_name"
                  name="last_name"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.last_name.$error }"
                />
                <div
                  v-if="submitted && !$v.user.last_name.required"
                  class="invalid-feedback"
                >
                  Last Name is required
                </div>
                <div
                  v-if="!$v.user.last_name.minLength"
                  class="invalid-feedback"
                >
                  Last Name must be at least 3 characters
                </div>
              </div>
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
                <label for="phone_number">Phone Number</label>
                <input
                  type="number"
                  v-model="user.phone_number"
                  id="phone_number"
                  name="phone_number"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.phone_number.$error }"
                />
                <div
                  v-if="submitted && !$v.user.phone_number.required"
                  class="invalid-feedback"
                >
                  Phone Number is required
                </div>
                <div
                  v-if="!$v.user.phone_number.minLength"
                  class="invalid-feedback"
                >
                  Phone Number must be at least 8 characters
                </div>
                <div
                  v-if="!$v.user.phone_number.maxLength"
                  class="invalid-feedback"
                >
                  Phone Number must be at least 11 characters
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
                <label for="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  v-model="user.confirm_password"
                  id="confirm_password"
                  name="confirm_password"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.confirm_password.$error }"
                />
                <div
                  v-if="submitted && $v.user.confirm_password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.confirm_password.required"
                    >Confirm Password is required</span
                  >
                  <span v-else-if="!$v.user.confirm_password.sameAsPassword"
                    >Passwords must match</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                  v-model="user.address"
                  id="address"
                  name="address"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.address.$error }"
                ></textarea>
                <div
                  v-if="submitted && !$v.user.address.required"
                  class="invalid-feedback"
                >
                  Address is required
                </div>
              </div>
              <div class="form-group">
                <label for="avatar">Avatar</label><br />
                <input
                  @change="onFileSelected"
                  type="file"
                  class="form-control"
                />
                <!--<div v-if="submitted && !$v.user.avatar.required" class="invalid-feedback">Avatar is required</div>-->
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs, maxLength } from "vuelidate/lib/validators";
import axios from 'axios';
export default {
    name: "app",
    data() {
        return {
            selectedFile : null,
            user: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
                phone_number:"",
                address:"",
                avatar:"",


            },
            submitted: false,

        };
    },
    validations: {
        user: {
            first_name: { required,  minLength: minLength(3) },
            last_name: { required, minLength: minLength(3) },
            email: { required, email },
            password: { required, minLength: minLength(6) },
            confirm_password: { required, sameAsPassword: sameAs('password') },
            phone_number: { required, minLength: minLength(8), maxLength: maxLength(11) },
            address: { required }

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
                axios.post('http://backend.local/api/register', this.user, {
      }).then((res) => {
        if(res.status == 200)
        {
            return this.$router.push({path: '/login', query: {'success': true}});
        }
      }).catch(() => {

                 // error.response.status Check status code
             }).finally(() => {
                 //Perform action in always
             });

            }


        },
        onFileSelected(event)
        {
            //console.log("rams1 = "+event);
            //console.log("rams2 = "+event.target.files[0]);
        this.selectedFile = event.target.files[0];
        //console.log("rams2 = "+this.selectedFile);
        }
    }
};
</script>
