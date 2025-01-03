const folderPicker = document.getElementById("folder-picker");
const allSongsList = document.getElementById("all-songs");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

let songs = [];
let currentSongIndex = 0;

// Load a Song
function loadSong(song) {
  songTitle.innerText = song.title || "Unknown Title";
  artistName.innerText = song.artist || "Unknown Artist";
  audio.src = song.url;
}

// Play or Pause Song
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸️";
  } else {
    audio.pause();
    playBtn.innerText = "▶️";
  }
}

// Change Song
function changeSong(next = true) {
  currentSongIndex = next
    ? (currentSongIndex + 1) % songs.length
    : (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
}

// Update UI with the song list
function updateUI() {
  allSongsList.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerText = song.title;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(song);
      audio.play();
    });
    allSongsList.appendChild(li);
  });
}

// Handle Folder Picker
folderPicker.addEventListener("change", (event) => {
  const files = event.target.files;
  songs = [];

  for (let file of files) {
    if (file.type.startsWith("audio")) {
      const song = {
        title: file.name,
        artist: "Unknown Artist",
        url: URL.createObjectURL(file),
      };
      songs.push(song);
    }
  }

  updateUI();
});

// Controls
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeSong(false));
nextBtn.addEventListener("click", () => changeSong(true));
