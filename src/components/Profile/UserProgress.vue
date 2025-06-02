<template>
  <div class="content-block">
    <h2 class="flex text-3xl font-bold text-red-500 mb-6">
      <svg-icon type="mdi" :path="mdiAccountGroupOutline" class="size-9"/>
      Пользователи
    </h2>

    <div v-if="users.length !== 0" class="scroll-content">
      <div
        v-for="(user, index) in users"
        :key="user.id"
        class="bg-white p-6 mb-4 rounded-lg shadow-lg transition w-full"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-gray-500 text-sm">Номер: {{ index + 1 }}</p>
            <h3 class="text-xl font-bold text-gray-700">Имя: {{ user.name }}</h3>
            <p v-show="user.role !== 'teacher'" class="text-gray-700">Тестов: {{ user.tests.length }}</p>
          </div>

          <!-- Кнопка раскрытия -->
          <button
            @click="toggleTests(index)"
            class="flex items-center text-green-600 transition font-bold"
          >
            <span v-show="user.role !== 'teacher'" class="cursor-pointer">{{ user.showTests ? 'Скрыть результаты' : 'Показать результаты' }}</span>
            <span
              v-show="user.role !== 'teacher'"
              :class="{ 'rotate-180': user.showTests }"
              class="w-5 h-5 transform transition-transform duration-300"
            >
              ^
            </span>
          </button>
        </div>

        <!-- Контейнер со списком тестов -->
        <div
          v-show="user.showTests"
          class="overflow-hidden transition-all duration-300"
        >
          <ul class="ml-1 pl-4 border-l-4 border-green-400 text-sm text-green-600 space-y-1 mb-4">
            <li
              v-for="test in user.tests"
              :key="test.id"
            >
              • {{ test.title }}: {{ test.pivot.grade }}
            </li>
            <li v-if="user.tests.length === 0">
              Тесты отсутствуют
            </li>
          </ul>
        </div>

        <form @submit.prevent="deleteUser(user.id)" class="flex justify-between items-center">
          <div class="inline-block"></div>
          <button type="submit" class="main-btn bg-red-500 text-white hover:bg-red-600">
            Удалить
          </button>
        </form>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Нет пользователей
    </div>
  </div>
</template>

<script>
import { mdiAccountGroupOutline } from '@mdi/js'

export default {
  name: 'DeleteUser',
  data() {
    return {
      mdiAccountGroupOutline,
      users: [],
    };
  },
  mounted() {
    const sanctum_token = localStorage.getItem('sanctum_token');

    this.$axios
      .get('/api/users/tests', {
        headers: {
          Authorization: `Bearer ${sanctum_token}`,
        },
      })
      .then((response) => {
        this.users = response.data.map(user => ({ ...user, showTests: false }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    toggleTests(index) {
      this.users[index].showTests = !this.users[index].showTests;
    },
    deleteUser(id) {
      const sanctum_token = localStorage.getItem('sanctum_token');

      this.$axios
        .delete(`/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${sanctum_token}`,
          },
        })
        .then((response) => {
          console.log(response.data.message);
          this.users = this.users.filter((user) => user.id !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
