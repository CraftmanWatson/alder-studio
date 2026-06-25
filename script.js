// Navigasi Mobile Menu
const navBtn = document.querySelector(".nav-btn");
const navScreen = document.querySelector(".nav-screen");

navBtn.addEventListener("click", function() {
    navScreen.classList.toggle("active");
    navBtn.classList.toggle("cross");
});

// Auto Scroll Track Komponen
const track = document.querySelector(".product-cards-group");
let direction = 1;
let isPaused = false;
const speed = 0.6;

function autoScroll() {
    if (!isPaused && track) {
        track.scrollLeft += speed * direction;
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 1) {
            direction = -1;
        } else if (track.scrollLeft <= 0) {
            direction = 1;
        }
    }
    requestAnimationFrame(autoScroll);
}
// Jalankan animasi auto-scroll
requestAnimationFrame(autoScroll);

// FIX: Ganti mousedown/touchstart dengan mouseenter/mouseleave agar lebih aman di browser modern
track.addEventListener("mouseenter", () => isPaused = true);
track.addEventListener("mouseleave", () => isPaused = false);
track.addEventListener("touchstart", () => isPaused = true, { passive: true });
track.addEventListener("touchend", () => isPaused = false, { passive: true });

// Toggle Aktif pada Gambar Produk
const productImgs = document.querySelectorAll(".product-img");
productImgs.forEach(function(img) {
    img.addEventListener("click", function() {
        img.classList.toggle("active");
    });
});

// Sistem Berlangganan Newsletter
const newsletterForm = document.querySelector(".newsletter-form");
const newsletterInput = document.querySelector(".newsletter-input");
const newsletterMessage = document.querySelector(".newsletter-message");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = newsletterInput.value.trim();

        // Validasi mendalam untuk kecocokan tipe email dasar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newsletterMessage.textContent = "Please enter a valid email address.";
            newsletterMessage.className = "newsletter-message error";
            return;
        }

        // Tampilan respon sukses
        newsletterMessage.textContent = "Thanks for subscribing! Check your inbox.";
        newsletterMessage.className = "newsletter-message success";
        newsletterInput.value = "";
    });
}

// Fitur untuk menutup menu mobile otomatis saat link di-klik
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        // Cek jika navScreen sedang terbuka (punya class active)
        if (navScreen.classList.contains("active")) {
            navScreen.classList.remove("active");
            navBtn.classList.remove("cross");
        }
    });
});