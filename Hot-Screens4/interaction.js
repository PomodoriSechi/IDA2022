/*var title= $("condensedimage:hover").attr("title");

$("condensedimage:hover").on("hover",function(){
    alert(title);
});*/

const scrollContainer = document.querySelector("main");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});