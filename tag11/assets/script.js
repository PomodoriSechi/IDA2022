

function newElement() {
    let snow = document.createElement("div");
    snow.classList.add('snowflake');
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(snow);
    n++; /* ist dasselbe wie n=n+1*/
    console.log('pressed:' + n)
    document.getElementById("counter").innerHTML = n
}

function change() {
    let snow = document.getElementsByClassName("snowflake");
    div.style.left = 5 + "px";
}

let n = 0; /*schlüsselwort let und variablenname. zuweisung des werts von rechts nach links */
function buttonPressed() {
    n++; /* ist dasselbe wie n=n+1*/
    console.log('pressed:' + n)
}

