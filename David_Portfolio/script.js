
document.querySelector(".contact_form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
    });

    document.querySelectorAll(".input-field").forEach((input) => {
        input.value = "";
    });

    document.querySelectorAll(".input-field .message").forEach((textarea) => {
        textarea.value = "";
    });
});

// Active Link

const navLink = document.querySelectorAll('.nav_link')
navLink.forEach(n => n.classList.remove('active'))


function linkAction(){

         navLink.forEach(n => n.classList.remove('active'))
         this.classList.add('active')

         const navMenu = document.getElementById('nav_menu')
         navMenu.classList.remove('show')

}

navLink.forEach(n => n.addEventListener('click',linkAction));

// scroll

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.style.backgroundColor = "#F9FAFF";
    } else {
        header.style.backgroundColor = "transparent";
    }
});

