// ========================================
// CONFIGURATION ET LIENS
// ========================================
const ANDROID_URL = "https://jottacloud.com/s/4948003f34aaf9d458c894a95db48a6e5ca";
const WINDOWS_URL = "https://mega.nz/folder/BJMTwBaD#_InqSo-J5npFDkTUr8r1bw";

// ========================================
// LIVE STATISTICS SYSTEM
// ========================================

const STATS_CONFIG = {
    playersOnline: {
        min: 15,
        max: 250,
        updateInterval: 5000,
        variance: 10
    },
    totalDownloads: {
        base: 12847,
        increment: 1,
        updateInterval: 30000
    },
    totalPlayers: {
        base: 45623,
        increment: 2,
        updateInterval: 45000
    }
};

let currentStats = {
    playersOnline: 0,
    totalDownloads: STATS_CONFIG.totalDownloads.base,
    totalPlayers: STATS_CONFIG.totalPlayers.base
};

function animateCounter(element, start, end, duration = 1000) {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    element.classList.add('counting');
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
            element.classList.remove('counting');
        }
        element.textContent = Math.floor(current).toLocaleString('fr-FR');
    }, 16);
}

function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

function updateStatsDisplay() {
    const downloadsElem = document.getElementById('totalDownloads');
    if (downloadsElem) downloadsElem.textContent = formatNumber(currentStats.totalDownloads);
    
    const playersElem = document.getElementById('totalPlayers');
    if (playersElem) playersElem.textContent = formatNumber(currentStats.totalPlayers);

    const onlineElem = document.getElementById('playersOnline');
    if (onlineElem) onlineElem.textContent = formatNumber(currentStats.playersOnline);
}

function initializeStats() {
    const initialPlayers = Math.floor(
        Math.random() * (STATS_CONFIG.playersOnline.max - STATS_CONFIG.playersOnline.min) + 
        STATS_CONFIG.playersOnline.min
    );
    currentStats.playersOnline = initialPlayers;
    
    const playersElement = document.getElementById('playersOnline');
    const downloadsElement = document.getElementById('totalDownloads');
    const totalPlayersElement = document.getElementById('totalPlayers');
    
    if (playersElement) animateCounter(playersElement, 0, currentStats.playersOnline, 2000);
    if (downloadsElement) animateCounter(downloadsElement, 0, currentStats.totalDownloads, 2500);
    if (totalPlayersElement) animateCounter(totalPlayersElement, 0, currentStats.totalPlayers, 3000);
}

function updatePlayersOnline() {
    const element = document.getElementById('playersOnline');
    if (!element) return;
    
    const oldValue = currentStats.playersOnline;
    const variance = STATS_CONFIG.playersOnline.variance;
    const change = Math.floor(Math.random() * variance * 2) - variance;
    
    let newValue = Math.max(STATS_CONFIG.playersOnline.min, 
                           Math.min(STATS_CONFIG.playersOnline.max, oldValue + change));
    
    currentStats.playersOnline = newValue;
    animateCounter(element, oldValue, newValue, 800);
}

function updateTotalDownloads() {
    const element = document.getElementById('totalDownloads');
    if (!element) return;
    
    const oldValue = currentStats.totalDownloads;
    const newValue = oldValue + Math.floor(Math.random() * 3) + 1;
    
    currentStats.totalDownloads = newValue;
    animateCounter(element, oldValue, newValue, 1000);
}

function updateTotalPlayers() {
    const element = document.getElementById('totalPlayers');
    if (!element) return;
    
    const oldValue = currentStats.totalPlayers;
    const newValue = oldValue + Math.floor(Math.random() * 5) + 1;
    
    currentStats.totalPlayers = newValue;
    animateCounter(element, oldValue, newValue, 1000);
}

function startStatsUpdates() {
    setInterval(updatePlayersOnline, STATS_CONFIG.playersOnline.updateInterval);
    setInterval(updateTotalDownloads, STATS_CONFIG.totalDownloads.updateInterval);
    setInterval(updateTotalPlayers, STATS_CONFIG.totalPlayers.updateInterval);
}

function saveStats() {
    localStorage.setItem('backroomsStats', JSON.stringify(currentStats));
}

function loadStats() {
    const saved = localStorage.getItem('backroomsStats');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            currentStats.totalDownloads = parsed.totalDownloads || STATS_CONFIG.totalDownloads.base;
            currentStats.totalPlayers = parsed.totalPlayers || STATS_CONFIG.totalPlayers.base;
        } catch (e) {
            console.log('Erreur chargement stats:', e);
        }
    }
}

loadStats();
setInterval(saveStats, 60000);
window.addEventListener('beforeunload', saveStats);

window.addEventListener('load', () => {
    setTimeout(() => {
        initializeStats();
        startStatsUpdates();
    }, 1000);
});

// ========================================
// DEVICE DETECTION & DYNAMIC LINKS
// ========================================

