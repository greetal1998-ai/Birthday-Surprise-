const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const music = document.getElementById("bgMusic");
const finalCat = document.getElementById("finalCat");

let currentSlide = 0;
let slideTimer;


/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    if (index < 0) {
        index = slides.length - 1;
    }

    currentSlide = index;

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    restartTimer();
}


/* =========================
   NEXT
========================= */

function nextSlide() {

    /* =========================
       LAST PHOTO → FINAL CAT
    ========================= */

    if (currentSlide >= slides.length - 1) {

        clearTimeout(slideTimer);

        /* Hide slideshow controls */

        document.querySelector(".prev-btn").style.display = "none";
        document.querySelector(".next-btn").style.display = "none";
        document.querySelector(".dots").style.display = "none";
        document.querySelector(".music-btn").style.display = "none";


        /* Fade out last photo */

        slides[currentSlide].style.transition =
            "opacity 1.5s ease";

        slides[currentSlide].style.opacity = "0";


        /* Show cat after photo fades */

        setTimeout(function() {

            finalCat.classList.add("show");


            /* Stay for 10 seconds */

            setTimeout(function() {

                /* Fade cat out */

                finalCat.classList.remove("show");
                finalCat.classList.add("hide");


                /* Stop music only at the very end */

                setTimeout(function() {

                    music.pause();
                    music.currentTime = 0;

                    /* Close the page */

                    window.close();

                }, 1500);

            }, 10000);


        }, 1500);

        return;
    }


    /* =========================
       NEXT PHOTO
    ========================= */

    currentSlide++;

    showSlide(currentSlide);
}


/* =========================
   PREVIOUS
========================= */

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}


/* =========================
   AUTOMATIC SLIDESHOW
========================= */

function restartTimer() {

    clearTimeout(slideTimer);

    slideTimer = setTimeout(() => {

        nextSlide();

    }, 6000);
}


/* =========================
   DOTS
========================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});


/* =========================
   MUSIC BUTTON
========================= */

function toggleMusic() {

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }

}


/* =========================
   START MUSIC
========================= */

function startMusic() {

    music.volume = 0.7;

    music.play().catch(() => {

        // Browser blocked autoplay

    });

}


/* =========================
   START MUSIC AFTER FIRST TOUCH
========================= */

document.addEventListener("click", function firstTouch() {

    music.play().catch(() => {});

    document.removeEventListener(
        "click",
        firstTouch
    );

}, { once: true });


/* =========================
   START MUSIC
========================= */

startMusic();


/* =========================
   START SLIDESHOW
========================= */

showSlide(0);