const opening = document.getElementById("opening");
const letterCard = document.getElementById("letterCard");
const letterContent = document.querySelector(".letter-content");
const nextBtn = document.getElementById("nextBtn");


/* =========================
   OPENING MESSAGE
========================= */

setTimeout(() => {

    opening.classList.add("hide");

}, 3000);


/* =========================
   SHOW LETTER
========================= */

setTimeout(() => {

    letterCard.classList.add("show");

}, 3800);


/* =========================
   SHOW NEXT BUTTON
   ONLY AT BOTTOM
========================= */

letterContent.addEventListener("scroll", () => {

    const currentPosition =
        letterContent.scrollTop +
        letterContent.clientHeight;

    const totalHeight =
        letterContent.scrollHeight;


    if (currentPosition >= totalHeight - 10) {

        nextBtn.classList.add("show");

    }

});


/* =========================
   GO TO PAGE 4
========================= */

nextBtn.addEventListener("click", () => {

    window.location.href = "./Part4.html";

});
