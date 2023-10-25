<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/types'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from '@/stores/users'
import LoadWrapper from '@/components/LoadWrapper.vue'

const appStore = useAppStore()
const usersStore = useUsersStore()

onMounted(async () => {
  appStore.setLoading(true)
  try {
    await usersStore.getUsers()
  } catch (error: any) {
    appStore.setError(error.message)
  } finally {
    appStore.setLoading(false)
  }
})
</script>

<template>
  <div>
    <LoadWrapper>
      <h1>Usuarios</h1>
      <p>Esta es la lista de usuarios:</p>
      <ul>
        <li v-for="user in usersStore.users" :key="user.id">{{ user.names }} - {{ user.email }}</li>
      </ul>
    </LoadWrapper>
  </div>
</template>
