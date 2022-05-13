function request_cat_facts() {
    let base_url = 'https://cat-fact.herokuapp.com'

    let query = '/facts'

    fetch(base_url + query)
        //first request to remote server
        .then(
            function (response) {
                // how do we format the pakets? 
                return response.json()
            }
        )
        .then(function (data) {
            build_facts(data)
        })
        .catch(function (error) {
            console.log(error)
        })
}
function build_facts(data) {
    // let javascript mess with your html class 
    let cat_facts_div = document.querySelector('.cats-facts')
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        let data_point = data[i]
        // console.log(data_point) 
        // display only the text 
        console.log(data_point['text'])
        // build a virtual div in javascript 
        let cat_fact = document.createElement('div')
        // text to it 
        cat_fact.textContent = data_point['text']
        // add it to the html element that we grabbed above 
        cat_fact.classList.add('catfact')
        cat_facts_div.appendChild(cat_fact)
    }
}
function request_coffee() {
    let base_url = 'https://coffee.alexflipnote.dev'
    let query = '/random.json'

    fetch(base_url + query)
        .then(
            function (response) {
                return response.json()
            }
        )
        .then(
            function (data) {
            build_coffee(data)
            }
        )
        .catch(
            function (error) {
            console.log(error)
            }
        )
    }
function build_coffee(data) {
    console.log(data['file'])
    let coffee_div = document.querySelector('.coffee')
    let coffee_img = document.createElement('img')
    coffee_img.src = data['file']
    coffee_div.appendChild(coffee_img)
}
//get the button
window.onload = function() {
    let coffee_button = document.querySelector('.kafi')
    console.log(coffee_button)
//add an event listerner to the button in this case click
    coffee_button.addEventListener('click', request_coffee)
}

