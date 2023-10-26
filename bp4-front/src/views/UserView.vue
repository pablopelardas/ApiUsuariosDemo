<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { FilterMatchMode } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'

import { useUsersStore } from '@/stores/users'
import LoadWrapper from '@/components/LoadWrapper.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import UserForm from '@/components/UserForm.vue'
import type { User } from '@/types'

interface RowEvent {
  originalEvent: PointerEvent
  data: User
  index: number
}

const store = useUsersStore()

const selectedItem = ref(null)
const selectedUser = ref<User>()
const showModal = ref(false)
const showDeleteConfirmation = ref(false)
const userForm = ref<typeof UserForm>()

const filters = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS
  }
})

const isNewUser = computed(() => selectedUser.value?.id === -1)

const mappedUsers = computed(() => {
  return store.users.map((user) => ({
    ...user,
    birthdate: new Date(user.birthdate).toLocaleDateString('es-AR')
  }))
})

const onRowSelect = (event: RowEvent) => {
  selectedUser.value = store.users.find((user) => user.id === event.data.id)!
  showModal.value = true
}

onMounted(async () => {
  await store.loadUsers()
})

const onAdd = () => {
  selectedUser.value = {
    id: -1,
    names: '',
    lastnames: '',
    email: '',
    cuit: '',
    birthdate: new Date(),
    address: '',
    cellphone: ''
  }
  selectedItem.value = null
  showModal.value = true
}

const onConfirm = () => {
  if (userForm.value?.validate()) {
    const user = userForm.value?.localUser
    showModal.value = false
    const birthdate = new Date(user.birthdate)
    birthdate.setHours(0, 0, 0, 0)
    user.birthdate = birthdate.toISOString()
    if (user.id === -1) {
      store.createUser(user)
    } else {
      store.updateUser(user)
    }
  }
}

const onCancel = () => {
  console.log('cancel')
  showModal.value = false
}

const onDelete = () => {
  showModal.value = false
  showDeleteConfirmation.value = false
  store.deleteUser(selectedUser.value!.id)
}
</script>

<template>
  <div class="user-view">
    <LoadWrapper>
      <div class="header">
        <h1>Usuarios</h1>
        <div class="header__controls">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Buscar" />
          </span>
          <Button label="Agregar" icon="pi pi-plus" @click="onAdd" />
        </div>
      </div>
      <div class="table">
        <DataTable
          v-model:selection="selectedItem"
          :value="mappedUsers"
          selectionMode="single"
          dataKey="id"
          :metaKeySelection="false"
          @rowClick="onRowSelect"
          tableStyle="min-width: 50rem"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 25, 50]"
          sort-mode="multiple"
          v-model:filters="filters"
          :global-filter-fields="[
            'id',
            'names',
            'lastnames',
            'email',
            'cuit',
            'birthdate',
            'address',
            'cellphone'
          ]"
        >
          <Column headerStyle="width: 3rem"></Column>
          <Column field="id" header="ID"></Column>
          <Column field="names" header="Nombres"></Column>
          <Column field="lastnames" header="Apellidos"></Column>
          <Column field="email" sortable header="Correo"></Column>
          <Column field="cuit" sortable header="CUIT"></Column>
          <Column field="birthdate" sortable header="Fecha Nacimiento"></Column>
          <Column field="address" sortable header="Domicilio"></Column>
          <Column field="cellphone" sortable header="Celular"></Column>
        </DataTable>
      </div>
      <ModalDialog
        v-model:showModal="showModal"
        :confirmText="selectedUser ? 'Editar' : 'Crear'"
        :cancelText="selectedUser ? 'Cancelar' : 'Cerrar'"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <div class="modal__header">
          <h1>{{ !isNewUser ? 'Editar' : 'Nuevo' }} Usuario</h1>
          <Button
            v-if="!isNewUser"
            label="Eliminar"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="showDeleteConfirmation = true"
          />
        </div>
        <div class="modal__body">
          <UserForm ref="userForm" :user="selectedUser!" />
        </div>
        <template #footer>
          <div class="p-d-flex p-jc-end">
            <Button :label="isNewUser ? 'Cerrar' : 'Cancelar'" @click="onCancel" />
            <Button :label="isNewUser ? 'Crear' : 'Editar'" @click="onConfirm" />
          </div>
        </template>
      </ModalDialog>
      <ModalDialog
        v-model:showModal="showDeleteConfirmation"
        confirmText="Eliminar"
        cancelText="Cancelar"
        width="30vw"
        @update:show-modal="showDeleteConfirmation = $event"
      >
        <p>¿Estás seguro que deseas eliminar este video?</p>
        <template #footer>
          <div class="p-d-flex p-jc-end">
            <Button label="Cancelar" @click="showDeleteConfirmation = false" />
            <Button label="Eliminar" @click="onDelete" class="p-button-danger" />
          </div>
        </template>
      </ModalDialog>
    </LoadWrapper>
  </div>
</template>

<style lang="scss">
.user-view {
  .table {
    margin-bottom: 1rem;
  }
  .header {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      &__controls {
        margin: 1rem 0;
      }
    }
  }
}
.modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
