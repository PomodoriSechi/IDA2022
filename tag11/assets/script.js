function change() {
    let snow = document.getElementsByClassName("snowflake");
    snow.style.left = Math.random() * window.innerWidth + "px";
}

function newElement() {
    let div = document.createElement("div");
    div.classList.add('snowflake');
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(div);
    n++; /* ist dasselbe wie n=n+1*/
    console.log('pressed:' + n)
    document.getElementById("counter").innerHTML = n
}
let n = 0; /*schlüsselwort let und variablenname. zuweisung des werts von rechts nach links */
function buttonPressed() {
    n++; /* ist dasselbe wie n=n+1*/
    console.log('pressed:' + n)
}

