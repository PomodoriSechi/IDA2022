 let n = 0; /*schlüsselwort let und variablenname. zuweisung des werts von rechts nach links */
 function buttonRight() {
     n++; /* ist dasselbe wie n=n+1*/
     console.log('pressed:' + n)
     document.getElementById("element").style.left = n + "5px";

}
 function buttonLeft() {
     n++; /* ist dasselbe wie n=n+1*/
     console.log('pressed:' + n)
     document.getElementById("element").style.left = n + "-" +"5px";

}
 function buttonUp() {
     n++; /* ist dasselbe wie n=n+1*/
     console.log('pressed:' + n)
     document.getElementById("element").style.top =  n + "-" +"5px";

}
 function buttonDown() {
     n++; /* ist dasselbe wie n=n+1*/
     console.log('pressed:' + n)
     document.getElementById("element").style.top = n + "5px";

}

function neuesElement() {
    let button = document.createElement("button");
    button.classList.add('specialbutton');
    button.style.left = Math.random() * window.innerWidth + "px";
    button.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(button);
}
