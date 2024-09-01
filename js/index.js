
$(document).ready(function(){
  gsap.registerPlugin(ScrollTrigger);
  anchorLink();
  headerMenu();
  mvAnimation();
  ga_link();
});



//==========
// Header
//==========
function headerMenu() {
  // hamburger menu for SP
  $('.js-header-trigger').on('click', function(){
    // change icon to cross
    $('.js-header-icon').toggleClass('is-open');
    // background from transparent to white
    $('.js-header').toggleClass('is-open');
    // display menu
    $('.js-header-menu').toggleClass('is-close');
    // no scroll when header-menu-list is open
    $('body').toggleClass('is-fixed');
  })
}

//==========
// Anchor Link + smooth scroll
//==========
function anchorLink() {
  var anchor = Array.from(document.querySelectorAll(".js-link"));
  anchor.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var id = e.target.hash.slice(1);
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' }, false);
    });
  });
}

//==========
// GSAP animation
//==========
function mvAnimation(){
  
  gsap.defaults({ease: "none"});

  // skill-card
  gsap.to(
    ".js-skill-item", {
    y: 0,
    opacity: 1,
    stagger: 0.5,
    duration: 1.8,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
      trigger: '.js-skill-card',
      start: 'top',
      once: true,
      toggleClass: "active",
      //markers: true,
    }
  });

  // profile
  gsap.fromTo('.js-profile', 
    {
      scale: 1,
    },
    {
      scale: 1.1,
      duration: 4, 
      repeat: -1,
      yoyo: true,
    }
  )

  // mv random circle
  var circle = gsap.timeline ()
  .to('.js-circle',{
    x: "random(-50, 100)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
    y: "random(-100, 100)",
    duration: "random(6, 8)",
    scale: "random(0.5, 1.5)",
    ease:"power1.inOut",
    repeat: -1,
    repeatRefresh:true // gets a new random x and y value on each repeat
  })

  // rotation
  gsap.to('.js-rotate', {
    rotation: "+=360", 
    duration: 30, 
    ease: "none", 
    repeat: -1, 
    transformOrigin: "50% 50%"
  });

  //MV text + button
  var button = $(".js-button");
  const tl = gsap.timeline();
  tl.to('.js-title', {
    duration: 1, 
    //scale: 1,
    opacity: 1,
    // x: 0,
    stagger: 0.5,
    ease: "power1.inOut",
    })
    .to(button, { opacity: 1})


}

//==========
// Google Analytics
//==========
function ga_link() {
  $('a').on('click', function(event) {
    const linkTitle = $(this).attr('title');
    const eventLabel = linkTitle ? linkTitle : $(this).text().trim();
    
    gtag('event', 'link_click', {
      'event_category': 'engagement',
      'event_label': eventLabel
    });
  });
}

