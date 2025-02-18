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

// fetch('/users')
// .then(response => response.json())
// .then(users => {
//     const container = document.getElementById('online-list-container');
//     users.forEach(user => {
//         const userDiv = document.createElement('div');
//         userDiv.className = 'online-list';

//         const imgDiv = document.createElement('div');
//         imgDiv.className = 'online';
//         const img = document.createElement('img');
//         img.src = user.profile_pic || 'static/src/Unknown_person.jpg';;
//         img.alt = 'profile';
//         imgDiv.appendChild(img);

//         const p = document.createElement('p');
//         // const link = document. 
//         // console.log(p);
        
//         p.textContent = user.Username;

//         userDiv.appendChild(imgDiv);
//         userDiv.appendChild(p);
//         container.appendChild(userDiv);
//     });
// })
// .catch(error => console.error('Error fetching users:', error));

fetch('/users')
    .then(response => response.json())
    .then(users => {
        const container = document.getElementById('online-list-container');

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'online-list';

            const imgDiv = document.createElement('div');
            imgDiv.className = 'online';
            const img = document.createElement('img');
            img.src = user.profile_pic || 'static/src/Unknown_person.jpg';
            img.alt = 'profile';
            imgDiv.appendChild(img);

            const p = document.createElement('p');
            p.textContent = user.Username;

            userDiv.appendChild(imgDiv);
            userDiv.appendChild(p);
            container.appendChild(userDiv);

            // Add click event to show the chat popup
            p.addEventListener("click", () => {
                showChatPopup(user.Username);
            });
        });
    })
    .catch(error => console.error('Error fetching users:', error));

// // Function to show chat popup
// function showChatPopup(username) {
//     let chatPopup = document.getElementById("chatPopup");

//     // If chatPopup doesn't exist, create it
//     if (!chatPopup) {
//         chatPopup = document.createElement("div");
//         chatPopup.id = "chatPopup";
//         chatPopup.innerHTML = `
//             <div id="chatHeader">
//                 Chat with <span id="chatUser"></span> <span id="closeChat">X</span>
//             </div>
//             <div id="chatMessages">
//                 <p><strong>User1:</strong> Hello!</p>
//                 <p><strong>User2:</strong> Hi there!</p>
//             </div>
//             <input type="text" id="chatInput" placeholder="Type a message...">
//         `;
//         document.body.appendChild(chatPopup);

//         // Add close functionality
//         document.getElementById("closeChat").addEventListener("click", () => {
//             chatPopup.style.display = "none";
//         });
//     }

//     // Update chat popup content
//     document.getElementById("chatUser").textContent = username;
//     chatPopup.style.display = "block";
// }

