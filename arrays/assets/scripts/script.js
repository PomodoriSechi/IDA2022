console.log('hello World')
let number = 9
let string = 'string'

console.log(number.toString())
console.log(number)

// arrays

let array = [3, 5, 7, 89, 10]
// console.log(array)
// array.push(1)
// array.push(2)
// array.push(3)
// console.log(array[2])

// for (
//     let i = 0; // Ausgangslage
//     i < 5; // Bedingung
//     i += 1 // Loop zähkt 1 dazu
//     ){
//         console.log('for loop in position: ') // Funktion
//         console.log(i)
//         console.log('show array in posittion')
//         console.log(array[i])
//     }

for (let i = 0; i < array.length; i += 2) {
    console.log('showing array in position: ' + i)
    console.log(array[i])
}

// how to fill an array with random items

let emptyArray = []
let numberOfItems = 50

for (let i = 0; i < numberOfItems; i++){
   let randomValue = Math.random() * 1000
    emptyArray.push(randomValue)
}
console.log(emptyArray)


// Lets see what are onbjects

let object = {
    x: 100,
    y: 200,
    width: 100,
    height: 150
}

let div = document.createElement('div')
div.style.position = 'fixed'
div.style.width = object.width + 'px'
div.style.height = object.height + 'px'
div.style.top = object.y + 'px'
div.style.left = object.x + 'px'
div.style.backgroundColor = 'white'

document.body.appendChild(div)

console.log(object)

function move() {
    div.style.left = object.x + 5 + 'px'
}
function turn() {
    div.rotate(90)
}

