<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InlineMessage from 'primevue/inlinemessage'
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="field">
    <div class="field-header">
      <label :for="id">{{ label }}</label>
      <InlineMessage v-if="error">{{ error }}</InlineMessage>
    </div>
    <InputText
      :value="modelValue"
      @update:model-value="(value: string) => $emit('update:modelValue', value)"
      :id="id"
      :disabled="disabled"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';
.field {
  font-family: $font-medium;
  width: 100%;
  margin-bottom: 1rem;
  & .field-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    & .p-inline-message {
      width: 100%;
    }
  }
  & input {
    width: 100%;
  }
}
</style>
