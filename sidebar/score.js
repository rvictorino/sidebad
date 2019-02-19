import CONSTANTS from './constants.js';

export default class Score {
  constructor(name, url) {
    this.name = name;
    this.url = new URL(url);
    this.iFrame = document.createElement('iframe');
    this.iFrame.setAttribute('src', this.url.href);
    this.iFrame.height = CONSTANTS.ALLOWED_DOMAINS[this.url.hostname];
  }

  getIFrame() {
    return this.iFrame;
  }
}
