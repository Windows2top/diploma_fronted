<template>
    <form @submit.prevent="logout" id="logout" class="hidden">
    </form>
        <!-- Кнопка выхода -->
    <button
      type="submit"
      form="logout"
      class="inline-block main-btn bg-red-500 text-white"
    >
      Выйти
    </button>
  </template>

<script>
import Cookies from 'js-cookie';
export default {
    methods: {
        logout() {
            this.$axios.get('/sanctum/csrf-cookie')
            .then(() => {
                const token = Cookies.get('XSRF-TOKEN');
                const sanctum_token = localStorage.getItem('sanctum_token');
                this.$axios.post('/api/logout', {}, {
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(token),
                        'Authorization': `Bearer ${sanctum_token}`
                    }
                })
                .then(response => {
                    localStorage.removeItem('sanctum_token');
                    localStorage.removeItem('user');
                    console.log(response);
                    this.$router.push('/').then(() => {
                        window.location.reload();
                    });
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>