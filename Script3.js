const opening = document.getElementById("opening");
const letterCard = document.getElementById("letterCard");
const letterContent = document.querySelector(".letter-content");
const nextBtn = document.querySelector(".next-btn");


setTimeout(() => {

    opening.classList.add("hide");

}, 3000);


setTimeout(() => {

    letterCard.classList.add("show");

}, 3800);


letterContent.addEventListener("scroll", () => {

    const currentPosition =
        letterContent.scrollTop +
        letterContent.clientHeight;

    const totalHeight =
        letterContent.scrollHeight;

    if(currentPosition >= totalHeight - 10){

        nextBtn.classList.add("show");

    }

});


function goToPage4(){

    window.location.href = "Part4.html";

}