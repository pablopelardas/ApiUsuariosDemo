<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <main>
    <div class="container">
      <h1>Bienvenido a la Aplicación de ABM de Usuarios</h1>
      <p>
        En esta aplicación podrás crear, editar y eliminar usuarios. Para comenzar, navega a la
        sección de <RouterLink :to="{ name: 'users' }">Usuarios</RouterLink>.
      </p>
    </div>
  </main>
</template>
