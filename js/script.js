// ── Navbar scroll ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  const btn = document.getElementById("scrollTop");
  if (window.scrollY > 400) btn.classList.add("visible");
  else btn.classList.remove("visible");
});

// ── Mobile menu ──
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  // Menambah/menghapus class 'open'
  menu.classList.toggle("open");

  // Animasi icon (opsional: tambahkan transisi di CSS icon agar lebih keren)
  if (menu.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}

// ── Floating notes ──
const notes = ["♩", "♪", "♫", "♬", "𝄞", "𝄢"];
const container = document.getElementById("notesContainer");
for (let i = 0; i < 20; i++) {
  const el = document.createElement("div");
  el.className = "note";
  el.textContent = notes[Math.floor(Math.random() * notes.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 12 + Math.random() * 18 + "s";
  el.style.animationDelay = Math.random() * 20 + "s";
  el.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
  container.appendChild(el);
}

// ── Counter animation ──
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + "+";
      clearInterval(timer);
    } else el.textContent = Math.floor(start) + "+";
  }, 16);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.target));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll("[data-counter]")
  .forEach((el) => observer.observe(el));

// ── Form submit ──

(function () {
  emailjs.init("u7S0uAeCKf0PPTzKo");
})();

// 3. Fungsi Handler Pengiriman Form
function handleSubmit(event) {
  event.preventDefault();

  const btn = document.getElementById("submitBtn");
  const successMsg = document.getElementById("successMsg");

  // Efek Loading pada Tombol
  const originalBtnContent = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  // Kirim menggunakan Service ID dan Template ID Anda
  emailjs.sendForm("service_ng5yhta", "template_sygx4dn", event.target).then(
    () => {
      // Jika Berhasil
      successMsg.style.display = "flex";
      event.target.reset(); // Kosongkan form

      btn.innerHTML = originalBtnContent;
      btn.disabled = false;

      // Sembunyikan pesan sukses setelah 5 detik
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    },
    (err) => {
      // Jika Gagal
      alert("Gagal mengirim pesan: " + JSON.stringify(err));
      btn.innerHTML = originalBtnContent;
      btn.disabled = false;
    },
  );
}
// ── Active nav on scroll ──
const sections = document.querySelectorAll("section[id], #hero");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + current)
      link.style.color = "var(--gold)";
  });
});
