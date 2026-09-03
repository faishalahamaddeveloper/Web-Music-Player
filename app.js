const songs = [
    {
        title: "My Song 1",
        artist: "Rahat fateh ali khan 1",
        duration: "7:33",
        src:"ik-khawab-sunawan.mp3"
    },
    {
        title: "My Song 2",
        artist: " Owais Raza Qadri",
        duration: "15:38",
        src: "NAAT-SHAREEF---Al-Nabi-Sallu-Aleh.mp3"
    },
    {
        title: "My Song 3",
        artist: "Muhammad Owais  ",
        duration: "8:03",
        src: "NAAT-SHAREEF---Dil-Me-Ishq-e-Nabi-Ki.mp3"
    },
    // {
    //     title: "My Song 4",
    //     artist: "Artist 4",
    //     duration: "4:30",
    //     src: "",
    // }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let currentSong = 0;

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining =
        Math.floor(seconds % 60);
    return `${minutes}:${secondsRemaining
        .toString()
        .padStart(2, "0")}`;
}


// Create playlist
function renderPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const songElement =
            document.createElement("div");
        songElement.classList.add("song");
        if (index === currentSong) {
            songElement.classList.add("active");
        }
        songElement.innerHTML = `
            <div class="song-info">
                <span class="song-title">
                    ${song.title}
                </span>
                <span class="song-artist">
                    ${song.artist}
                </span>
            </div>
            <span class="duration">
                ${song.duration}
            </span>
        `;
        songElement.addEventListener(
            "click",
            () => {
                currentSong = index;
                loadSong();
                playSong();
            }
        );
        playlist.appendChild(songElement);
    });
}

// Load song
function loadSong() {
    const song = songs[currentSong];
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = song.duration;
    renderPlaylist();
}

// Play
function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

// Pause
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Previous
prevBtn.addEventListener("click", () => {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong();
    playSong();
});

// Next
nextBtn.addEventListener("click", () => {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong();
    playSong();
});

// Update progress
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) {
        return;
    }
    const percentage =
        (audio.currentTime / audio.duration) * 100;
    progress.value = percentage;
    currentTime.textContent =
        formatTime(audio.currentTime);
    duration.textContent =
        formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    if (!audio.duration) {
        return;
    }
    audio.currentTime =
        (progress.value / 100) *
        audio.duration;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Automatically play next song
audio.addEventListener("ended", () => {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong();
    playSong();
});

// Update button when audio plays
audio.addEventListener("play", () => {
    playBtn.textContent = "⏸";
});

// Update button when audio pauses
audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
});

// Initial setup
audio.volume = 1;
loadSong();
