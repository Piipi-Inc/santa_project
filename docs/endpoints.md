# Эндпоинты санты

## 1. Авторизация и управление пользователями

### 1.1. Регистрация пользователя

* POST `/api/v1/register`
* Описание: Регистрация нового пользователя.
* Body:
    ```json
    {
    "username": "string",
    "name": "string",
    "preferences": "string",
    "password": "string"
    }
    ```

* Ответ:
    ```json
    {
    "token": "string"
    }
    ```


### 1.2. Логин пользователя (JWT токен)

* POST `/api/v1/login`
* Описание: Логин пользователя и получение JWT токена.
* Body:
    ```json
    {
    "username": "string",
    "password": "string"
    }
    ```

* Ответ:
    ```json
    {
    "token": "string"
    }
    ```

### 1.2.1. Выйти из аккаунта
* POST `/api/v1/logout`
* Описание: Выход из аккаунта / удаление jwt-токена из куки

### 1.3. Получение информации о текущем пользователе

* GET `/api/v1/user`
* Описание: Получение данных авторизованного пользователя по токену.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
    "id": "string",
    "username": "string",
    "name": "string",
    "preferences": "string",
    "completed_events": [
        "string"
    ]
    }
    ```


### 1.4. Изменение информации о пользователе

* PATCH `/api/v1/user`
* Описание: Изменение данных пользователя (имя, email, пароль).
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Body:
    ```json
    {
    "name": "string",
    "preferences": "string"
    }
    ```

### 1.5. Получение списка лобби пользователя

* GET `/api/v1/user/lobbies`
* Описание: Получение списка лобби, в котором пользователь принимает участие.
* Headers:
    * Authorization: `Bearer <jwt_token>`

* Ответ:
    ```json
    [
    {
        "lobby_code": "string",
        "lobby_name": "string",
        "is_started": true
    }
    ]
    ```


## 2. Работа с лобби и событиями

### 2.1. Создание нового лобби

* POST `/api/v1/lobby`
* Описание: Создание нового лобби для игры.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Body:
    ```json
    {
    "lobby_name": "string"
    }
    ```

* Ответ:
    ```json
    {
    "lobby_code": "string",
    "lobby_name": "string"
    }
    ```


### 2.2. Получение информации о лобби

* GET `/api/v1/lobby/{lobby_id}`
* Описание: Получение данных о лобби по его коду.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
    "lobby_id": "string",
    "lobby_name": "string",
    "participants": [
        {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "username": "string",
        "name": "string"
        }
    ],
    "is_started": true,
    "is_admin": true
    }
    ```


### 2.3. Присоединение к лобби

* POST `/api/v1/lobby/join`
* Описание: Присоединение к существующему лобби.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Body:
    ```json
    {
        "lobby_id": "string"
    }
    ```

### 2.4. Настроить вебсокет-соединение
* WS /api/v1/ws/lobby/{lobby_id}
?
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
        "santa_for_user": {
            "username": "string",
            "name": "string",
            "preferences": "text"
        }
    }
    ```

### 2.5. Начало игры

* POST `/api/v1/lobby/{lobby_id}/start`
* Описание: Запуск игры в лобби.
* Headers:
    * Authorization: `Bearer <jwt_token>`

### 2.6. Получение информации о подарке

* GET `/api/v1/lobby/{lobby_id}/gift`
* Описание: Получение информации о подарке.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
    "username": "string",
    "name": "string",
    "preferences": "string"
    }
    ```

## 3. Просмотр событий (сторителлинг, результаты игры и т.д.)

### 3.1. Отметить ивент как пройденный

* POST `/api/v1/events/complete`
* Описание: Маркировка определенного ивента (например, просмотр сторителлинга) как завершенного.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Body:
    ```json
    {
    "event_name": "string"
    }
    ```
