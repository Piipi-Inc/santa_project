package routes

import (
	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}


func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	h := &handler{
		DB: db,
	}

	routes := r.Group("/api")
	routes.POST("/register", h.RegisterUser)
	routes.POST("/login", h.LoginUser)
	routes.POST("/logout", h.LogoutUser)
	routes.POST("/lobby/create", h.LCreateLobby)
	routes.POST("/lobby/{lobby_id}", h.LobbyInfo)
	routes.POST("/lobby/join", h.LobbyJoin)
	routes.PATCH("/user/update", h.UpdateUser)
	routes.GET("/user", h.GetUser)
	routes.GET("/user/lobbies", h.GetLobbies)
	routes.DELETE("/:id", h.DeleteBook)
	

}