package routes

import (
	"fmt"
	"net/http"

	"forum/controllers"
)

func Chats() {
	fmt.Println("dkhl l chats ....")
	http.HandleFunc("/chats", controllers.ChatsControlers)
}
