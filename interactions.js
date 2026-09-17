/* Scroll and touch interactions, designed to stay lightweight and accessible. */
(()=>{
  const showLoader=()=>{
    if(document.querySelector('.page-loader'))return;
    const loader=document.createElement('div');
    loader.className='page-loader';
    loader.setAttribute('role','status');
    loader.setAttribute('aria-label','Loading Kunika Gupta portfolio');
    loader.innerHTML='<div class="page-loader-mark"><span>Kunika</span> Gupta</div><div class="page-loader-line" aria-hidden="true"><i></i></div><p>Digital Marketing Portfolio</p>';
    document.body.prepend(loader);
    const dismiss=()=>{
      loader.classList.add('is-hidden');
      window.setTimeout(()=>loader.remove(),650);
    };
    if(document.readyState==='complete')window.setTimeout(dismiss,180);
    else window.addEventListener('load',()=>window.setTimeout(dismiss,180),{once:true});
  };
  if(document.body)showLoader();
  else document.addEventListener('DOMContentLoaded',showLoader,{once:true});
})();
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  body.classList.add('motion-ready');

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.innerHTML = '<span></span>';
  body.prepend(progress);
  const progressBar = progress.firstElementChild;
  const nav = document.querySelector('.nav');
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    nav?.classList.toggle('scrolled', window.scrollY > 12);
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, {passive:true});

  const targets = document.querySelectorAll('.hero > .wrap, .section-head, .coverage-head, .section > .wrap > h2, .section > .wrap > h2 + h3, .grid > *, .coverage-grid > *, .coverage-grid-web > *, .toolgrid > *, .skills > *, .timeline > *, .case-study-card, .case-panel, .facts > *, .contact > *, .capabilities > *');
  targets.forEach((target, index) => {
    target.classList.add('motion-reveal');
    if (index % 5 === 1) target.classList.add('slide-left');
    if (index % 5 === 2) target.classList.add('slide-right');
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), {threshold:.12, rootMargin:'0px 0px -36px'});
    targets.forEach((target) => observer.observe(target));
  } else targets.forEach((target) => target.classList.add('is-visible'));

  document.querySelectorAll('a, button, .interactive-card').forEach((element) => {
    element.classList.add('touch-feedback');
    element.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      element.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), {once:true});
    });
  });
});
