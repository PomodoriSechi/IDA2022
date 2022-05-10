let history;
let count = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    let url = "chrome_history.json";
    loadJSON(url, loaded);
    background(130);
    fill(0);
    textSize(30)
    textAlign(CENTER, CENTER);
    frameRate(1);
}
function loaded(data){
    history=data;
}
function draw() {

  background(255, 200);
    text(history[count].title, width / 2, height / 2);
    count++;
    if (count > Object.keys(history).length) {
        count = 0;
    }
}

function keyReleased() {
  if (key == 's' || key == 'S') {
      let d = new Date();
      let now = d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate() + "" + (d.getHours() + 1) + "-" + (d.getMinutes() + 1) + "" + (d.getSeconds() + 1) + "-" + frameCount;
      saveCanvas(now, 'png');
  }
}