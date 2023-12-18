var element = document.getElementById('header');

function checkVisibilityAndSetOpacity() {
  var distanceFromTop = element.offsetTop;

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  var windowHeight = window.innerHeight;

  if (scrollTop > windowHeight - distanceFromTop) {
    element.style.opacity = 1;
  }
}

window.addEventListener('scroll', checkVisibilityAndSetOpacity);

checkVisibilityAndSetOpacity();

