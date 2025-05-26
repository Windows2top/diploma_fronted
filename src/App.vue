<template>
    <NavBar v-if="!$route.meta.hiddenNavBar" />

    <router-view></router-view>

    <MyFooter v-if="!$route.meta.hiddenMyFooter" />
</template>

<script>
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'

export default {
    components: { NavBar, MyFooter },
}
</script>


