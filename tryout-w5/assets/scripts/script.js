export default () => {
    let scrollPercentage;
    // Get a reference to the <path>
    let path = document.querySelector("#zig");
    // Get length of path... ~577px in this demo
    let pathLength = path.getTotalLength();
    let ticking = false;
  
    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = 100 + " " + 2000;
    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = Math.random() * pathLength;
  
    window.addEventListener("scroll", setScrollPercentage);
  
    function setScrollPercentage() {
      // debounce scroll events https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
      if (!ticking) {
        window.requestAnimationFrame(function() {
          setLinesLength();
          ticking = false;
        });
  
        ticking = true;
      }
    }
  
    function setLinesLength() {
      // What % down is it?
      scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);
  
      // Length to offset the dashes
      let drawLength = pathLength * scrollPercentage * 0.1;
      // Draw in reverse
      path.style.strokeDashoffset = pathLength - drawLength;
    }
  };
  