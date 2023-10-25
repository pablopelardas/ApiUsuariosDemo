<script setup lang="ts">
import { ref, onMounted } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { useUsersStore } from '@/stores/users'
import LoadWrapper from '@/components/LoadWrapper.vue'
import type { User } from '@/types'

interface RowEvent {
  originalEvent: PointerEvent
  data: User
  index: number
}

const store = useUsersStore()

const selectedItem = ref(null)
const selectedUser = ref<User>()

const onRowSelect = (event: RowEvent) => {
  selectedUser.value = event.data
}

onMounted(async () => {
  await store.loadUsers()
})
</script>

<template>
  <div>
    <LoadWrapper>
      <h1>Usuarios</h1>
      <p>Esta es la lista de usuarios:</p>
      <div class="table">
        <DataTable
          v-model:selection="selectedItem"
          :value="store.users"
          selectionMode="single"
          dataKey="id"
          :metaKeySelection="false"
          @rowClick="onRowSelect"
          tableStyle="min-width: 50rem"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 25, 50]"
          sort-mode="multiple"
        >
          <Column headerStyle="width: 3rem"></Column>
          <Column field="id" header="ID"></Column>
          <Column field="names" header="Nombres"></Column>
          <Column field="lastnames" header="Apellidos"></Column>
          <Column field="email" sortable header="Correo"></Column>
          <Column field="cuit" sortable header="CUIT"></Column>
          <Column field="birthdate" sortable header="Fecha Nacimiento"></Column>
          <Column field="residence" sortable header="Domicilio"></Column>
          <Column field="cellphone" sortable header="Celular"></Column>
        </DataTable>
      </div>
    </LoadWrapper>
  </div>
</template>

<style lang="scss">
.table {
  margin-bottom: 1rem;
}
</style>
