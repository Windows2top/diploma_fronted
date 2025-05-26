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
export default {
    data() {
        return {
            userData: JSON.parse(localStorage.getItem('user'))
        }
    },
    computed: {
        currentComponent() {
            if (this.userData === null) return ErrorPage;
            
            switch(this.userData.role) {
                case 'student':
                    return StudentProfile;
                case 'teacher':
                    return TeacherProfile;
                case 'admin':
                    return AdminProfile;
            }
        }
    }
}
</script>