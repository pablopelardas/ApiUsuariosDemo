<script setup lang="ts">
import { ref } from 'vue'
import Calendar from 'primevue/calendar'
import InlineMessage from 'primevue/inlinemessage'
const props = defineProps({
  modelValue: {
    type: Date,
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

const date = ref<Date>(props.modelValue)
</script>

<template>
  <div class="field">
    <div class="field-header">
      <label :for="id">{{ label }}</label>
      <InlineMessage v-if="error">{{ error }}</InlineMessage>
    </div>
    <Calendar
      v-model="date"
      @update:model-value="(value: string) => $emit('update:modelValue', value)"
      date-format="dd/mm/yy"
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
