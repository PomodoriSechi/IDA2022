let history;
let count = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    let url = "chrome_history.json";
    history = loadJSON(url);
    //Zugriff auf Eigenschaften
    console.log(history[0].title); //Gibt undefined aus, die Daten sind noch nicht geladen
}

function draw() {
  background(255, 50);
  strokeWeight(0);
  ellipse(mouseX, mouseY, 50, 50);
  // Grayscale integer value
  fill(255, 204, 0);

}
