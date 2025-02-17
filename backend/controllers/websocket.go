package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"forum/config"
	"forum/utils"

	"github.com/fasthttp/websocket"
	// "github.com/gofiber/fiber/v2/utils"
	// "golang.org/x/net/websocket"
)

// NC is the global ConnectionMap instance.
var NC *ConnectionMap

// NC is the global ConnectionMap instance.
// Upgrader is used to upgrade HTTP connections to WebSocket connections
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Allow all connections by default (for development)
		return true
	},
}

func initconnection() {
	NC = NewConnectionMap()
}

type ConnectionMap struct {
	connections map[int][]*websocket.Conn
	mu          sync.Mutex
}

func NewConnectionMap() *ConnectionMap {
	return &ConnectionMap{
		connections: make(map[int][]*websocket.Conn),
	}
}

func (NC *ConnectionMap) AddConnection(UserID int, conn *websocket.Conn) {
	NC.mu.Lock()
	defer NC.mu.Unlock()
	NC.connections[UserID] = append(NC.connections[UserID], conn)
	fmt.Printf("Connection added for user ID %d\n", UserID)
}

func Websockethandler(w http.ResponseWriter, r *http.Request) {
	// session :=
	UserId, err := utils.UserIDFromToken(r, config.DB)
	if err != nil {
		http.Error(w, "Unauthorized: User not logged in", http.StatusUnauthorized)
		return
	}
	if UserId == 0 {
		http.Error(w, "Unauthorized: User not logged in", http.StatusUnauthorized)
		return
	}
	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error: ", err)
		return
	}
	defer connection.Close()
	NC.AddConnection(UserId, connection)
	for {
		_, message, err := connection.ReadMessage()
		if err != nil {
			log.Println("Read error", err)
			break
		}
		var sms struct {
			Resiver int    `json:"resiver"`
			Sender  string `json:"sender"`
			Content string `json:"content"`
			time    string `json:""`
		}
		var exists bool
		if err := json.Unmarshal(message, &sms); err != nil {
			log.Println("JSON unmarshal error:", err)
		}
		err = config.DB.QueryRow(`
		SELECT EXISTS(
			SELECT 1
			FROM users
			WHERE id= ?
		);`, sms.Resiver).Scan(&exists)
		if err != nil {
			log.Printf("Database error: %v", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		/*
					var sms struct {
						Resiver int    `json:"resiver"`
						Sender  string `json:"sender"`
						Content string `json:"content"`
						time    string `json:""`
					}
					 Chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
			        sender_id INTEGER NOT NULL,
			        receiver_id INTEGER NOT NULL,
			        message TEXT NOT NULL,
			        timestamp TEXT DEFAULT (datetime ('now', '+1 hour')) NOT NULL,
			        FOREIGN KEY (sender_id) REFERENCES users (user_id) ON DELETE CASCADE,
			        FOREIGN KEY (receiver_id) REFERENCES users (user_id) ON DELETE CASCADE
		*/
		result, err := config.DB.Exec(`
		INSERT INTO messages (sender_id,receiver_id,message)
		VALEUS ("mmmmm", "lll", "ooooooo");
		`, UserId, sms.Resiver, sms.Content)
		if err != nil {
			log.Printf("Database error: %v", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		fmt.Println(result)
		// lastInsertID, err := result.LastInsertId()

	}
	// UserName := utils
}
