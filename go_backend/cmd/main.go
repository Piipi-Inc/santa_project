package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // Маршруты
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Добро пожаловать!"})
    })

    r.GET("/about", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "О нас"})
    })

    // Запуск сервера
    r.Run(":8080")
}
