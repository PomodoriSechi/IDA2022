// $("#about-button").click(function() {
//      $("#content").animate({
//           width: "100%",
//           height: "0px"
//      }, function() {
//          window.location.href = "index2.html";
//      });
// });

// $("#about-button").click(function() {
//      $("#content").slideUp(function() {
//          window.location.href = "index2.html";
//      });
// });


// function rollout() {
//     let div = document.getElementById("behindthesounds")

//     if (div.style.visibility = "collapse") {
//         div.style.visibility = "visible"
//         div.style.height = "700px"
//     } else {
//         div.style.visibility = "collapse"
//         div.style.height = "0px"
//     }
//     }


// function rollIn() {
//     if(div.style.visibility = "visible") {
//         div.style.visibility = "collapse"
//         div.style.height = "0px"
//     }
// }

// let e = document.getElementById("behindthesounds")
// function rollout() {
//     const btsbutton = document.getElementById("behindthesounds");
//     btsbutton.addEventListener("click", (e) => {  
//       if (e.classList.contains("visible")) {
//         e.target.classList.remove("visible");
//         Tone.Transport.stop();
//         playing = false;
//       } else {
//         e.target.classList.add("visible");
//       }
//     });
//   };





// var btn = document.getElementById("behindthesounds");
// var behindthesounds = document.getElementById("behindthesounds");

// btn.addEventListener("click", function() {
//     behindthesounds.classList.toggle("visible");
//  });



function myFunction() {
    var element = document.getElementById("behindthesounds");
    element.classList.toggle("visible");
  }