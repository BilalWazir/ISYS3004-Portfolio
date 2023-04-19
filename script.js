/*This is set in place so that animated text only plays when a user scrolls down to them*/
/*Sliding Text*/

const slide_observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

/* Typing Text Effect*/

const type_observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('typing');
        }
    })
})
slide_observer.observe(document.querySelector('.animated-text'));
type_observer.observe(document.querySelector('.typing-text'));


/* This is set in place to enable smooth scrolling to a section in the page when clicked in dropdown menu*/
/* ChatGPT was used in the assistance of creating this part*/
document.addEventListener("mousemove", function(event) {
  var x = event.clientX;
  var y = event.clientY;
  document.getElementById("cursor").style.transform = "translate(" + x + "px, " + y + "px)";
});

/*Changes to Cursor*/

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
});

document.addEventListener('click', () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500)
});
