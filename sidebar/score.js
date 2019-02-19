class Score {
  constructor(name, url) {
    this.name = name;
    this.url = new URL(url);
    this.iFrame = document.createElement('iframe');
    this.iFrame.setAttribute('src', this.url.href);
    this.iFrame.height = ALLOWED_DOMAINS[this.url.hostname];
    this.iFrame.onload = () => console.log(`${this.iFrame.contentWindow} loaded`);
  }

  getIFrame() {
    return this.iFrame;
  }
}
