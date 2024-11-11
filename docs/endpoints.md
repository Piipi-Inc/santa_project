# Эндпоинты санты

## 1. Авторизация и управление пользователями

### 1.1. Регистрация пользователя

* POST `/api/register`
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
        "data": {
                "token": "jwt_token"
            },
        "error": null
    }
    ```


### 1.2. Логин пользователя (JWT токен)

* POST `/api/login`
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
        "data": {
                "token": "jwt_token"
            },
        "error": null
    }
    ```

### 1.2.1. Выйти из аккаунта (под ?)
* POST `/api/logout`
* Описание: Выход из аккаунта / удаление jwt токена из базы (если имеется)

### 1.3. Получение информации о текущем пользователе

* GET `/api/user`
* Описание: Получение данных авторизованного пользователя по токену.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
        "data": {
            "id": 1,
            "username": "string",
            "name": "string",
            "preferences": "string",
            "completed_events": {
                "storytelling_viewed": true,
                "gift_sent": false,
            }
        },
        "error": null
    }
    ```


### 1.4. Изменение информации о пользователе

* PATCH `/api/user/update`
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

* Ответ:
    ```json
    {
        "data": {
            "name": "string",
            "preferences": "string",
        },
        "error": null
    }
    ```

### 1.5. Получение списка лобби пользователя

* GET `/api/user/lobbies`
* Описание: Получение списка лобби, в котором пользователь принимает участие.
* Headers:
    * Authorization: `Bearer <jwt_token>`

* Ответ:
    ```json
    {
        "data": [
            {
                "lobby_code": "<lobby_code>",
                "lobby_name": "<lobby_name>",
                "is_started": false
            }
        ],
        "error": null
    }
    ```


## 2. Работа с лобби и событиями

### 2.1. Создание нового лобби

* POST `/api/lobby/create`
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
        "data": {
            "lobby_id": "lobby_code"
        },
        "error": null
    }
    ```


### 2.2. Получение информации о лобби

* GET `/api/lobby/{lobby_id}`
* Описание: Получение данных о лобби по его коду.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
        "data": {
            "lobby_id": "string",
            "lobby_name": "string",
            "participants": [
                {   
                    "id": 1,
                    "username": "string",
                    "name": "string"
                }
            ],
            "is_started": false,
            "is_admin": false
        },
        "error": null
    }
    ```


### 2.3. Присоединение к лобби

* POST /api/lobby/join
* Описание: Присоединение к существующему лобби.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Body:
    ```json
    {
        "lobby_id": "string"
    }
    ```

* Ответ:
    ```json
    {
        "message": "Successfully joined the lobby"
    }
    ```

### 2.4. Настроить вебсокет-соединение
* WS /api/lobby/{lobby_id}
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

* POST `/api/lobby/{lobby_id}/start`
* Описание: Запуск игры в лобби.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
        "santa_for_user": {
            "username": "string",
            "wishlist": "string_url"
        }
    }
    ```


## 3. Просмотр событий (сторителлинг, результаты игры и т.д.)

### 3.1. Отметить ивент как пройденный

* POST `/api/events/complete`
* Описание: Маркировка определенного ивента (например, просмотр сторителлинга) как завершенного.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Body:
    ```json
    {
        "event_name": "string"
    }
    ```

* Ответ:
    ```json
    {
        "data": null,
        "error": null
    }
    ```


### 3.2. Получение списка завершенных ивентов пользователя

* GET `/api/events/completed`
* Описание: Получение информации о пройденных ивентах пользователем.
* Headers:
    * Authorization: `Bearer <jwt_token>`
* Ответ:
    ```json
    {
        "data": {
            "completed_events": {
                "storytelling_viewed": true,
                "gift_sent": false
            }
        },
        "error": null
    }
    ```