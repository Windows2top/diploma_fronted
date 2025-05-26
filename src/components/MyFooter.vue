<template>
    <footer class="bg-gray-500 py-8">
        <div class="mx-auto">
            <div class="flex flex-wrap justify-center">
                <!-- Первый блок -->
                <div class="w-full sm:w-[23%]">
                    <h5 class="font-semibold mb-4">©2024-2025. arch-pc</h5>
                    <a href="" class="block text-white mb-2">Пользовательское соглашение</a>
                    <a href="" class="block text-white">Политика конфиденциальности</a>
                </div>
                
                <!-- Второй блок -->
                <div class="w-full sm:w-[23%]">
                    <h5 class="font-semibold mb-4">Помощь</h5>
                    <router-link to="/help"class="block text-white mb-2">Руководство пользователя</router-link>
                    <router-link to="/site_map" class="block text-white mb-2">Карта сайта</router-link>
                </div>

                <!-- Третий блок -->
                <div class="w-full sm:w-[23%]">
                    <h5 class="font-semibold mb-4">О нас</h5>
                    <a href="" class="block text-white mb-2">История сайта</a>
                    <a href="" class="block text-white mb-2">Назначение сайта</a>
                    <a href="" class="block text-white">Лицензия</a>
                </div>


                <!-- Четвертый блок -->
                <div class="w-full sm:w-[23%]">
                    <h5 class="font-semibold mb-4">Контакты</h5>
                    <a href="tel:+78005553535" class="block text-white mb-2">+78005553535</a>
                    <a href="mailto:arch-pc@gmail.com" class="block text-white mb-2">arch-pc@gmail.com</a>
                    <div class="flex gap-4 mt-2">
                        <a href="#"><img src="../assets/icons/VK.svg" alt="vkontakte" class="w-6 h-6"></a>
                        <a href="#"><img src="../assets/icons/TG.svg" alt="telegram" class="w-6 h-6"></a>
                        <a href="#"><img src="../assets/icons/YT.svg" alt="youtube" class="w-6 h-6"></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>