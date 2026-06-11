function searchSubjects() {

    let input = document.querySelector(".search").value.toLowerCase();

    let cards = document.querySelectorAll(".subject-card");

    cards.forEach(function(card){

        let title = card.querySelector("h2").textContent.toLowerCase();

        if(title.includes(input)){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }

    });

}
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach((item)=>{

        const windowHeight = window.innerHeight;

        const revealTop = item.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
function darkMode() {
    document.body.classList.toggle("dark");
}