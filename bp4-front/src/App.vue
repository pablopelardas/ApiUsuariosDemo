<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'

const menuItems = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    route: '/'
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-fw pi-user',
    route: '/users'
  }
]
</script>

<template>
  <main class="app">
    <header class="app-header">
      <div class="container">
        <nav>
          <div class="logo">
            <img src="./assets/logo.svg" alt="Logo GPE" />
          </div>
          <Menubar :model="menuItems">
            <template #item="{ item }">
              <RouterLink :to="item.route">{{ item.label }}</RouterLink>
            </template>
          </Menubar>
        </nav>
      </div>
    </header>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.app {
  &-header {
    background-color: $nav-color;
    color: #363636;
    padding: 1rem;
    margin-bottom: 2rem;
    nav {
      display: flex;
      justify-content: space-between;
      .logo {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          @media (max-width: 450px) {
            width: 50px;
          }
        }
      }
      .p-menubar {
        background-color: $nav-color;
        border: none;
        font-family: $font-medium;
        ul.p-menubar-root-list {
          align-items: center;
          margin-right: 1rem;
          .p-menuitem.p-focus {
            .p-menuitem-content {
              background-color: transparent;
            }
          }
          .p-menuitem-content {
            margin-left: 1rem;
            &:hover {
              background-color: transparent;
            }
            a {
              text-decoration: none;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        .p-menubar-end {
          @media screen and (max-width: 500px) {
            display: none;
          }
        }
      }
    }
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}
</style>
