const ws = new WebSocket("ws://localhost:8080/ws");

ws.onopen = () => {
  console.log("Connected to WebSocket server");

  // const chatMessage = {
  //   type: "chat",
  //   content: "Hello server!",
  //   timestamp: new Date().toISOString()
  // };


  // ws.send(JSON.stringify(chatMessage))
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Incoming message:', message);
  
  displayMessage(message);
};

ws.onerror = (err) => {
  console.error("Websocket error : %v", err);
}

ws.onclose = () => {
  console.log("Disconnected from WebSocket server");
};


// message = {type: chat, content: message, sender: username}




// function sendMessage(text) {
//   const message = { user: "You", text };
//   socket.send(JSON.stringify(message));
//   displayMessage(message);
// }

// function displayMessage(message) {
//   const chatBox = document.getElementById("chat-messages");
//   const msgDiv = document.createElement("div");
//   msgDiv.textContent = `${message.receiver}: ${message.content}`;
//   chatBox?.appendChild(msgDiv);
// }

function displayMessage(message) {
  const chatBox = document.getElementById("chat-messages");
  if (chatBox) {
      console.log(message);
      
      const msgDiv = document.createElement("div");
      msgDiv.className = `message-bubble ${message.sender === 'You' ? 'message-outgoing' : 'message-incoming'}`;
      msgDiv.textContent = `${message.content}`;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
  }
}


// function getUsers() {
//   fetch("/users")
//     .then((users) => {
//       if (!users.ok) {
//         alert("responce not 200 !!!!");
//       }
//       return users.json();
//     })
//     .catch((err) => {
//       alert("catch: ", err);
//     });
// }

// getUsers();


function sendMessage(user) {
  // const input = document.getElementById("chat-input").value;
 let nn = ""
  document.getElementById("chat-input").addEventListener("keyup", (e) => {
    
    if (e.key !== "Enter"){
      nn = e.target.value
    }
    
    if (e.key === "Enter") {
 
      console.log(nn);
      ws.send(
        JSON.stringify({
          receiver: user,
          content: nn,
        })
      );
      // const message = (receiver, input);
      // displayMessage({
      //   receiver: user,
      //   content: nn,
      // });
    }

  })
}

// document.getElementById("chat-input").addEventListener("keypress", (e) => {
//   if (e.key === "Enter" && e.target.value.trim() !== "") {
//     const input = e.target.value.trim(); // Get the latest input value

//     console.log("Message:", input); // Debugging (optional)

//     ws.send(
//       JSON.stringify({
//         receiver: "someUser", // Replace with actual receiver
//         content: input,
//       })
//     );

//     displayMessage({ receiver: "someUser", content: input });

//     e.target.value = ""; // Clear input field after sending
//   }
// });




document.addEventListener("click", (e) => {
  let onlineList = e.target.closest('.online-list')
  if (onlineList) {
    
    const username = onlineList.querySelector("p");
    oldMessages(username.textContent)
    sendMessage(username.textContent);
  }
});


function oldMessages(Username) {
  fetch(`/chathistory?receiver=${Username}`)
  .then(response => response.json())
  .then(messages => {
      console.log('Chat history:', messages,Username);
      let chatWindow = document.querySelector(".chat-window") 
      const messagesContainer = chatWindow.querySelector('#chat-messages');
      // console.log('Messages container:', messagesContainer);
      messages.forEach(msg => {
          // console.log('Adding message:', msg);
          const messageElement = document.createElement('div');
          messageElement.className = `message-bubble ${msg.sender === Username ? 'message-incoming' : 'message-outgoing'}`;
          messageElement.textContent = msg.message;
          messagesContainer.appendChild(messageElement);
      });
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  })
  .catch(error => console.error('Error fetching chat history:', error));
}

// Example usage
// document.getElementById("send-btn").addEventListener("click", () => {
//   const input = document.getElementById("chat-input");
//   sendMessage(input.value);
//   input.value = "";
// });
