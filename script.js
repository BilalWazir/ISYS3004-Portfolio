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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  

/* Mouse Cursor Effect*/
const cursor = document.querySelector(".cursor");
const text = document.querySelector(".text");

document.addEventListener("mousemove", e => {
	cursor.style.left = e.pageX + "px";
	cursor.style.top = e.pageY + "px";
});

document.addEventListener("scroll", e => {
	if (window.scrollY > 100) {
		text.style.opacity = 0;
	} else {
		text.style.opacity = 1;
	}
});
