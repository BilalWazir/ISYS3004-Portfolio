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
  
console.clear();

const { gsap, CircleType } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
const cursorTextContainerEl = document.querySelector(".cursor--text");
const cursorTextEl = cursorTextContainerEl.querySelector(".text");

const hoverItems = document.querySelectorAll(".cursor-hover-item");
const hoverEffectDuration = 0.3;
let isHovered = false;
let initialCursorHeight;

const cursorRotationDuration = 8;

let circleType = new CircleType(cursorTextEl);
circleType.radius(50);

setTimeout(() => {
  initialCursorHeight = circleType.container.style.getPropertyValue("height");
  console.log(initialCursorHeight);
}, 50);

hoverItems.forEach((item) => {
  item.addEventListener("pointerenter", handlePointerEnter);
  item.addEventListener("pointerleave", handlePointerLeave);
});

let mouse = {
  x: -100,
  y: -100
};

document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

function updateCursor() {
  gsap.set([cursorInner, cursorTextContainerEl], {
    x: mouse.x,
    y: mouse.y
  });

  gsap.to(cursorOuter, {
    duration: 0.15,
    x: mouse.x,
    y: mouse.y
  });

  if (!isHovered) {
    gsap.to(cursorTextContainerEl, hoverEffectDuration * 0.5, {
      opacity: 0
    });
    gsap.set(cursorTextContainerEl, {
      rotate: 0
    });
  }

  requestAnimationFrame(updateCursor);
}

updateCursor();

function handlePointerEnter(e) {
  isHovered = true;

  const target = e.currentTarget;
  updateCursorText(target);

  gsap.set([cursorTextContainerEl, cursorTextEl], {
    height: initialCursorHeight,
    width: initialCursorHeight
  });

  gsap.fromTo(
    cursorTextContainerEl,
    {
      rotate: 0
    },
    {
      duration: cursorRotationDuration,
      rotate: 360,
      ease: "none",
      repeat: -1
    }
  );

  gsap.to(cursorInner, hoverEffectDuration, {
    scale: 2
  });

  gsap.fromTo(
    cursorTextContainerEl,
    hoverEffectDuration,
    {
      scale: 1.2,
      opacity: 0
    },
    {
      delay: hoverEffectDuration * 0.75,
      scale: 1,
      opacity: 1
    }
  );
  gsap.to(cursorOuter, hoverEffectDuration, {
    scale: 1.2,
    opacity: 0
  });
}

function handlePointerLeave() {
  isHovered = false;
  gsap.to([cursorInner, cursorOuter], hoverEffectDuration, {
    scale: 1,
    opacity: 1
  });
}

function updateCursorText(textEl) {
  const cursorTextRepeatTimes = textEl.getAttribute("data-cursor-text-repeat");
  const cursorText = returnMultipleString(
    textEl.getAttribute("data-cursor-text"),
    cursorTextRepeatTimes
  );

  circleType.destroy();

  cursorTextEl.innerHTML = cursorText;
  circleType = new CircleType(cursorTextEl);
}

function returnMultipleString(string, count) {
  let s = "";
  for (let i = 0; i < count; i++) {
    s += ` ${string} `;
  }
  return s;
}