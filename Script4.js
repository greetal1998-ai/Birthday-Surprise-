const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const music = document.getElementById("bgMusic");
const finalCat = document.getElementById("finalCat");
const newBeginning = document.getElementById("newBeginning");

const musicBtn = document.getElementById("musicBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let slideTimer;
let endingStarted = false;


/* =========================
   BUTTON EVENTS
========================= */

if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
}

if (prevBtn) {
    prevBtn.addEventListener("click", previousSlide);
}

if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
}


/* =========================
   SHOW SLIDE
========================= */

/**
 * @param {number} index
 */
function showSlide(index) {

    if (endingStarted) {
        return;
    }

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    currentSlide = index;


    /* Remove active from all slides */

    slides.forEach(function(slide) {

        slide.classList.remove("active");

        slide.style.opacity = "";
        slide.style.transition = "";

    });


    /* Remove active from all dots */

    dots.forEach(function(dot) {

        dot.classList.remove("active");

    });


    /* Show selected slide */

    slides[currentSlide].classList.add("active");


    /* Activate selected dot */

    if (dots[currentSlide]) {

        dots[currentSlide].classList.add("active");

    }


    /* Restart automatic timer */

    restartTimer();
}


/* =========================
   NEXT SLIDE
========================= */

function nextSlide() {

    /* Last photo → final sequence */

    if (currentSlide >= slides.length - 1) {

        startEnding();

        return;
    }


    /* Go to next photo */

    currentSlide++;

    showSlide(currentSlide);
}


/* =========================
   PREVIOUS SLIDE
========================= */

function previousSlide() {

    if (endingStarted) {
        return;
    }


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
   DOT NAVIGATION
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

            console.log(
                "Music playback was blocked."
            );

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

        console.log(
            "Autoplay blocked. Music will start after first touch."
        );

    });

}


/* =========================
   START MUSIC AFTER FIRST TOUCH
========================= */

document.addEventListener(
    "click",
    function firstTouch() {

        music.play().catch(function() {});

    },
    {
        once: true
    }
);


/* =========================
   START FINAL SEQUENCE
========================= */

function startEnding() {

    if (endingStarted) {
        return;
    }


    endingStarted = true;


    /* Stop slideshow timer */

    clearTimeout(slideTimer);


    /* Get dots container */

    const dotsContainer =
        document.querySelector(".dots");


    /* Hide previous button */

    if (prevBtn) {

        prevBtn.style.display = "none";

    }


    /* Hide next button */

    if (nextBtn) {

        nextBtn.style.display = "none";

    }


    /* Hide dots */

    if (dotsContainer) {

        dotsContainer.style.display = "none";

    }


    /* Hide music button */

    if (musicBtn) {

        musicBtn.style.display = "none";

    }


    /* Fade out last photo */

    const lastSlide =
        slides[slides.length - 1];


    lastSlide.style.transition =
        "opacity 1.5s ease";


    lastSlide.style.opacity = "0";


    /* Show cat after fade */

    setTimeout(function() {

        showFinalCat();

    }, 1500);

}


/* =========================
   SHOW FINAL CAT
========================= */

function showFinalCat() {

    finalCat.classList.remove("hide");

    finalCat.classList.add("show");


    /* Cat stays for 10 seconds */

    setTimeout(function() {

        hideFinalCat();

    }, 10000);

}


/* =========================
   HIDE FINAL CAT
========================= */

function hideFinalCat() {

    finalCat.classList.remove("show");

    finalCat.classList.add("hide");


    /* Show final screen after fade */

    setTimeout(function() {

        showNewBeginning();

    }, 1500);

}


/* =========================
   SHOW FINAL SCREEN
========================= */

function showNewBeginning() {

    if (!newBeginning) {
        return;
    }


    newBeginning.style.display = "flex";


    /* Final screen stays for 15 seconds */

    setTimeout(function() {

        stopMusic();

    }, 15000);

}


/* =========================
   STOP MUSIC
========================= */

function stopMusic() {

    music.pause();

    music.currentTime = 0;

}


/* =========================
   START
========================= */

startMusic();

showSlide(0);
