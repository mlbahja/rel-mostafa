// export default function getUsers() {
//     fetch('/users')
//         .then( response => response.json())
//         .then(users => {
//             const container = document.getElementById('online-list-container');
//             users.forEach(user => {
//                 console.log(user);

//                 const userDiv = document.createElement('div');
//                 userDiv.className = 'online-list';

//                 const imgDiv = document.createElement('div');
//                 imgDiv.className = 'online';
//                 const img = document.createElement('img');
//                 img.src = user.profile_pic || 'static/src/Unknown_person.jpg'; // Fallback image if profile_pic is not provided
//                 img.alt = 'profile';
//                 imgDiv.appendChild(img);

//                 const p = document.createElement('p');
//                 p.textContent = user.Username; // Use the username field from the backend

//                 userDiv.appendChild(imgDiv);
//                 userDiv.appendChild(p);
//                 container.appendChild(userDiv);
//             });
//         })
//         .catch(error => console.error('Error fetching users:', error));
// }


// export default function getUsers() {
//     fetch('/users')
//         .then( response => response.json())
//         .then(users => {
//             const container = document.getElementById('online-list-container');
//             users.forEach(user => {
//                 console.log(user);

//                 const userDiv = document.createElement('div');
//                 userDiv.className = 'online-list';

//                 const imgDiv = document.createElement('div');
//                 imgDiv.className = 'online';
//                 const img = document.createElement('img');
//                 img.src = user.profile_pic || 'static/src/Unknown_person.jpg'; // Fallback image if profile_pic is not provided
//                 img.alt = 'profile';
//                 imgDiv.appendChild(img);

//                 const p = document.createElement('p');
//                 p.textContent = user.Username; // Use the username field from the backend

//                 userDiv.appendChild(imgDiv);
//                 userDiv.appendChild(p);
//                 container.appendChild(userDiv);
//             });
//         })
//         .catch(error => console.error('Error fetching users:', error));
// }
const styles =
    `<style>
.online-list-container {
    padding: 20px 0;
}

.online-list {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.online-list:hover {
    background-color: #f5f5f5;
}

.online-list .online {
    position: relative;
    margin-right: 12px;
}

.online-list .online img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.online-list p {
    font-size: 14px;
    color: #1d1d1d;
    margin: 0;
}

/* Status indicator */
.status-indicator {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid white;
}

.status-online {
    background-color: #44b700;
}

.status-offline {
    background-color: #ff9800;
}

/* Section headers */
.section-header {
    padding: 0 20px;
    margin: 20px 0 10px;
    font-size: 13px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Chat window styles */
.chat-container {
    position: fixed;
    bottom: 0;
    right: 20px;
    display: flex;
    gap: 20px;
    z-index: 1000;
}

.chat-window {
    width: 320px;
    background: white;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    overflow: hidden;
}

.chat-header {
    padding: 16px;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat-user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.chat-user-info img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.chat-user-info span {
    font-weight: 500;
    color: #1d1d1d;
}

#chat-messages {
    height: 320px;
    padding: 16px;
    overflow-y: auto;
    background: #f8f9fa;
}

.message-bubble {
    max-width: 80%;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.4;
}

.message-outgoing {
    background: #0084ff;
    color: white;
    margin-left: auto;
    border-radius: 16px 16px 4px 16px;
}

.message-incoming {
    background: #e4e6eb;
    color: #1d1d1d;
    border-radius: 16px 16px 16px 4px;
}

.chat-input {
    padding: 16px;
    background: white;
    border-top: 1px solid #eee;
}

.chat-input input {
    width: 100%;
    padding: 12px;
    border: 1px solid #e4e6eb;
    border-radius: 24px;
    outline: none;
    font-size: 14px;
}

.chat-input input:focus {
    border-color: #0084ff;
}

.close-button {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px;
    font-size: 20px;
}

.close-button:hover {
    color: #1d1d1d;
}

/* Groups section */
.groups-section {
    margin-top: 24px;
}

.group-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;
}

.group-item:hover {
    background-color: #f5f5f5;
}

.group-avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
}

.timestamp {
    font-size: 12px;
    color: #666;
    margin-left: auto;
}
</style>`
    ;

// Modified users.js code
document.head.insertAdjacentHTML('beforeend', styles);

const openChats = new Set();

fetch('/users')
    .then(response => response.json())
    .then(users => {
        const container = document.getElementById('online-list-container');

        // Add Contacts header
        const contactsHeader = document.createElement('div');
        contactsHeader.className = 'section-header';
        contactsHeader.textContent = 'Contacts';
        container.appendChild(contactsHeader);

        // Add users
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'online-list';

            const onlineDiv = document.createElement('div');
            onlineDiv.className = 'online';

            const img = document.createElement('img');
            img.src = user.profile_pic || 'static/src/Unknown_person.jpg';
            img.alt = 'profile';

            const statusDot = document.createElement('div');
            statusDot.className = 'status-indicator status-online';

            onlineDiv.appendChild(img);
            onlineDiv.appendChild(statusDot);

            const username = document.createElement('p');
            username.textContent = user.Username;
            // sendMessage(username)
            userDiv.appendChild(onlineDiv);
            userDiv.appendChild(username);

            // Add click handler
            userDiv.addEventListener('click', () => {
                if (!openChats.has(user.id)) {
                    createChatWindow(user);
                    openChats.add(user.id);
                }
            });
            container.appendChild(userDiv);
        });


    })
    .catch(error => console.error('Error fetching users:', error));

function createChatWindow(user) {
    const chatContainer = document.querySelector('.chat-container') || createChatContainer();

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';

    chatWindow.innerHTML =
        ` <div class="chat-header">
            <div class="chat-user-info">
                <img src="${user.profile_pic || 'static/src/Unknown_person.jpg'}" alt="profile">
                <span>${user.Username}</span>
            </div>
            <button class="close-button">×</button>
        </div>
        <div id="chat-messages">
            <!-- Sample message -->
            
        </div>
        <div class="chat-input">
            <input id="chat-input" type="text" placeholder="Start typing...">
        </div>`
        ;

    const closeButton = chatWindow.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        chatWindow.remove();
        openChats.delete(user.id);
    });

    const input = chatWindow.querySelector('input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            const messagesContainer = chatWindow.querySelector('#chat-messages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message-bubble message-outgoing';
            messageElement.textContent = input.value;
            messagesContainer.appendChild(messageElement);
            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Send message via WebSocket
            
        }
    });

    chatContainer.appendChild(chatWindow);
}

function createChatContainer() {
    const container = document.createElement('div');
    container.className = 'chat-container';
    document.body.appendChild(container);
    return container;
}