<template>
    <div class="min-h-[80vh]">
      <div v-if="test" class="content-block">
        <h1 class="text-3xl font-bold text-green-600 mb-4">{{ test.title }}</h1>
        <p class="text-gray-700 text-lg mb-6">{{ test.lection }}</p>
        <router-link 
          :to="{ name: 'PassingTest', params: { id: test.id } }"
          class="main-btn bg-green-400 text-white font-bold"
        >
          Проверить себя
        </router-link>
      </div>
      <div v-else-if="error === 404">
        <ErrorPage />
      </div>
      <div v-else class="text-center">
        <h5 class="text-lg text-gray-500">Загрузка...</h5>
      </div>
    </div>
</template>

<script>
import ErrorPage from './ErrorPage.vue';
export default {
    components: { ErrorPage },
    data () {
        return {
            test: '',
            error: ''
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.$axios.get(`/api/tests/${this.id}`)
        .then(response => {
            this.test = response.data;
        })
        .catch(error => {
            this.error = error.request.status;
        });

    }
}
</script>