let images = document.querySelectorAll("img")
console.log(images.length)

for (let i = 0; i < images.length; i++ ){
    images[i].addEventlistener('mouseover', resize)
}

function resize(event) {
}