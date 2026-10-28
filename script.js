const config = window.CHAKRAWYUHA_CONFIG || {};
const $ = (id) => document.getElementById(id);
const register = $('registerLink');
const registerHint = $('registerHint');
const pdfOpen = $('pdfOpen');
const pdfDownload = $('pdfDownload');
const pdfHint = $('pdfHint');
const urlIsSet = (v) => typeof v === 'string' && v.trim() !== '';

if (urlIsSet(config.registrationUrl)) {
  register.href = config.registrationUrl;
  register.target = '_blank';
  register.rel = 'noopener noreferrer';
  $('navRegister').href = config.registrationUrl;
  $('navRegister').target = '_blank';
  $('navRegister').rel = 'noopener noreferrer';
} else {
  registerHint.textContent = 'Registration link coming soon.';
  register.addEventListener('click', (e) => { e.preventDefault(); registerHint.textContent = 'Registration opens soon. Check back shortly!'; });
}

if (urlIsSet(config.brochureUrl)) {
  pdfOpen.href = config.brochureUrl;
  pdfDownload.href = config.brochureUrl;
  // Local PDF is optional; display a friendly message if it has not been added yet.
  if (config.brochureUrl === 'assets/brochure.pdf') {
    fetch(config.brochureUrl, { method: 'HEAD' }).then(r => {
      if (!r.ok) pdfHint.textContent = 'Brochure will be available soon.';
    }).catch(() => { /* file:// preview may block HEAD; PDF still works when served */ });
  }
} else {
  pdfOpen.addEventListener('click', e => e.preventDefault());
  pdfDownload.addEventListener('click', e => e.preventDefault());
  pdfHint.textContent = 'Brochure coming soon.';
}

const modal = $('videoModal');
const container = $('videoContainer');
function youtubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be' || u.hostname === 'www.youtu.be') return u.pathname.slice(1).split('/')[0];
    if (['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(u.hostname)) {
      return u.searchParams.get('v') || (u.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/) || [])[1];
    }
  } catch (e) { /* Not a URL: treat as local video path */ }
  return null;
}
function openVideo() {
  container.replaceChildren();
  if (!urlIsSet(config.videoUrl)) {
    const msg = document.createElement('p'); msg.className = 'empty-video'; msg.textContent = 'The official teaser is coming soon.'; container.append(msg);
  } else {
    const id = youtubeId(config.videoUrl);
    if (id && /^[\w-]{11}$/.test(id)) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = 'Chakrawyuha official teaser'; iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; iframe.allowFullscreen = true;
      container.append(iframe);
    } else {
      const video = document.createElement('video'); video.src = config.videoUrl; video.controls = true; video.autoplay = true; video.playsInline = true;
      container.append(video);
    }
  }
  modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; $('closeVideo').focus();
}
function closeVideo() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); container.replaceChildren(); document.body.style.overflow = ''; $('openVideo').focus(); }
$('openVideo').addEventListener('click', openVideo);
$('closeVideo').addEventListener('click', closeVideo);
$('modalBackdrop').addEventListener('click', closeVideo);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeVideo(); });

const toggle = $('menuToggle');
toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!expanded)); $('mobileNav').classList.toggle('is-open', !expanded); toggle.textContent = expanded ? '☰' : '✕'; });
$('mobileNav').querySelectorAll('a').forEach(a => a.addEventListener('click', () => { $('mobileNav').classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent = '☰'; }));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - window.innerHeight; $('progress').style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`; document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 35); }, {passive:true});
