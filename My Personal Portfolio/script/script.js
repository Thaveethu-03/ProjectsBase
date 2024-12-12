const carousel=document.querySelector(".carousel");
const arrowBtns=document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
arrowBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        carousel.scrollLeft += btn.id ==="left" ? -firstCardWidth-20 : firstCardWidth+20;
    })
});


let menu=document.querySelector("#menubar");
let nav_links=document.querySelector(".nav_links");

menu.onclick =()=>{
    menu.classList.toggle('fa-xmark');
    nav_links.classList.toggle('open');
}