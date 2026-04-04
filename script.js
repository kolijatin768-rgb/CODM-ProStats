document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
});

function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.getElementById('mainNav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const nav = document.getElementById("mainNav");
        if (nav) nav.classList.remove("active");
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');

    if (!bgMusic || !toggleBtn) return;

    bgMusic.volume = 0.3;
    let isMuted = false;

    bgMusic.play().catch(() => {
        const startMusic = () => {
            bgMusic.play();
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keydown', startMusic);
            document.removeEventListener('touchstart', startMusic);
        };
        document.addEventListener('click', startMusic);
        document.addEventListener('keydown', startMusic);
        document.addEventListener('touchstart', startMusic);
    });

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        isMuted = !isMuted;
        bgMusic.muted = isMuted;

        if (isMuted) {
            musicIcon.className = 'fas fa-volume-mute';
            toggleBtn.classList.add('muted');
            toggleBtn.title = 'Unmute Music';
        } else {
            musicIcon.className = 'fas fa-volume-up';
            toggleBtn.classList.remove('muted');
            toggleBtn.title = 'Mute Music';
        }
    });
});

self.addEventListener("fetch", event => {
  if (event.request.url.includes('_vercel/insights')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
