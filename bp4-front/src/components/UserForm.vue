<script setup lang="ts">
import InputField from '@/components/form-controls/InputField.vue'
import { reactive } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const localUser = reactive({ ...props.user })

const errors = reactive<Record<string, string>>({
  names: '',
  lastnames: '',
  email: '',
  cuit: '',
  birthdate: '',
  residence: '',
  cellphone: ''
})

const validate = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  const requiredFields = [
    'names',
    'lastnames',
    'email',
    'cuit',
    'birthdate',
    'residence',
    'cellphone'
  ]
  requiredFields.forEach((field) => {
    if (!localUser[field]) {
      errors[field] = `El campo es requerido`
    }
  })
  // validate email
  if (localUser.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(localUser.email)) {
      errors.email = 'El email no es válido'
    }
  }
  // validate cuit
  if (localUser.cuit) {
    const cuitRegex = /^\d{2}-\d{8}-\d$/
    if (!cuitRegex.test(localUser.cuit)) {
      errors.cuit = 'El CUIT no es válido'
    }
  }

  return !requiredFields.some((field) => errors[field])
}

defineExpose({
  validate,
  localUser
})
</script>

<template>
  <div class="user-form">
    <InputField
      v-model="localUser.names"
      label="Nombres"
      id="names"
      :error="errors.names"
      errorMessage="El nombre es requerido"
    />
    <InputField
      v-model="localUser.lastnames"
      label="Apellidos"
      id="lastnames"
      :error="errors.lastnames"
      errorMessage="El apellido es requerido"
    />
    <InputField
      v-model="localUser.email"
      label="Email"
      id="email"
      :error="errors.email"
      errorMessage="El email es requerido"
    />
    <InputField
      v-model="localUser.cuit"
      label="CUIT"
      id="cuit"
      :error="errors.cuit"
      errorMessage="El CUIT es requerido"
    />
    <InputField
      v-model="localUser.birthdate"
      label="Fecha de nacimiento"
      id="birthdate"
      :error="errors.birthdate"
      errorMessage="La fecha de nacimiento es requerida"
    />
    <InputField
      v-model="localUser.residence"
      label="Residencia"
      id="residence"
      :error="errors.residence"
      errorMessage="La residencia es requerida"
    />
    <InputField
      v-model="localUser.cellphone"
      label="Celular"
      id="cellphone"
      :error="errors.cellphone"
      errorMessage="El celular es requerido"
    />
  </div>
</template>
