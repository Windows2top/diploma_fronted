<template>
    <UserData />
    <div class="content-block">
      <!-- Cоздания теста -->
      <router-link
        v-if="$route.name !== 'CreateTest'"
        :to="{ name: 'CreateTest' }"
        class="inline-block mb-6 mr-5 main-btn bg-green-400 text-white font-bold"
      >
        Создать лекцию
      </router-link>

      <div class="mt-8 min-h-[70vh] max-h-[400px] overflow-x-hidden overflow-y-auto">
        <transition-group name="soft-delete">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Лекции</h3>
          <div v-if="tests.length === 0">
            Нет лекций
          </div>
          <div v-else v-for="(test, index) in tests" :key="test.id" class="bg-white p-6 mb-4 rounded-lg shadow-lg transition w-full">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="pb-3">Тест {{ index + 1 }}</h2>
                <h3 class="font-bold text-green-600 text-2xl mb-2">{{ test.title }}</h3>
                <p>{{ test.description }}</p>
              </div>
            </div>
    
            <div class="flex justify-between items-center">
              <!-- Кнопка для обновления теста -->
              <router-link
                :to="{ name: 'UpdateTest', params: { id: test.id } }"
                class="inline-block main-btn bg-green-400 text-white"
              >
                Обновить
              </router-link>
    
              <!-- Кнопка для удаления теста -->
              <button
                type="button"
                @click="deleteTest(test.id)"
                class="inline-block main-btn bg-red-500 text-white"
              >
                Удалить
              </button>
            </div>
          </div>
          <p v-if="message" class="text-green-500 font-bold text-lg mt-4">{{ message }}</p>
        </transition-group>
  
      </div>
    </div>
    <UserProgress />
</template>
  
<script>
import UserData from './UserData.vue';
import UserProgress from './UserProgress.vue';
export default {
    components: { UserData, UserProgress },
    data() {
        return {
            tests: [],
            message: null
        };
    },
    mounted() {
        this.$axios.get('/api/tests')
        .then(response => {
            this.tests = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    },
    methods: {
        deleteTest(id) {
            const sanctum_token = localStorage.getItem('sanctum_token');

            this.$axios.delete(`/api/tests/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sanctum_token}`
                }
            })
            .then(response => {
                console.log(response.data.message);
                this.message = response.data.message;
                this.removeTestById(id);
            })
            .catch(error => {
                console.log(error);
            })
        },
        removeTestById(id) {
            this.tests = this.tests.filter(test => test.id !== id);
        }
    }
}
</script>

<style scoped>
.soft-delete-leave-active {
  transform: translateX(500px);
  transition: transform opacity 0.5s ease;
}

.soft-delete-leave-to {
  opacity: 0;
}
</style>