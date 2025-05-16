FROM php:8.2-fpm-alpine

RUN apk update
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Установка расширений PHP
RUN docker-php-ext-install pdo pdo_mysql gd exif pcntl bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app/

COPY laravel-kinodvizh/composer.json laravel-kinodvizh/composer.lock ./

RUN composer install --no-autoloader --no-dev --no-scripts

COPY laravel-kinodvizh/ ./

RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data storage bootstrap/cache

CMD ["php-fpm"]