class Score {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.iFrame = document.createElement('iframe');
    this.iFrame.setAttribute('src', this.url);
  }

  getIFrame() {
    return this.iFrame;
  }
}
