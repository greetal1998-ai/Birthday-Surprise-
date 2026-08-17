
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const music = document.getElementById("bgMusic");
const finalCat = document.getElementById("finalCat");
const newBeginning = document.getElementById("newBeginning");

let currentSlide = 0;
let slideTimer;


/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    currentSlide = index;

    slides.forEach(slide => {
        slide.classList.remove("active");
        slide.style.opacity = "";
        slide.style.transition = "";
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

    restartTimer();
}


/* =========================
   NEXT SLIDE
========================= */

function nextSlide() {

    /* =========================
       LAST PHOTO → CAT
    ========================= */

    if (currentSlide >= slides.length - 1) {

        clearTimeout(slideTimer);

        /* Hide slideshow controls */

        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");
        const dotsContainer = document.querySelector(".dots");
        const musicBtn = document.querySelector(".music-btn");

        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        if (dotsContainer) dotsContainer.style.display = "none";
        if (musicBtn) musicBtn.style.display = "none";


        /* Fade out last photo */

        slides[currentSlide].style.transition =
            "opacity 1.5s ease";

        slides[currentSlide].style.opacity = "0";


        /* =========================
           SHOW CAT
        ========================= */

        setTimeout(function() {

            finalCat.classList.remove("hide");
            finalCat.classList.add("show");


            /* =========================
               CAT STAYS FOR 10 SECONDS
            ========================= */

            setTimeout(function() {

                /* Fade cat out */

                finalCat.classList.remove("show");
                finalCat.classList.add("hide");


                /* =========================
                   SHOW 00:00 SCREEN
                ========================= */

                setTimeout(function() {

                    showNewBeginning();


                    /* =========================
                       FINAL SCREEN 5 SECONDS
                    ========================= */

                    setTimeout(function() {

    /* Keep the final screen visible
       and let the music continue
       for 5 more seconds */

    setTimeout(function() {

        music.pause();
        music.currentTime = 0;

    }, 10000);

}, 5000);

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
   PREVIOUS SLIDE
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

    slideTimer = setTimeout(function() {

        nextSlide();

    }, 6000);
}


/* =========================
   DOTS
========================= */

dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showSlide(index);

    });

});


/* =========================
   MUSIC BUTTON
========================= */

function toggleMusic() {

    if (music.paused) {

        music.play().catch(function() {
            console.log("Music playback was blocked.");
        });

    } else {

        music.pause();

    }

}


/* =========================
   START MUSIC
========================= */

function startMusic() {

    music.volume = 0.7;

    music.play().catch(function() {

        console.log("Autoplay blocked. Music will start after first touch.");

    });

}


/* =========================
   START MUSIC AFTER FIRST TOUCH
========================= */

document.addEventListener("click", function firstTouch() {

    music.play().catch(function() {});

}, { once: true });


/* =========================
   SHOW NEW BEGINNING
========================= */

function showNewBeginning() {

    if (newBeginning) {

        newBeginning.style.display = "flex";

    }

}


/* =========================
   START
========================= */

startMusic();

showSlide(0);
