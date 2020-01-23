
<template>
  <div>
    <div class="container">
      <b-container>
          <b-row>
            <b-col><h1>playerList</h1></b-col>
            <b-col> 
                <div class="float-right m-2" >
                     <b-button
                            size="sm"
                            @click="addinfo( $event.target)"
                            variant="success"
                            >Add  Player 
                    </b-button>
                    
                </div>    
               
            </b-col>
           
        </b-row>
       
        
        <b-table striped hover :fields="fields" :items="tempPlayerlist">
          <template v-slot:cell(actions)></template>
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >Edit {{row.index}}
            </b-button>
            <b-button
              size="sm"
              @click="remove(row.item.Player_id)"
              variant="danger"
            >Remove 
            </b-button>
          </template>
        </b-table>
      </b-container>
    </div>
    <div id="es">
         <b-modal :id="infoModal.id" :title="infoModal.title" @ok="handleOk" >
     
        
       <b-form   novalidate>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-1"
              label="First Name:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.Firstname"
                type="text"
                required
                placeholder="Enter firstname"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-2" label="Your LastName:" label-for="input-2">
              <b-form-input id="input-2" 
              v-model="form.Lastname" 
              required 
              placeholder="Enter Lastname">

              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group id="input-group-3" label="Country:" label-for="input-3">
              <b-form-select id="input-3" v-model="form.Country" :options="Countries" required></b-form-select>
            </b-form-group>
          </b-col>
         
        </b-row>

    
      </b-form>
            </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "Player",
  data() {
    return {
        Countries:["India","United States"],
         form: {
        Firstname: "",
        Lastname: "",
        Country: null,
        Player_id:null
      },
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
      fields: [
        {
          key: "Player_id",
          label: "Player Id",
          sortable: true
        },
        {
          key: "Firstname",
          label: "First Name"
        },
        {
          key: "Lastname",
          label: "Last Name",
          sortable: true
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        },
        {
          key: "Country",
          label: "Country",
          sortable: true
          // Variant applies to the whole column, including the header and footer
          //variant: 'danger'
        },
        {
          key: "actions",
          label: "Actions"
        }
        // Variant applies to the whole column, including the header and footer
        //variant: 'danger'
      ],
    
    };
  },
  created() {
   
    this.fetchData();
    console.log(this.zds);
  },
  methods: {
      reset(){
   this.form= {
        Firstname: "",
        Lastname: "",
        Country: null,
        Player_id:null
      }
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.updateData()
      },
      addinfo(button) {
          this.reset();
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    remove(id){
       let sdfdswf=this;
        let url="RemoveSpecificPlayerInfo";
        
        
         let asf = this.$root.GetSample(url+"?id="+id);
      asf
        .then(resp => {
         sdfdswf.fetchData();
         
        })
        .catch(err => {
          console.log(err);
        });
    },
    info(item, index, button) {
      console.log(JSON.stringify(item, null, 2));
      this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.form= JSON.parse( this.infoModal.content);
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    fetchData() {
      let asf = this.$root.GetSample("GetPlayerInfo");
      asf
        .then(resp => {
          this.$store.dispatch('players/fetchPlayersfromDB', resp.data.data)
          console.log(this.tempPlayerlist);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateData()
    {
        let sdfdswf=this;
        let url="UpdateStudent";
        if(this.form.Player_id==null)
        {
            url="AddPlayer";
        }
        
         let asf = this.$root.PostSample(url,this.form);
      asf
        .then(resp => {
         sdfdswf.fetchData();
          sdfdswf.$bvModal.hide(sdfdswf.infoModal.id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  computed: mapState({
    tempPlayerlist: state => state.players.allPlayers,
      isComplete() {
      return this.form.email && this.form.name && this.form.food;
    }
  }) 
};
</script>
