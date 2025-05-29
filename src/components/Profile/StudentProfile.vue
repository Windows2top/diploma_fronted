<template>
    <div class="bg-gray-50 min-h-screen py-10">
      <div class="content-block">
        <h2 class="flex text-3xl font-bold text-green-500 mb-6">
            <svg-icon type="mdi" :path="mdiCertificateOutline" class="size-9"/>
            Пройденные лекции
        </h2>
        <Logout />
  
        <div v-if="completeTests.length > 0" class="scroll-content">
          <div v-for="(completeTest, index) in completeTests" :key="index" class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="inline-block font-semibold text-xl text-green-600">{{ completeTest.title }}</h3>
            <p>{{ completeTest.description }}</p>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          <p>Вы еще не усвоили ни одной лекции</p>
        </div>
  
    </div>
    </div>
</template>

<script>
import Logout from './Logout.vue';
import { mdiCertificateOutline } from '@mdi/js'

export default {
    components: { Logout },
    data() {
        return {
            mdiCertificateOutline,
            completeTests: []
        }
    },
    mounted() {
        const sanctum_token = localStorage.getItem('sanctum_token');

        this.$axios.get('/api/user/tests', {
            headers: {
                'Authorization': `Bearer ${sanctum_token}`
            }
        })
        .then(response => {
            this.completeTests = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>