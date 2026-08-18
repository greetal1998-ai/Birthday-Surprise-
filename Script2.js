window.onload = function () {

    setTimeout(function () {

        document.getElementById("poster").classList.add("show");

    }, 500);

};

function toggleMusic() {

    const song = document.getElementById("birthdaySong");

    const button = document.getElementById("musicBtn");

    const text = document.getElementById("musicText");


    if (song.paused) {

        song.volume = 0.7;

        song.play();

        button.innerHTML = "🎶";

        text.innerHTML = "Playing";

    } else {

        song.pause();

        button.innerHTML = "🎵";

        text.innerHTML = "Play";

    }

}

function goToNextPage() {

    window.location.href = "Part 3.html";

}
