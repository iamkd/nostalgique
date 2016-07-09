class PlayerCore {
  
  loadUrl(url) {
    this.audio = new Audio(url);
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

}

export default PlayerCore;