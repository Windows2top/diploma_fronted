<template>
    <h2>Карта сайта</h2>

    <ul class="min-h-[70vh]">
        <li><strong>Главная страница</strong> — <code>/</code>
            <p>Основная информация о сайте и доступ к функциям.</p>
        </li>

        <li><strong>Регистрация</strong> — <code>/registration</code>
            <p>Страница для создания новой учетной записи.</p>
        </li>

        <li><strong>Авторизация</strong> — <code>/login</code>
            <p>Страница входа в личный кабинет.</p>
        </li>

        <li><strong>Личный кабинет пользователя</strong> — <code>/user</code>
            <p>(Если вы учитель) Панель управления пользователя.</p>
            <ul>
                <li><strong>Создание теста</strong> — <code>/user/create_test</code>
                    <p>Раздел для создания нового тестового задания.</p>
                </li>
            </ul>
        </li>

        <li><strong>Просмотр теста</strong> — <code>/tests/:id</code>
            <p>Страница с подробной информацией о выбранном тесте.</p>
        </li>

        <li><strong>Редактирование теста</strong> — <code>/tests/:id/edit</code>
            <p>Страница для редактирования содержания существующего теста.</p>
        </li>

        <li><strong>Прохождение теста</strong> — <code>/tests/:id/questions</code>
            <p>Страница для непосредственного прохождения теста учеником.</p>
        </li>
    </ul>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 40px;
    line-height: 1.6;
}
h1, h2 {
    color: #2c3e50;
}
ul {
    list-style-type: none;
    padding-left: 20px;
}
li::before {
    content: "➔ ";
    color: #3498db;
}
</style>