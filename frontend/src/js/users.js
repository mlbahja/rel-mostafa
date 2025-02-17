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
        img.src = user.profile_pic || 'static/src/Unknown_person.jpg';;
        img.alt = 'profile';
        imgDiv.appendChild(img);

        const p = document.createElement('p');
        p.textContent = user.Username;

        userDiv.appendChild(imgDiv);
        userDiv.appendChild(p);
        container.appendChild(userDiv);
    });
})
.catch(error => console.error('Error fetching users:', error));
