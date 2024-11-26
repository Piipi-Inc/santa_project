package models

type User struct {
	Username    string ` json:"username" `
	Name        string `json:"name"`
	Preferences string `json:"preferences"`
	Password    string `json:"password"`
}