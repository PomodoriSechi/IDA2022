function rollOut() {
    var element = document.getElementById("behindthesounds");
    element.classList.toggle("visible");
    // const smoothScroll = (id) => {
    //     const element = $(`#behindthesounds`);
    //     element.stop().animate({
    //         scrollTop: element.prop("scrollHeight")
    //     }, 500);
    // }
    
    // smoothScroll('scroll-to-bottom');
    $('html, body').animate({
        scrollTop: $("#behindthesounds").offset().top}, 10);
  }


//   $('#behindthesounds').scrollTop($('#behindthesounds')[0].scrollHeight);



  // The following code do the same thing:
  // $('#scroll-to-bottom').scrollTop(function() {
  // 	return this.scrollHeight;
  // });

  // let scroll_to_bottom = $("#scroll-to-bottom");
  // scroll_to_bottom.scrollTop(scroll_to_bottom.prop("scrollHeight"));
 

//   $(document).ready(function(){
//     $("about-button").click(function(){
//       $("behindthesounds").animate({
//         height: 'toggle'
//       });
//     });
//   });
