<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const isLoading = computed(() => appStore.loading)
const error = computed(() => appStore.error)
</script>

<template>
  <div class="wrapper">
    <slot name="loader" v-if="isLoading">
      <div v-if="isLoading" class="wrapper-loader">
        <ProgressSpinner />
      </div>
    </slot>
    <slot name="error" v-else-if="error">
      <div class="wrapper-error">
        <h1>Algo ocurrió</h1>
        <p>{{ error }}</p>
      </div>
    </slot>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.wrapper-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
