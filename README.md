**Инструкция по запуску сайта**:
- В нужной папке вызовите команду: `git clone https://github.com/Sazan4ek/Kinodvizh.git`, которая копирует проект на ваш локальный репозиторий
- В этой же папке: `cd Kinodvizh`

`Без Docker`
1) `cd react-kinodvizh`
2) Скачайте зависимости фронтенда: `npm i`
3) `npm run dev` - локальный Frontend сервер подключён. На домене, который вы указали в файле `.env` в значении `FRONTEND_URL` будет находится сам сайт
4) Cоздайте новый терминал в корневой папке проекта и с помощью composer скачайте все пакеты и зависимости php: `composer install` 
5) Настройте в файлике `.env` или скопируйте файл `.env.example` данные от вашей базы данных 
6) Запустите миграции бд с заполнением фейковыми данными: `php artisan migrate:fresh --seed`
7) Затем запустите и сам локальный сервер Бэкенда: `php artisan serve`
8) ***Наслаждайтесь*** :)

`С Docker`:
1) `docker-compose up -d`
2) `docker exec -it laravel-kinodvizh sh`
3) `php artisan key: generate`
4) `php artisan migrate:fresh --seed`
5) ***Наслаждайтесь*** :)
