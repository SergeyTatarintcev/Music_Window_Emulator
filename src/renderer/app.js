window.api.onTrackUpdate((data) => {
  const trackName = document.querySelector('.track-name')
  const trackArtist = document.querySelector('.track-artist')

  if (data.track) {
    trackName.textContent = data.track
  }

  if (data.artist) {
    trackArtist.textContent = data.artist
  }
})