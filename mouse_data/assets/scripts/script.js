let mouse = []
let max = 5000

document.onmousemove = function (e) {
    let pos_x = e.clientX
    let pos_y = e.clientY
    let object = {
        x: pos_x,
        y: pos_y
    }
    if (mouse.length > max) {
        // console.log('array is filled up')
        mouse.shift()
    }
    mouse.push(object)
}

let pointer = document.getElementById('pointer')
pointer.style.position = 'fixed'
console.log(pointer)

// Animate our collected data

let index = 0
window.requestAnimationFrame(animate)
function animate() {
    window.requestAnimationFrame(animate)
    //    console.log(mouse[index])
    //    console.log(index)
    if (mouse.length > 0) {

        pointer.style.left = mouse[index].x + 'px'
        pointer.style.top = mouse[index].y + 'px'
    }
    index++
    if (index >= mouse.length) {
        index = 0
    }
}

    // copied from https://github.com/digitalideation/IDA_2022/blob/main/woche3/Arrays-%26-JSON/mouse-follower/assets/js/script.js

    let save_button = document.querySelector('#save-button');

    save_button.addEventListener('click', () => {
        console.log('clicked');
        let data = JSON.stringify(mouse);
        let blob = new Blob([data], { type: 'application/json' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'mouse_movements' + Date.now().toString() + '.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    )

    // load JSON data
    let load_button = document.querySelector('#load-button');
    load_button.addEventListener('click', () => {
        console.log('clicked');
        let input = load_button.querySelector('input');
        let file = input.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            let data = JSON.parse(event.target.result);
            mouse_movements = data;
            console.log(mouse);
        }
        reader.readAsText(file);
    });