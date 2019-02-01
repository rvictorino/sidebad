const allowedDomains = [
  'scorbad.fr'
];

const container = document.getElementById('container');

let scoreBoard;

let save = localStorage.getItem('sidebad');
if(save) {
  const obj = JSON.parse(save);
  scoreBoard = new Scoreboard(container, obj.allowedDomains);
  for(let score of obj.scores) {
    scoreBoard.scores.push(new Score("Test", score.url));
  }
} else {
  scoreBoard = new Scoreboard(container, allowedDomains);
}
scoreBoard.show();



const addBtn = document.getElementById('add');
addBtn.addEventListener("click", () => {
  const urlTxt = document.getElementById('url');
  const url = urlTxt.value;

  const newScore = new Score("Test", url);

  scoreBoard.addIfNew(newScore);

  urlTxt.value = "";
});

const delBtn = document.getElementsByClassName('delete');
for(let i = 0; i < delBtn.length; i++) {
   let del = delBtn.item(i);
   del.addEventListener("click", () => {
     scoreBoard.deleteByUrl(del.getAttribute('data-delete'));
   });
}
