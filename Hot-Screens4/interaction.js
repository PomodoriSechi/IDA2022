// // let images = document.querySelectorAll("img")

// // function resize(event) {
// //     console.log(event.target)

// // }
// // for (let i = 0; i < images.length; i++ ){
// //     images[i].addEventlistener('click', resize)
// //     console.log(images)
// // }

// function showAbout() {
//      if
//  }


// let images = document.querySelectorAll('.condensedimage');
// for (let img of images) {
//     img.addEventListener('mouseover', resize); //event hover
//     img.addEventListener('mouseout', resizeBack); //event leave hover
// }
// let container = document.querySelector('.container')
// let w = container.getBoundingClientRect().width
// console.log(w)
// function resize(event) {
//     console.log(w)
//     let available_space = w - 420
//     let img_w = available_space / 139
//     console.log(img_w)
//     let container = event.target.parentElement.querySelectorAll('.condensedimage'); //die Aktion soll nur im eigenen Container stattfinden
//     let i = 0
//     for (let img of container) {
//         img.style.width = img_w + 'px'
//         i++
//         // img.classList.add('hoversibling'); //über die Klasse hoversibling werden die Geschwister Elemente verkleiner
//     }
//     console.log(i)
//     event.target.style.width = '420px'
//     // event.target.classList.remove('hoversibling'); //das Element auf dem der hover liegt, soll keine Klasse hoversibling haben
// }
// function resizeBack(event) {
//     // let container = event.target.parentElement.querysSelectorAll('.condensedimage');
//     // for (let img of container) {
//     //     img.classList.remove('hoversibling');
//     // }
//     let container = event.target.parentElement.querySelectorAll('.condensedimage'); //die Aktion soll nur im eigenen Container stattfinden
//     for (let img of container) {
//         img.style.width = 'calc((100vw - 160px) / 139)'
//         // img.classList.add('hoversibling'); //über die Klasse hoversibling werden die Geschwister Elemente verkleiner
//     }
// }