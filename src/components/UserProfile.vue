<template>
  <main>
    <router-view></router-view>
    <component :is="currentComponent"></component>
  </main>
</template>

<script>
import ErrorPage from './ErrorPage.vue'
import StudentProfile from './Profile/StudentProfile.vue'
import TeacherProfile from './Profile/TeacherProfile.vue'
import AdminProfile from './Profile/AdminProfile.vue'
import { useUserStore } from '@/stores/user'

export default {
  computed: {
    userData() {
      return useUserStore().user
    },
    currentComponent() {
      if (!this.userData) return ErrorPage

      switch (this.userData.role) {
        case 'student':
          return StudentProfile
        case 'teacher':
          return TeacherProfile
        case 'admin':
          return AdminProfile
      }
    }
  },
  mounted() {
    const store = useUserStore()
    if (!store.user) {
      store.fetchUser()
    }
  }
}
</script>
