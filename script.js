
  // Mobile menu
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    const expanded = burger.classList.contains('open');
    burger.setAttribute('aria-expanded', expanded);
  });
  document.querySelectorAll('.mobile-menu a').forEach(a=>{
    a.addEventListener('click', ()=>{
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el=>io.observe(el));

  // Index rail active state + click-to-scroll
  const dots = document.querySelectorAll('.rail-dot');
  const targets = Array.from(dots).map(d=>document.querySelector(d.dataset.target));
  dots.forEach(d=>{
    d.addEventListener('click', ()=>{
      document.querySelector(d.dataset.target).scrollIntoView({behavior:'smooth'});
    });
  });
  function updateRail(){
    let activeIndex = 0;
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    targets.forEach((t,i)=>{
      if(t && t.offsetTop <= scrollPos) activeIndex = i;
    });
    dots.forEach((d,i)=> d.classList.toggle('active', i===activeIndex));
  }
  window.addEventListener('scroll', updateRail, {passive:true});
  updateRail();

  // Page-load animation
  window.addEventListener('DOMContentLoaded', ()=>{
    document.body.style.opacity = 0;
    requestAnimationFrame(()=>{
      document.body.style.transition = 'opacity .6s ease';
      document.body.style.opacity = 1;
    });
  });