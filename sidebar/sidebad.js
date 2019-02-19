

const container = document.getElementById('container');

let scoreBoard = new Scoreboard(container);

let save = localStorage.getItem('sidebad');
if(save) {
  const obj = JSON.parse(save);
  for(let score of obj.scores) {
    scoreBoard.scores.push(new Score('', score.url));
  }
}

scoreBoard.show();



const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => {
  const urlTxt = document.getElementById('url');
  const url = urlTxt.value;

  const newScore = new Score('', url);

  scoreBoard.addIfNew(newScore);

  urlTxt.value = '';
});

const delBtns = document.getElementsByClassName('delete');
for(let i = 0; i < delBtns.length; i++) {
   let del = delBtns.item(i);
   del.addEventListener('click', () => {
     scoreBoard.deleteByUrl(del.getAttribute('data-delete'));
   });
}

const delAllBtn = document.getElementById('delete-all');
delAllBtn.addEventListener('click', () => {
  scoreBoard.deleteAll();
});
