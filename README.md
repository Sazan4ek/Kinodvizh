**Инструкция по запуску сайта**:
1) В нужной папке вызовите команду: *git clone https://github.com/Sazan4ek/Kinodvizh.git*, которая копирует проект на ваш локальный репозиторий
2) В этой же папке: *cd Kinodvizh*
3) *cd react-kinodvizh*
4) Скачайте зависимости фронтенда: *npm i*
5) *npm run dev* - локальный Frontend сервер подключён. На домене, который вы указали в файле *.env* в значении *FRONTEND_URL* будет находится сам сайт
6) Cоздайте новый терминал в корневой папке проекта и с помощью composer скачайте все пакеты и зависимости php: *composer install* 
7) Настройте в файлике *.env* данные от вашей базы данных 
8) Запустите миграции бд с заполнением фейковыми данными: *php artisan migrate:fresh --seed*
9) Затем запустите и сам локальный сервер Бэкенда: *php artisan serve*
10) ***Наслаждайтесь*** :)