function setupDeviceDetection() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    
    const badge = document.getElementById('detectedDeviceBadge');
    const btnWin = document.getElementById('btnWin');
    const btnAndroid = document.getElementById('btnAndroid');
    const heroBtn = document.getElementById('heroDownloadBtn');

    if (isMobile) {
        if (badge) badge.innerHTML = '📱 Appareil détecté : <strong>Mobile / Tablette</strong>';
        if (btnAndroid) {
            btnAndroid.classList.add('recommended');
            btnAndroid.href = ANDROID_URL;
        }
        if (heroBtn) {
            heroBtn.setAttribute('href', ANDROID_URL);
            heroBtn.setAttribute('target', '_blank');
            heroBtn.setAttribute('rel', 'noopener noreferrer');
            heroBtn.innerHTML = '📱 Télécharger l\'APK Android';
        }
    } else {
        if (badge) badge.innerHTML = '💻 Appareil détecté : <strong>PC / Ordinateur</strong>';
        if (btnWin) {
            btnWin.classList.add('recommended');
            btnWin.href = WINDOWS_URL;
        }
        if (heroBtn) {
            heroBtn.setAttribute('href', '#telecharger');
            heroBtn.innerHTML = '💻 Télécharger pour Windows';
        }
    }
}

// ========================================
// DOWNLOAD TRACKING & NOTIFICATIONS
// ========================================

async function trackDownload(platform = 'windows') {
    try {
        const API_URL = 'http://localhost:3000';
        await fetch(`${API_URL}/api/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform })
        });
    } catch (error) {
        // Mode hors-ligne / sauvegarde locale
    } finally {
        currentStats.totalDownloads++;
        updateStatsDisplay();
        saveStats();
    }
}

function showDownloadNotification() {
    const notification = document.createElement('div');
    notification.textContent = '🚀 Redirection vers le téléchargement...';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #00ff88;
        color: #000000;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la détection d'appareil
    setupDeviceDetection();

    // Gestion des boutons de téléchargement
    const downloadButtons = document.querySelectorAll('.btn-download, .platform-link');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Note: On ne met PAS e.preventDefault() pour laisser le lien MEGA s'ouvrir
            const platform = (button.id === 'btnAndroid' || button.href.includes('file')) ? 'android' : 'windows';
            trackDownload(platform);
            showDownloadNotification();
            
            if (button.classList.contains('btn-download')) {
                const originalText = button.innerHTML;
                button.innerHTML = '<span class="btn-icon">✓</span> Redirection...';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.blur();
                }, 3000);
            }
        });
    });

    // Fix Scroll Indicator
    const scrollIndicator = document.getElementById('scrollIndicatorBtn');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('telecharger');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// ========================================
// NAVIGATION
// ========================================

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
        if (burger) burger.classList.remove('toggle');
    });
});

// Smooth Scroll pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect & Active Links
const sections = document.querySelectorAll('section[id]');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }

    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER & ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .stat-item, .req-column, .about-text, .download-info, .video-container');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    document.querySelectorAll('.section-title').forEach(title => observer.observe(title));
});

// ========================================
// ATMOSPHERE EFFECTS (PARTICLES & TRAIL)
// ========================================

const createParticles = () => {
    const particleCount = 30;
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(212, 197, 160, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
};

createParticles();

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: radial-gradient(circle, rgba(212, 197, 160, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            animation: trail-fade 1s ease-out forwards;
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
    }
});

// ========================================
// TYPING EFFECT
// ========================================

const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-color)';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    };
    type();
};

window.addEventListener('load', () => {
    const subtitles = document.querySelectorAll('.hero-subtitle');
    if (subtitles.length > 0) {
        const text1 = subtitles[0].textContent;
        const text2 = subtitles.length > 1 ? subtitles[1].textContent : '';
        
        subtitles[0].textContent = '';
        if (subtitles.length > 1) subtitles[1].textContent = '';
        
        setTimeout(() => {
            typeWriter(subtitles[0], text1, 50);
            if (subtitles.length > 1) {
                setTimeout(() => {
                    typeWriter(subtitles[1], text2, 50);
                }, text1.length * 50 + 500);
            }
        }, 1000);
    }
});

// ========================================
// GALLERY LIGHTBOX
// ========================================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img || !img.src) return;
        
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border: 3px solid var(--primary-color);
            box-shadow: 0 0 50px rgba(212, 197, 160, 0.5);
            animation: zoomIn 0.3s ease;
        `;
        
        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 40px;
            color: var(--primary-color);
            cursor: pointer;
        `;
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        const removeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        };

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) removeLightbox();
        });
    });
});

// Styles CSS d'animation générés dynamiquement
const globalAnimStyle = document.createElement('style');
globalAnimStyle.textContent = `
    @keyframes float-particle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
    @keyframes trail-fade {
        to { opacity: 0; transform: translate(-50%, -50%) scale(2); }
    }
    @keyframes zoomIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    @keyframes fadeOut {
        to { opacity: 0; }
    }
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(globalAnimStyle);

console.log('%c🚪 Bienvenue dans les Backrooms...', 'color: #d4c5a0; font-size: 20px; font-weight: bold;');
