import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserForm from '@/components/UserForm.vue'

const user = {
  names: 'John',
  lastnames: 'Doe',
  email: 'asd@asd.asd',
  birthdate: '1990-01-01',
  cellphone: '123456789',
  residence: 'Argentina',
  cuit: '20-40846184-8'
}

describe('UserForm', () => {
  it('should render correctly', () => {
    const wrapper = mount(UserForm)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should contain each user input field', () => {
    const wrapper = mount(UserForm)
    const fields = ['names', 'lastnames', 'email', 'birthdate', 'cellphone', 'residence', 'cuit']
    const wrapperFields = wrapper.findAllComponents({ name: 'InputField' })
    expect(wrapperFields.length).toBe(fields.length)
    console.log(wrapperFields)
    fields.forEach((field) => {
      const wrapperField = wrapperFields.find((wrapperField) => wrapperField.props('id') === field)
      expect(wrapperField?.exists()).toBe(true)
    })
  })
  it('should expose method to validate user and userData', () => {
    const wrapper = mount(UserForm)
    expect(wrapper.vm.validate).toBeDefined()
    expect(wrapper.vm.localUser).toBeDefined()
  })

  it('validation should return false if any field is empty ', () => {
    let wrapper = mount(UserForm, {
      props: {
        user: {
          ...user,
          names: ''
        }
      }
    })
    expect(wrapper.vm.validate()).toBe(false)

    wrapper = mount(UserForm, {
      props: {
        user
      }
    })
    expect(wrapper.vm.validate()).toBe(true)
  })
  it('validation should return false if cuit is invalid', () => {
    const wrapper = mount(UserForm, {
      props: {
        user: {
          ...user,
          cuit: 'asd'
        }
      }
    })
    expect(wrapper.vm.validate()).toBe(false)
  })

  it('should show error message if field is invalid', async () => {
    const wrapper = mount(UserForm, {
      props: {
        user: {
          ...user,
          names: ''
        }
      }
    })
    const wrapperField = wrapper.findComponent({ name: 'InputField', props: { id: 'names' } })
    expect(wrapperField.exists()).toBe(true)
    await wrapper.vm.validate()
    const error = wrapperField.getComponent({ name: 'InlineMessage' })
    expect(error.text()).toContain('El campo es requerido')
  })

  it('should remove error message if field is valid', async () => {
    const wrapper = mount(UserForm, {
      props: {
        user: {
          ...user,
          names: ''
        }
      }
    })
    const wrapperField = wrapper.findComponent({ name: 'InputField', props: { id: 'names' } })
    expect(wrapperField.exists()).toBe(true)
    await wrapper.vm.validate()
    const error = wrapperField.getComponent({ name: 'InlineMessage' })
    expect(error.text()).toContain('El campo es requerido')
    wrapperField.vm.$emit('update:modelValue', 'John')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.localUser.names).toBe('John')
    expect(wrapperField.vm.error).toBe('')
    expect(wrapperField.findComponent({ name: 'InlineMessage' }).exists()).toBe(false)
  })
})
