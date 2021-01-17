<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row" v-if="items">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2>Edit User</h2>
                        <form v-on:submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label for="first_name">First Name</label>
                                <input type="text" :value="items.first_name" id="first_name" name="first_name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.first_name.$error }"/>
                                <div v-if="submitted && !$v.user.first_name.required" class="invalid-feedback">First Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="last_name">Last Name</label>
                                <input type="text" v-model="items.last_name" id="last_name" name="last_name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.last_name.$error }" />
                                <div v-if="submitted && !$v.user.last_name.required" class="invalid-feedback">Last Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="items.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone_number">Phone Number</label>
                                <input type="number" v-model="items.phone_number" id="phone_number" name="phone_number" class="form-control" :class="{ 'is-invalid': submitted && $v.user.phone_number.$error }" />
                                <div v-if="submitted && !$v.user.phone_number.required" class="invalid-feedback">Phone Number is required</div>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <textarea id="address" name="address" class="form-control" :class="{ 'is-invalid': submitted && $v.user.address.$error }"></textarea>
                                <div v-if="submitted && !$v.user.address.required" class="invalid-feedback">Address is required</div>
                            </div>
                            <!--<div class="form-group">
                                <label for="avatar">Avatar</label><br>
                               <input type="file" :name="avatar" :disabled="isSaving" v-model.trim="items.avatar" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="form-control" :class="{ 'is-invalid': submitted && $v.user.avatar.$error }">
                                <div v-if="submitted && !$v.user.avatar.required" class="invalid-feedback">Avatar is required</div>
                            </div>-->
                            <div class="form-group">
                                <button class="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email, minLength } from "vuelidate/lib/validators";
    import axios from 'axios';
    export default {
        name: "app",
        data() {
            return {
                user: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone_number:"",
                    address:"",
                    res:"",
                    error:""
                },
                submitted: false
            };
        },
        
        validations: {
            user: {
                first_name: { required, minLength: minLength(3) },
                last_name: { required, minLength: minLength(3) },
                email: { required, email },
                phone_number: { required, minLength: minLength(8) },
                address: { required }
                
            }
        },
        mounted()
        { //alert(this.$route.query.id);
           const token = localStorage.getItem('user-token');
            if (token) 
            axios.defaults.headers.common['Authorization'] = "Bearer "+token;
            else
            return this.$router.push({path: '/login'});

        axios.get('http://backend.local/api/user/'+this.$route.query.id, this.user, {
          }).then((res) => {
            if(res.status === 200){ 
                this.items = res.data.info;
                //console.log("ramstst ="+JSON.stringify(res.data.info));
                }
            else(res.status != 200)
               this.display = true;
             }).catch(() => {
        // error.response.status Check status code
                 }).finally(() => {
                     //Perform action in always
                 });
        },
        methods: {
            handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    
                    return;
                } else { 
                    axios.post('http://backend.local/api/user', this.user, {
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

             
            }
        }
    };
</script>