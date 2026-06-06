/* Fast Track Pro — shared interactions (no smooth-scroll library) */
(function () {
  // sticky nav shadow
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // mobile menu
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });
    var drop = document.getElementById('svcDrop');
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        // on mobile, first tap on "Services" opens the submenu instead of navigating
        if (window.innerWidth <= 680 && drop && a.parentElement === drop && a.querySelector('.caret')) {
          e.preventDefault(); drop.classList.toggle('open'); return;
        }
        burger.classList.remove('open'); links.classList.remove('open'); document.body.style.overflow = '';
      });
    });
  }

  // scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // quote form -> WhatsApp
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = 'Hello Fast Track Pro Services,%0A%0AName: ' + encodeURIComponent(f.name.value) +
        '%0APhone: ' + encodeURIComponent(f.phone.value) +
        '%0AService: ' + encodeURIComponent(f.service.value) +
        '%0AMessage: ' + encodeURIComponent(f.message.value || '-');
      window.open('https://wa.me/971523120954?text=' + msg, '_blank');
    });
  }

  // graceful image fallback (hide broken decorative bg images)
  document.querySelectorAll('img[data-soft]').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });
})();
