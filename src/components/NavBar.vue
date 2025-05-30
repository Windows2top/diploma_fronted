<template>
  <nav class="bg-green-400 p-2 mb-5 shadow-lg">
    <ul class="grid grid-cols-12 items-center">
      
      <!-- Лого -->
      <li class="hidden lg:block lg:col-span-2">
        <router-link to="/">
          <img src="../assets/logo/logo.svg" alt="logo" class="h-10 w-auto">
        </router-link>
      </li>
      <li class="block col-span-1 lg:hidden">
        <router-link to="/">
          <svg-icon type="mdi" :path="mdiHome" />
        </router-link>
      </li>

      <!-- Каталог и Поиск--> 
      <li class="col-span-9 lg:col-span-8 flex flex-col items-center relative">
        <div class="flex items-center w-full justify-center">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Поиск лекций"
            class="ms-clear shadow-lg text-white bg-green-600 rounded-lg px-3 py-2 w-2/3 focus:outline-none focus:rounded-[48px] transition-all duration-150"
            @focus="searchFocused = true"
          >
          <!-- выпадающий список -->
          <div
          v-if="searchQuery && searchFocused"
          class="absolute max-h-[50vh] top-10 bg-white rounded-b-sm w-2/4 first:rounded-none shadow-lg z-50 overflow-auto"
        >
          <div v-if="filteredTests.length > 0">
            <router-link
              v-for="test in filteredTests"
              :key="test.id"
              :to="{ name: 'CurrentTest', params: { id: test.id } }"
              @click="clearSearch"
              class="block px-4 py-3 hover:bg-green-400 hover:rounded-tb-sm hover:text-white last:hover:rounded-b-sm last:border-none"
            >
              {{ test.title }}
            </router-link>
          </div>
          <div v-else class="px-4 py-3 text-gray-500">
            Ничего не найдено
          </div>
        </div>
        </div>
      </li>

      <!-- Вход / Регистрация / Пользователь -->
      <li class="col-span-2 flex justify-end">
        <template v-if="!storedUser">
          <router-link
            to="/login"
            class="main-btn bg-green-600 text-white"
          >
            Войти
          </router-link>
          <router-link
            to="/registration"
            class="hidden lg:block ml-4 main-btn bg-green-600 text-white"
          >
            Регистрация
          </router-link>
        </template>
        <template v-else>
          <router-link
            to="/user"
            class="hidden lg:block text-white font-bold"
          >
            {{ storedUser.name }}
          </router-link>
          <router-link
            to="/user"
            class="block lg:hidden text-white font-bold"
          >
            <svg-icon type="mdi" :path="mdiAccountCircleOutline" class="text-white" />
          </router-link>
        </template>
      </li>

    </ul>
  </nav>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { mdiAccountCircleOutline, mdiHome } from '@mdi/js'

export default {
  data() {
    return {
      mdiAccountCircleOutline,
      mdiHome,
      searchQuery: '',
      tests: []
    }
  },
  computed: {
    filteredTests() {
      const query = this.searchQuery.toLowerCase()
      return this.tests.filter(test => test.title.toLowerCase().includes(query))
    },
    storedUser() {
      return useUserStore().user
    }
  },
  mounted() {
    const userStore = useUserStore()

    if (!userStore.user) {
      userStore.fetchUser()
    }

    this.$axios.get('/api/tests')
      .then(response => {
        this.tests = response.data
      })
      .catch(console.error)
  },
  methods: {
    clearSearch() {
      this.searchQuery = ''
    }
  }
}
</script>
