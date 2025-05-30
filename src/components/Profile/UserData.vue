<template>
    <div class="content-block">
        <h2 class="text-3xl font-bold text-green-500 mb-6">{{ userData.name }}</h2>
        <p class="text-gray-600">Почта: {{ userData.email }}</p>
        <p class="text-gray-600">Роль: {{ userData.role }}</p>
        <Logout />
    </div>
</template>
<script>
import Logout from './Logout.vue';
export default {
    components: { Logout },
    data() {
        return {
            userData: {}
        };
    },
    mounted() {
        this.userData = JSON.parse(localStorage.getItem('user'));
    }
}
</script>