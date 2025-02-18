package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"forum/config"
	"forum/utils"
)

func ChatsControlers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("/////////////////////////////////////////////////////")
	if r.Method != http.MethodPost {
		utils.CreateResponseAndLogger(w, http.StatusMethodNotAllowed, nil, "Method not allowed")
		return
	}
	if r.URL.Path != "/chats" {
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(404)

		filePath := filepath.Join(config.STATIC_DIR_PUBLIC, "error.html")
		content, err := os.ReadFile(filePath)
		if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}
		w.Write(content)
		return
	}
	http.ServeFile(w, r, filepath.Join(config.STATIC_DIR_PUBLIC, "chat.html"))
}
