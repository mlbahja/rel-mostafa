const Toast = document.querySelector('.toast')
const loadMore = document.querySelector('main>button.load-more')


console.log(Toast);


const displayToast = (color, txt) => {
    Toast.textContent = txt
    Toast.style.top = "40px"
    Toast.style.background = color;
    Toast.style.animation = "bounce 0.5s ease-in-out"
    hideToast(1500)
}
///reset the delay
Toast.addEventListener('mouseenter', () => hideToast(10000))
Toast.addEventListener('mouseleave', () => hideToast(100))

let timer
const hideToast = (mill) => {
    //clear prev timeout if exists
    clearTimeout(timer)

    timer = setTimeout(() => {
        Toast.style.animation = "none"
        Toast.style.top = "-105px"
    }, mill);

}

console.log(loadMore);

loadMore.onclick = () => {
    cursor = formatDate(new Date(articles[articles.length - 1].createdat))
    fetchPosts("fromloadmore");
}

