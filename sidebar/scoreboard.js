import CONSTANTS from './constants.js';

export default class Scoreboard {
  constructor(parent) {
    this.parent = parent;
    this.scores = [];
  }

  addIfNew(score) {
    if (Scoreboard.isValid(score) && !this.contains(score)) {
      this.scores.push(score);
      this.save();
      this.showItem(score);
    }
  }

  deleteByUrl(url) {
    for (let i = 0; i < this.scores.length; i += 1) {
      const score = this.scores[i];
      if (score.url.href === url) {
        this.scores.splice(i, 1);
        break;
      }
    }
    this.save();
    this.show();
  }

  deleteAll() {
    this.scores = [];
    this.save();
    this.show();
  }

  contains(score) {
    for (let i = 0; i < this.scores.length; i += 1) {
      const currentScore = this.scores[i];
      if (currentScore.url.href === score.url.href) {
        return true;
      }
    }
    return false;
  }

  static isValid(score) {
    return score.url
      && Object.prototype.hasOwnProperty.call(CONSTANTS.ALLOWED_DOMAINS, score.url.hostname);
  }

  save() {
    localStorage.setItem('sidebad', JSON.stringify(this));
  }

  show() {
    // empty it if needed
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
    // fill with scores
    for (let i = 0; i < this.scores.length; i += 1) {
      const score = this.scores[i];
      this.showItem(score);
    }
  }

  showItem(score) {
    const ifWrapper = document.createElement('div');
    ifWrapper.setAttribute('class', 'score');

    const overlay = document.createElement('div');
    overlay.setAttribute('class', 'overlay');

    const delBtn = document.createElement('button');
    delBtn.setAttribute('class', 'delete');
    delBtn.setAttribute('data-delete', score.url.href);

    const delText = document.createTextNode('-');
    delBtn.appendChild(delText);

    overlay.appendChild(delBtn);
    ifWrapper.appendChild(overlay);
    ifWrapper.appendChild(score.getIFrame());
    this.parent.appendChild(ifWrapper);
  }
}
