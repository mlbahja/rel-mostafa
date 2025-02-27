// package controllers

// import (
// 	"database/sql"
// 	"fmt"
// 	"forum/utils"
// 	"log"
// 	"net/http"
// 	"sync"
// 	"time"

// 	"github.com/gorilla/websocket"
// )

// type ChatInfo struct {
// 	Sender     string `json:"sender"`
// 	Receiver   string `json:"receiver"`
// 	Message    string `json:"message"`
// 	Created_at string `json:"created_at"`
// }

// var mutex sync.Mutex

// var upgrader = websocket.Upgrader{}

// var connection map[int]*websocket.Conn

// func WebsocketController(db *sql.DB, w http.ResponseWriter, r *http.Request) {

// 	conn, err := upgrader.Upgrade(w, r, nil)
// 	if err != nil {
// 		log.Printf("Error upgrading connection: %v", err)
// 		return
// 	}
// 	connection = make(map[int]*websocket.Conn)
// 	defer conn.Close()

// 	userID, err := utils.UserIDFromToken(r, db)
// 	if err != nil {
// 		fmt.Println("Unauthorized:", err)
// 		return
// 	}
// 	mutex.Lock()
// 	connection[userID] = conn
// 	mutex.Unlock()
// 	for {
// 		var data ChatInfo
// 		if err := conn.ReadJSON(&data); err != nil {
// 			fmt.Println("error in read json: ", err)
// 			delete(connection, userID)
// 			break
// 		}
// 		// fmt.Println("data", data)
// 		data.Created_at = time.Now().Format("2006-01-02 15:04:05")
// 		if err := StoreMessage(db, data, userID); err != nil {
// 			fmt.Printf("Error storing message: %v\n", err)
// 			continue
// 		}
// 		if err := conn.WriteJSON(data.Receiver); err != nil {
// 			fmt.Printf("Error sending confirmation: %v\n", err)
// 		}
// 		if err := conn.WriteJSON(data); err != nil {
// 			fmt.Printf("Error sending confirmation: %v\n", err)
// 		}
// 	}

// }

// func StoreMessage(db *sql.DB, data ChatInfo, user_id int) error {
// 	query := `SELECT username FROM users WHERE user_id = ?`
// 	username := ""
// 	err := db.QueryRow(query, user_id).Scan(&username)
// 	if err != nil {
// 		return fmt.Errorf("err getting username from user_id: %v", err)
// 	}
// 	data.Sender = username
// 	query1 := `INSERT INTO chats (sender, receiver, message, created_at) VALUES (?, ?, ?, ?)`
// 	_, err = db.Exec(query1, data.Sender, data.Receiver, data.Message, data.Created_at)
// 	if err != nil {
// 		return fmt.Errorf("failed to store message: %v", err)
// 	}
// 	return nil
// }

package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"forum/utils"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type ChatMessage struct {
	Receiver string `json:"receiver"`
	Content  string `json:"content"`
}

type Message struct {
	Sender     string `json:"sender"`
	Receiver   string `json:"receiver"`
	Message1   string `json:"message"`
	Created_at string `json:"created_at"`
}

func getUseridByName(username string, db *sql.DB) (int, error) {
	query := `SELECT user_id FROM users WHERE username = ?`
	id := 0
	err := db.QueryRow(query, username).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failled to get user id %v", err)
	}
	return id, nil
}

func getNameByUserid(id int, db *sql.DB) (string, error) {
	query := `SELECT username FROM users WHERE user_id = ?`
	name := ""
	err := db.QueryRow(query, id).Scan(&name)
	if err != nil {
		return "", fmt.Errorf("failled to get user id %v", err)
	}
	return name, nil
}

var conns = map[int]*websocket.Conn{}

func WebsocketController(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	defer conn.Close()
	userid, _ := utils.UserIDFromToken(r, db)
	conns[userid] = conn
	name, _ := getNameByUserid(userid, db)
	for {
		var chatMessage ChatMessage
		err := conn.ReadJSON(&chatMessage)
		// fmt.Println(chatMessage)
		if err != nil {
			break
		}
		id, err := getUseridByName(chatMessage.Receiver, db)
		saveMessage(name, chatMessage.Receiver, chatMessage.Content, time.Now().Format("2006-01-02 15:04:05"), db)
		response := ChatMessage{
			Receiver: chatMessage.Receiver,
			Content:  chatMessage.Content,
		}
		// fmt.Println(id)
		if conns[id] != nil {
			fmt.Println("Sending message to receiver:", response)
			conns[id].WriteJSON(response)
		}
		// err = conn.WriteJSON(response)
	}
}

func saveMessage(sender, receiver, message, time string, db *sql.DB) error {
	query := `INSERT INTO chats (sender,receiver,message,created_at) VALUES (?,?,?,?)`
	_, err := db.Exec(query, sender, receiver, message, time)
	if err != nil {
		return err
	}
	return nil
}

func GetChatHistory(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userid, _ := utils.UserIDFromToken(r, db)
	username, _ := getNameByUserid(userid, db)

	query := `SELECT sender, receiver, message, created_at FROM chats WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY created_at ASC`
	rows, err := db.Query(query, username, r.URL.Query().Get("receiver"), r.URL.Query().Get("receiver"), username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var msg Message
		if err := rows.Scan(&msg.Sender, &msg.Receiver, &msg.Message1, &msg.Created_at); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		messages = append(messages, msg)
	}
	json.NewEncoder(w).Encode(messages)
}
