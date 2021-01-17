<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-1">
          <div v-if="bulkdeleted === true" class="alert alert-success">
            Bulk users deleted succesfully.
          </div>
          <div v-if="singledelete === true" class="alert alert-success">
            User deleted succesfully.
          </div>
          <div>
            <h2>User Report</h2>
            <div
              v-if="$route.query.success === true"
              class="alert alert-success"
            >
              User information saved succesfully.
            </div>
            <select
              class="form-control col-sm-3"
              style="margin-bottom: 10px"
              @change="deleteUser"
            >
              <option value="0" selected="selected">Select</option>
              <option value="">Delete All</option>
            </select>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input
                        type="checkbox"
                        v-model="selectAll"
                        @click="select"
                      />
                      <i class="form-icon"></i>
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Avatar</th>
                  <th></th>
                  <th><a class="btn btn-primary" href="/addnewuser">Add</a></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of items" :key="index">
                  <td>
                    <label class="form-checkbox">
                      <input
                        type="checkbox"
                        :value="item['id']"
                        v-model="selected"
                      />
                      <i class="form-icon"></i>
                    </label>
                  </td>
                  <td>{{item['first_name']}}&nbsp;{{item['last_name']}}</td>
                  <td>{{item['phone_number']}}</td>
                  <td>{{item['email']}}</td>
                  <td>{{item['address']}}</td>
                  <td>
                    <img
                      :src="'http://backend.local/img/'+item.avatar"
                      width="60px"
                      height="30px"
                    />
                  </td>
                  <td>
                    <a :href="'/edituser?id='+item.id" class="btn btn-success"
                      >Edit</a
                    >
                  </td>
                  <td>
                    <button
                      type="button"
                      @click="deleteClick(item.id)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
                confirmPassword: ""
            },
            submitted: false,
            items: [],
            bulkdeleted:false,
            singledelete:false,
selected: [],
selectAll: false

        };

    },
    validations: {
        user: {
            password: { required },
            confirmPassword: { required }

        }
    },
    mounted()
    {
       const token = localStorage.getItem('user-token');
        if (token)
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;
        else
        return this.$router.push({path: '/login'});

    axios.get('http://backend.local/api/user', this.user, {
      }).then((res) => {
        if(res.status === 200){
            this.items = res.data.info.data;
            //console.log("ramstst ="+JSON.stringify(this.items));
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
        select() {
  //this.selected = [];
  if (!this.selectAll) {
    for (let i in this.items) {
      this.selected.push(this.items[i].id);
      //alert("ramstest = "+this.selected.join());
    }
  }
},
deleteUser() {
            const token = localStorage.getItem('user-token');
            if (token)
            axios.defaults.headers.common['Authorization'] = "Bearer "+token;
            else
            return this.$router.push({path: '/login'});
            axios.post('http://backend.local/api/user/all',{id : this.selected.join()})
            .then((response) => {
                     console.log(JSON.stringify(response));
                    this.getUsers()
                    this.selected = []
                    this.all_select == true ?
                    this.all_select = false : this.all_select = true;
                    this.bulkdeleted = true;
                 })
        },
        deleteClick(val) {
            const token = localStorage.getItem('user-token');
            if (token)
            axios.defaults.headers.common['Authorization'] = "Bearer "+token;
            else
            return this.$router.push({path: '/login'});
            axios.delete('http://backend.local/api/user/'+val,{"id":val
      }).then((response) => {
                     console.log(JSON.stringify(response));
                    this.getUsers()
                    this.selected = []
                    this.all_select == true ?
                         this.all_select = false : this.all_select = true;
                         this.singledelete = true;
                 })
        },
        getUsers(){
            const token = localStorage.getItem('user-token');
            if (token)
            axios.defaults.headers.common['Authorization'] = "Bearer "+token;
            else
            return this.$router.push({path: '/login'});
            axios.get('http://backend.local/api/user')
                 .then((response)=>{
                   this.items = response.data.info.data;
                 })
        },
        handleSubmit() {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            else {
                axios.post('http://backend.local/api/user', this.user, {
      }).then((res) => {
        if(res.status === 200)
           return this.$router.push({path: '/usersreport'});
        else(res.status != 200)
           this.display = true;
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
