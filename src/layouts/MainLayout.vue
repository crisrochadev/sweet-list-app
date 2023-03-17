<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Sweet List
        </q-toolbar-title>
        <div>
      <q-btn icon="add" flat>
        <q-popup-proxy>
          <q-card style="width:300px" class="">
            <div class="q-pl-sm" style="display:flex;align-items:center;height:40px">
                <span style="text-transform:uppercase;font-weight:800" class="text-primary">Novo Item</span>
                <q-space />
                <q-btn icon="close" dense round  flat v-close-popup />
            </div>
              <q-item>
                <q-input
                class="full-width"
                autofocus
                dense
                outlined
                v-model="newItem"
                @keyup.enter="addItem"
              >
                <template v-slot:after>
                  <q-btn
                    dense
                    size="17px"
                    color="positive"
                    icon="check_circle"
                    @click="addItem"
                    v-close-popup
                  />
                </template>
              </q-input>
              </q-item>
              </q-card>
            </q-popup-proxy>
      </q-btn>
    </div>
      </q-toolbar>
    </q-header>




    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import {useDb} from 'src/stores/database'
import { useQuasar } from 'quasar';



export default defineComponent({
  name: 'MainLayout',
  data () {
    const db = useDb();
    const $q = useQuasar();
    return {
      db,
      $q,
      newItem:null
    }
  },
  methods:{
    async addItem(){
      const itemExists = this.db.items.some(row => row.item === this.newItem);
      if(itemExists){
        this.$q.notify({
          message:'Esse item já foi adicionado',
          icon:'error',
          color:'negative'
        });

        return;
      }
      const res = await this.db.addItem(this.newItem)
      if(res.success) this.$q.notify({
        message:'Item adicionado com sucesso!',
        color:'positive',
        icon:'done'
      })
      else this.$q.notify({
        message:'Houve um erro, não adicionado!',
        color:'negative',
        icon:'error'
      })
      this.newItem = null;
    }
  }
})
</script>
