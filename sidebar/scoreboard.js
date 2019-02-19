const ALLOWED_DOMAINS = {
  'scorbad.fr': null,
  'bwf.tournamentsoftware.com': 580,
};

class Scoreboard {
  constructor(parent) {
    this.parent = parent;
    this.scores = [];
  }

  addIfNew(score) {
    if(this.isValid(score) && !this.contains(score)) {
      this.scores.push(score);
      this.save();
      this.showItem(score);
    }
  }

  deleteByUrl(url) {
    for(let i = 0; i < this.scores.length; i++) {
      let score = this.scores[i];
      if(score.url.href == url) {
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
    for(let currentScore of this.scores) {
      if(currentScore.url.href == score.url.href) {
        return true;
      }
    }
    return false;
  }

  isValid(score) {
    return score.url && ALLOWED_DOMAINS.hasOwnProperty(score.url.hostname);
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
    for(let score of this.scores) {
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
