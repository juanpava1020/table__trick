window.document.addEventListener("scroll", () => {
    const navBar = document.querySelector(".nav");
    let viewHeight = window.innerHeight;
    if(window.scrollY > viewHeight){
        navBar.classList.add('scrolled')
    }else {
        navBar.classList.remove('scrolled')
    }
})


