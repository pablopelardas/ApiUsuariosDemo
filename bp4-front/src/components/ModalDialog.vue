<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

defineProps({
  showModal: Boolean,
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  width: {
    type: String,
    default: '50vw'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const onCancel = () => {
  emit('cancel')
}

const onConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <Dialog class="modal-dialog" :visible="showModal" modal :show-header="false" :style="{ width }">
    <slot name="header" />
    <slot />
    <template #footer>
      <slot name="footer">
        <div class="p-d-flex p-jc-end">
          <Button :label="cancelText" @click="onCancel" />
          <Button :label="confirmText" @click="onConfirm" />
        </div>
      </slot>
    </template>
  </Dialog>
</template>

<style lang="scss">
.modal-dialog.p-dialog {
  min-width: 360px;
}
</style>
