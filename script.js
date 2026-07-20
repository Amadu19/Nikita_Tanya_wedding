// ===== ТАЙМЕР ОБРАТНОГО ОТСЧЁТА =====
const weddingDate = new Date('2026-08-16T14:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.querySelector('.countdown').innerHTML = 
            '<p style="font-size: 1.5rem; color: var(--blue-mist);">Мы уже поженились! 🎉</p>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== АУДИО ПЛЕЕР =====
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

// Устанавливаем иконку при загрузке
musicBtn.textContent = '🎵';

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '🎵';
    } else {
        music.play().catch(e => console.log('Автовоспроизведение заблокировано браузером'));
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🎶';
    }
    isPlaying = !isPlaying;
});

// ===== УВЕДОМЛЕНИЕ О САЙТЕ =====
function closeInfo() {
    const notification = document.getElementById('infoNotification');
    const miniBtn = document.getElementById('infoMiniBtn');

    // И на мобильных, и на десктопе — сворачиваем уведомление
    // и показываем круглую мини-кнопку, чтобы его можно было вернуть
    notification.classList.add('collapsed');
    miniBtn.classList.add('visible');
}

function toggleInfo() {
    const notification = document.getElementById('infoNotification');
    const miniBtn = document.getElementById('infoMiniBtn');

    if (notification.classList.contains('collapsed')) {
        notification.classList.remove('collapsed');
        miniBtn.classList.remove('visible');
    } else {
        notification.classList.add('collapsed');
        miniBtn.classList.add('visible');
    }
}

// При загрузке страницы уведомление свёрнуто — видна только круглая кнопка.
// Открыть его можно по клику на кнопку (см. toggleInfo() выше).
document.getElementById('infoNotification').classList.add('collapsed');
document.getElementById('infoMiniBtn').classList.add('visible');

// ===== АНИМАЦИИ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .venue-card, .wishes-card, .contacts-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== ПАДАЮЩИЕ УКРАШЕНИЯ (декор) =====
function createOrnament() {
    const symbols = ['✦', '❋', '✧'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const ornament = document.createElement('div');
    ornament.innerHTML = symbol;
    ornament.style.position = 'fixed';
    ornament.style.top = '-20px';
    ornament.style.left = Math.random() * 100 + 'vw';
    ornament.style.color = 'var(--blue-light)';
    ornament.style.opacity = '0.4';
    ornament.style.fontSize = (Math.random() * 15 + 10) + 'px';
    ornament.style.pointerEvents = 'none';
    ornament.style.zIndex = '9999';
    ornament.style.animation = `fall ${Math.random() * 3 + 4}s linear forwards`;
    document.body.appendChild(ornament);

    setTimeout(() => ornament.remove(), 7000);
}

// Добавляем анимацию падения
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);

// Создаём украшения каждые 3 секунды
setInterval(createOrnament, 3000);
