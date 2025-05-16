**Инструкция по запуску сайта**:
`Без Docker`
1) В нужной папке вызовите команду: `git clone https://github.com/Sazan4ek/Kinodvizh.git`, которая копирует проект на ваш локальный репозиторий
2) В этой же папке: `cd Kinodvizh`
3) `cd react-kinodvizh`
4) Скачайте зависимости фронтенда: `npm i`
5) `npm run dev` - локальный Frontend сервер подключён. На домене, который вы указали в файле `.env` в значении `FRONTEND_URL` будет находится сам сайт
6) Cоздайте новый терминал в корневой папке проекта и с помощью composer скачайте все пакеты и зависимости php: `composer install` 
7) Настройте в файлике `.env` или скопируйте файл `.env.example` данные от вашей базы данных 
8) Запустите миграции бд с заполнением фейковыми данными: `php artisan migrate:fresh --seed`
9) Затем запустите и сам локальный сервер Бэкенда: `php artisan serve`
10) ***Наслаждайтесь*** :)

`С Docker`:
1) `docker-compose up -d`
2) `docker exec -it laravel-kinodvizh sh`
3) `php artisan key: generate`
4) `php artisan migrate:fresh --seed`
5) ***Наслаждайтесь*** :)