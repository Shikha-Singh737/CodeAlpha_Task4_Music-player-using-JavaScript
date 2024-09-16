let trackIndex = 0;
let isPlaying = false;
let updateTimer;

const currTrack = document.createElement('audio');

const trackList = [
    {
        name: "Track 1",
        artist: "Artist 1",
        path: "path/to/track1.mp3"
    },
    {
        name: "Track 2",
        artist: "Artist 2",
        path: "path/to/track2.mp3"
    }
];

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    currTrack.src = trackList[index].path;
    currTrack.load();

    document.querySelector('.track-name').textContent = trackList[index].name;
    document.querySelector('.track-artist').textContent = trackList[index].artist;
    document.querySelector('.now-playing').textContent = `PLAYING ${index + 1} OF ${trackList.length}`;

    updateTimer = setInterval(seekUpdate, 1000);
    currTrack.addEventListener('ended', nextTrack);
}

function resetValues() {
    document.querySelector('.current-time').textContent = "00:00";
    document.querySelector('.total-duration').textContent = "00:00";
    document.querySelector('.seek_slider').value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    currTrack.play();
    isPlaying = true;
    document.querySelector('.playpause-track').innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    currTrack.pause();
    isPlaying = false;
    document.querySelector('.playpause-track').innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (trackIndex < trackList.length - 1)
        trackIndex += 1;
    else trackIndex = 0;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    if (trackIndex > 0)
        trackIndex -= 1;
    else trackIndex = trackList.length - 1;
    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    let seekto = currTrack.duration * (document.querySelector('.seek_slider').value / 100);
    currTrack.currentTime = seekto;
}

function setVolume() {
    currTrack.volume = document.querySelector('.volume_slider').value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        document.querySelector('.seek_slider').value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        document.querySelector('.current-time').textContent = currentMinutes + ":" + currentSeconds;
        document.querySelector('.total-duration').textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(trackIndex);
