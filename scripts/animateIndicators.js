window.scrollTo({top: 0});
const indicators = document.querySelectorAll(".indicator");
const header = document.getElementById("header");
const headerItem = document.querySelectorAll(".header-item");
console.log(headerItem);
const controller = new ScrollMagic.Controller();
let indexPos = 0;

document.querySelectorAll('.section').forEach((section, index, sections) => {
    const scene = new ScrollMagic.Scene({
        triggerElement: section,
        duration: 10
    })
    // .addIndicators()
    .addTo(controller)
    .on("enter leave", function (e) {
        if (e.scrollDirection == "FORWARD" && e.type == "leave") {
            indexPos += 1;
        } else if (e.scrollDirection == "REVERSE" && e.type == "leave") {
            indexPos -= 1;
        }

        console.log(indexPos);
        indicators.forEach((object, index) => {
            if (index == indexPos) {
                gsap.to(object, {css: {height: '100px', backgroundColor: '#FFFFFF'}, duration: 0.5, ease: "Expo.easeOut"});
            } else {
                gsap.to(object, {css: {height: '40px', backgroundColor: '#818181', scale: 1}, duration: 0.5, ease: "Expo.easeOut"});
            }

            if (indexPos >= 1) {
                gsap.to(header, {css: {opacity: 1}, duration: 0.4, ease: "Expo.easeOut"});
            } else {
                gsap.to(header, {css: {opacity: 0}, duration: 0.4, ease: "Expo.easeOut"});
            }

            if (headerItem[indexPos - 1] == headerItem[index - 1]) {
                gsap.to(headerItem[index - 1], {css: {backgroundColor: 'white', color: 'black'}, duration: 0.4, ease: "Expo.easeOut"});
            } else {
                gsap.to(headerItem[index - 1], {css: {backgroundColor: 'black', color: 'white'}, duration: 0.4, ease: "Expo.easeOut"});
            }
        });
    })
});
