import Article from '../../public/components/articleCmp.js'

const createPostForm = document.querySelector('#createPostForm')
const postTitle = createPostForm.querySelector('input[type=text]')
const postContent = createPostForm.querySelector('textarea')
const postsContainer = document.querySelector('main .post-list')

createPostForm.onsubmit = (e) => {
    e.preventDefault()

    const title = postTitle.value.trim()
    const content = postContent.value.trim()
    const categories = Array.from(document.querySelectorAll('input[type=checkbox]:checked'), elem => elem.value)


    if (!title || !content || !categories.length) {
        displayToast('var(--red)', 'all fields are required!')
        return
    }
    if (title.length > 300 || content.length > 4000) {
        displayToast('var(--red)', 'You have exceeded the maximum character limit!!')
        return
    }

    fetch('/post', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            content,
            categories,
        })
    })
        .then(res => {

            if (!res.ok) {

                throw error
            }
            // console.log(res.json());
            return res.json()
        }
        )
        .then(data => {
            console.log("data : ", data);
            checkIfLoggedout(data.Message)


            displayToast('var(--info)', 'post created successfully!!!')
            // popupOverlay.classList.add("hidden")
          //  mainContent.innerHTML = ''
              createPostForm.reset() 
              console.log(data);
                     
            let a = Article(data)
            let p = document.createElement("div")
            p.innerHTML = a
            postsContainer.prepend(p)
        })
        .catch(() => displayToast('var(--red)', "creating post Error"));
}