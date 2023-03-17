<template>
  <q-page class="">
    <q-card style="width: 90%" class="q-mx-auto q-my-md">
      <q-item>
        <q-item-section
          style="text-align: left; font-size: 18px"
          class="text-primary q-pl-md"
        >
          <q-item-label caption> Itens Adicionados </q-item-label>
          <q-item-label>
            {{
              addedes.reduce((acc, item) => acc + parseInt(item.quantity), 0)
            }}
          </q-item-label>
        </q-item-section>
        <q-separator vertical />
        <q-item-section
          style="text-align: left; font-size: 18px"
          class="text-primary q-pl-md"
        >
          <q-item-label caption> Valor total </q-item-label>
          R$
          {{
            addedes.reduce(
              (acc, item) =>
                acc + parseFloat(item.price) * parseFloat(item.quantity),
              0
            )
          }}
        </q-item-section>
      </q-item>
    </q-card>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="item"
      selection="multiple"
      v-model:selected="selected"
      square
      flat
      hide-header
      hide-bottom
      virtual-scroll
      separator="horizontal"
      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox
              dense
              v-model="props.selected"
              checked-icon="remove"
              unchecked-icon="add"
              @click="
                () => {
                  updateItem(props.row.key, 'added', {
                    set: () => {
                      return false;
                    },
                    value: !props.selected,
                  });
                }
              "
            />
          </q-td>
          <q-td key="item" :props="props">
            {{ props.row.item }}
            <q-popup-edit v-model="props.row.item" v-slot="scope">
              <q-input
                autofocus
                dense
                v-model="scope.value"
                :model-value="scope.value"
                hint="Nome do Item"
              >
                <template v-slot:after>
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="cancel"
                    @click.stop.prevent="scope.cancel"
                  />

                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="
                      updateItem(props.row.key, 'item', scope)
                    "
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
            <q-popup-edit v-model="props.row.quantity" v-slot="scope">
              <q-input
                autofocus
                dense
                v-model="scope.value"
                :model-value="scope.value"
                hint="Quantidade de Itens"
                type="number"
              >
                <template v-slot:after>
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="cancel"
                    @click.stop.prevent="scope.cancel"
                  />

                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="
                      updateItem(props.row.key, 'quantity', scope)
                    "
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="price" :props="props">
            R$ {{ props.row.price }}
            <q-popup-edit v-model="props.row.price" v-slot="scope">
              <q-input
                autofocus
                dense
                prefix="R$"
                v-model="scope.value"
                :model-value="scope.value"
                hint="Valor do Item"
                type="number"
              >
                <template v-slot:after>
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="cancel"
                    @click.stop.prevent="scope.cancel"
                  />

                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="
                      updateItem(props.row.key, 'price', scope)
                    "
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="total" :props="props">
            R$ {{ props.row.price * props.row.quantity }}
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn
              icon="fa-solid fa-trash"
              dense
              round
              flat
              color="red-8"
              size="sm"
              @click="deleteThisItem(props.row.key)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useDb } from "src/stores/database";
import { useQuasar } from "quasar";
const columns = [
  {
    name: "item",
    required: true,
    label: "Item",
    align: "left",
    field: (row) => row.item,
    format: (val) => `${val}`,
    sortable: true,
    style: "width: 100%",
  },
  {
    name: "quantity",
    required: true,
    label: "quantity",
    align: "left",
    field: (row) => row.quantity,
    format: (val) => `${val}`,
    sortable: true,
    style: "width: 20px",
  },
  {
    name: "price",
    required: true,
    label: "price",
    align: "left",
    field: (row) => row.price,
    format: (val) => `${val}`,
    sortable: true,
    style: "width: 40px;",
  },
  {
    name: "total",
    required: true,
    label: "total",
    align: "right",
    style: "width: 40px",
  },
  {
    name: "delete",
    required: true,
    label: "delete",
    align: "right",
    style: "width: 40px",
  },
];

export default defineComponent({
  name: "IndexPage",
  data() {
    const db = useDb();
    const $q = useQuasar();
    return {
      db,
      $q,
      columns,
      selected: [],
    };
  },
  async mounted() {
    await this.db.getItems();
    console.log(this.rows);
  },
  computed: {
    addedes() {
      return this.rows.filter((row) => row.added);
    },
    rows: {
      get() {
        return this.db.items;
      },
      set(newItems) {
        this.db.items = newItems;
      },
    },
  },
  methods: {
    async deleteThisItem(key) {
      const res = await this.db.deleteItem(key);
      if (res.success)
        this.$q.notify({
          message: "Deletado com sucesso!",
          color: "accent",
          icon:'delete'
        });
      else
        this.$q.notify({
          message: "Houve um erro, não deletado!",
          color: "negative",
          icon:'error'
        });
    },
    async updateItem(key, item, data) {
      console.log(data.value);
      const res = await this.db.updateItem(key, { [item]: data.value });

      // console.log(res)
      if (item !== "added") {
        if (res.success)
          this.$q.notify({
            message: "Atualizado com sucesso!",
            color: "done",
          });
        else
          this.$q.notify({
            message: "Houve um erro, não atualizado!",
            color: "negative",
            icon:'error'
          });
        data.set();
      }
    },
  },
});
</script>
