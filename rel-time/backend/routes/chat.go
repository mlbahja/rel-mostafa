package routes

import (
	"database/sql"
	"forum/controllers"
	"net/http"
)

// func Websocket(db *sql.DB) {
// 	// Getusers(db)
// 	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
// 		controllers.WebsocketController(db, w, r)
// 	})

// }

func Socket(db *sql.DB){
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
		controllers.WebsocketController(db, w, r)
	})
}