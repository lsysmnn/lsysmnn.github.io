// ===== 作品分类筛选 =====
const filterButtons = document.querySelectorAll('.filter');
const workCards = document.querySelectorAll('.work');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const filter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      item.classList.toggle('is-on', item === button);
    });

    workCards.forEach(function (card) {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-off', !match);
    });
  });
});

// ===== 图片放大查看 =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption, alt) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxCaption.textContent = caption || '';
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.work-img').forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const img = link.querySelector('img');
    openLightbox(link.getAttribute('href'), link.dataset.caption, img ? img.alt : '');
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeLightbox();
});

// ===== 复制邮箱 =====
const copyButton = document.getElementById('copy-email');
const emailText = document.getElementById('email-text');

if (copyButton && emailText) {
  copyButton.addEventListener('click', async function () {
    const email = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = '已复制 ✓';
    } catch (error) {
      const input = document.createElement('textarea');
      input.value = email;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      copyButton.textContent = '已复制 ✓';
    }
    setTimeout(function () {
      copyButton.textContent = '复制';
    }, 1800);
  });
}

// ===== 年份与访客计数 =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const counterEl = document.getElementById('visit-count');
if (counterEl) {
  let visits = 1;
  try {
    visits = Number(localStorage.getItem('site-visits')) || 0;
    visits += 1;
    localStorage.setItem('site-visits', String(visits));
  } catch (error) {
    visits = 1;
  }
  counterEl.textContent = String(visits).padStart(6, '0');
}

// ===== 导航高亮 =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.style.background = active ? 'rgba(230,196,231,.6)' : '';
        link.style.color = active ? '#4a4466' : '';
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}
