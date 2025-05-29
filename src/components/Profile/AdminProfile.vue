<template>
  <div class="bg-gray-50 min-h-screen py-10">
    <UserProgress />
      <div class="content-block">
        <h2 class="flex text-3xl font-bold text-green-500 mb-6">
          <svg-icon type="mdi" :path="mdiAccountPlusOutline" class="size-9"/>
          Заявки на регистрацию
        </h2>
        <Logout />

  
        <div v-if="applications.length !== 0" class="scroll-content">
          <transition-group name="soft-delete">
            <div v-for="(application, index) in applications" :key="application.id" class="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
              <div class="mb-4">
                <p class="text-gray-500 text-sm">Номер: {{ index + 1 }}</p>
                <h3 class="text-xl font-bold text-gray-700">Имя: {{ application.name }}</h3>
                <p class="text-gray-600">Почта: {{ application.email }}</p>
                <p class="text-gray-600">Роль: {{ application.role }}</p>
              </div>
    
              <div class="flex gap-4">
                <form @submit.prevent="acceptUser(application.id)">
                  <button type="submit" class="main-btn bg-green-400 text-white">
                    Принять
                  </button>
                </form>
                <form @submit.prevent="rejectUser(application.id)">
                  <button type="submit" class="main-btn bg-red-500 text-white">
                    Отклонить
                  </button>
                </form>
              </div>
            </div>
          </transition-group>
        </div>
  
        <div v-else class="text-center text-gray-500">
          Нет заявок
        </div>
      </div>
    </div>
  </template>

<script>
import Cookies from 'js-cookie';
import Logout from './Logout.vue';
import UserProgress from './UserProgress.vue';
import { mdiAccountPlusOutline } from '@mdi/js'

export default {
    components: { Logout, UserProgress },
    data() {
        return {
            mdiAccountPlusOutline,
            applications: {}
        }
    },
    mounted() {
        const sanctum_token = localStorage.getItem('sanctum_token');
        
        this.$axios.get('/api/applications', {
            headers: {
                'Authorization': `Bearer ${sanctum_token}`
            }
        })
        .then(response => {
            console.log(response);
            this.applications = response.data;
        })

    },
    methods: {
        acceptUser(id) {
            this.$axios.get('/sanctum/csrf-cookie')
            .then(() => {
                const token = Cookies.get('XSRF-TOKEN');
                this.$axios.post(`/accept-application/${id}`, { 
                }, {
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(token)
                    }
                })
                .then(response => {
                    console.log(response);
                    this.removeApplicationById(id);
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
            })
        },
        rejectUser(id) {
          this.$axios.get('/sanctum/csrf-cookie')
          .then(() => {
              const token = Cookies.get('XSRF-TOKEN');
              this.$axios.delete(`/accept-application/${id}`, {
                  headers: {
                      'X-XSRF-TOKEN': decodeURIComponent(token)
                  }
              })
              .then(response => {
                  console.log(response);
                  this.removeApplicationById(id);
              })
              .catch(error => {
                  console.log(error);
              });
          })
          .catch(error => {
              console.log(error);
          });
        },
        removeApplicationById(id) {
          this.applications = this.applications.filter(app => app.id !== id);
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