// ========================================
// LIVE STATISTICS SYSTEM
// ========================================

// Configuration des statistiques
const STATS_CONFIG = {
    playersOnline: {
        min: 15,
        max: 250,
        updateInterval: 5000, // 5 secondes
        variance: 10
    },
    totalDownloads: {
        base: 12847,
        increment: 1,
        updateInterval: 30000 // 30 secondes
    },
    totalPlayers: {
        base: 45623,
        increment: 2,
        updateInterval: 45000 // 45 secondes
    }
};

// Variables globales pour les stats
let currentStats = {
    playersOnline: 0,
    totalDownloads: STATS_CONFIG.totalDownloads.base,
    totalPlayers: STATS_CONFIG.totalPlayers.base
};

// Fonction pour animer un compteur
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

// Fonction pour formater les nombres
function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

// Initialiser les statistiques
function initializeStats() {
    // Joueurs en ligne - nombre aléatoire initial
    const initialPlayers = Math.floor(
        Math.random() * (STATS_CONFIG.playersOnline.max - STATS_CONFIG.playersOnline.min) + 
        STATS_CONFIG.playersOnline.min
    );
    currentStats.playersOnline = initialPlayers;
    
    // Animer les compteurs initiaux
    const playersElement = document.getElementById('playersOnline');
    const downloadsElement = document.getElementById('totalDownloads');
    const totalPlayersElement = document.getElementById('totalPlayers');
    
    if (playersElement) {
        animateCounter(playersElement, 0, currentStats.playersOnline, 2000);
    }
    
    if (downloadsElement) {
        animateCounter(downloadsElement, 0, currentStats.totalDownloads, 2500);
    }
    
    if (totalPlayersElement) {
        animateCounter(totalPlayersElement, 0, currentStats.totalPlayers, 3000);
    }
}

// Mettre à jour les joueurs en ligne
function updatePlayersOnline() {
    const element = document.getElementById('playersOnline');
    if (!element) return;
    
    const oldValue = currentStats.playersOnline;
    const variance = STATS_CONFIG.playersOnline.variance;
    const change = Math.floor(Math.random() * variance * 2) - variance;
    
    let newValue = oldValue + change;
    newValue = Math.max(STATS_CONFIG.playersOnline.min, 
                       Math.min(STATS_CONFIG.playersOnline.max, newValue));
    
    currentStats.playersOnline = newValue;
    animateCounter(element, oldValue, newValue, 800);
}

// Mettre à jour les téléchargements
function updateTotalDownloads() {
    const element = document.getElementById('totalDownloads');
    if (!element) return;
    
    const oldValue = currentStats.totalDownloads;
    const increment = Math.floor(Math.random() * 3) + 1; // 1-3 téléchargements
    const newValue = oldValue + increment;
    
    currentStats.totalDownloads = newValue;
    animateCounter(element, oldValue, newValue, 1000);
}

// Mettre à jour le total de joueurs
function updateTotalPlayers() {
    const element = document.getElementById('totalPlayers');
    if (!element) return;
    
    const oldValue = currentStats.totalPlayers;
    const increment = Math.floor(Math.random() * 5) + 1; // 1-5 nouveaux joueurs
    const newValue = oldValue + increment;
    
    currentStats.totalPlayers = newValue;
    animateCounter(element, oldValue, newValue, 1000);
}

// Démarrer les mises à jour automatiques
function startStatsUpdates() {
    // Mettre à jour les joueurs en ligne toutes les 5 secondes
    setInterval(updatePlayersOnline, STATS_CONFIG.playersOnline.updateInterval);
    
    // Mettre à jour les téléchargements toutes les 30 secondes
    setInterval(updateTotalDownloads, STATS_CONFIG.totalDownloads.updateInterval);
    
    // Mettre à jour le total de joueurs toutes les 45 secondes
    setInterval(updateTotalPlayers, STATS_CONFIG.totalPlayers.updateInterval);
}

// Initialiser au chargement de la page
window.addEventListener('load', () => {
    setTimeout(() => {
        initializeStats();
        startStatsUpdates();
    }, 1000); // Délai de 1 seconde après le chargement
});

// Sauvegarder les stats dans localStorage pour persistance
function saveStats() {
    localStorage.setItem('backroomsStats', JSON.stringify(currentStats));
}

// Charger les stats depuis localStorage
function loadStats() {
    const saved = localStorage.getItem('backroomsStats');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Utiliser les stats sauvegardées mais avec une petite variation
            currentStats.totalDownloads = parsed.totalDownloads || STATS_CONFIG.totalDownloads.base;
            currentStats.totalPlayers = parsed.totalPlayers || STATS_CONFIG.totalPlayers.base;
        } catch (e) {
            console.log('Erreur chargement stats:', e);
        }
    }
}

// Charger les stats au démarrage
loadStats();

// Sauvegarder les stats toutes les minutes
setInterval(saveStats, 60000);

// Sauvegarder avant de quitter la page
window.addEventListener('beforeunload', saveStats);
// ========================================
// DOWNLOAD TRACKING
// ========================================

// Fonction pour enregistrer un téléchargement
async function trackDownload(platform = 'windows') {
    try {
        // Si l'API est disponible, enregistrer le téléchargement
        const API_URL = 'http://localhost:3000'; // Changez selon votre configuration
        
        const response = await fetch(`${API_URL}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ platform })
        });
        
        if (response.ok) {
            console.log('Téléchargement enregistré avec succès');
            // Mettre à jour les stats localement
            currentStats.totalDownloads++;
            updateStatsDisplay();
            saveStats();
        }
    } catch (error) {
        console.log('API non disponible, téléchargement non enregistré');
        // Incrémenter localement même si l'API n'est pas disponible
        currentStats.totalDownloads++;
        updateStatsDisplay();
        saveStats();
    }
}

// Ajouter un écouteur d'événement sur le bouton de téléchargement
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('.btn-download');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            // Ne pas empêcher le téléchargement
            trackDownload('windows');
            
            // Afficher un message de remerciement
            const originalText = downloadButton.innerHTML;
            downloadButton.innerHTML = '<span class="btn-icon">✓</span> Merci pour le téléchargement !';
            downloadButton.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
            
            setTimeout(() => {
                downloadButton.innerHTML = originalText;
                downloadButton.style.background = '';
            }, 3000);
        });
    }
});


// ========================================
// NAVIGATION
// ========================================

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========================================
// NAVBAR EFFECTS
// ========================================

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Link Highlight on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
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
// INTERSECTION OBSERVER ANIMATIONS
// ========================================

// Intersection Observer for Fade-in Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .stat-item, .req-column');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
});

// ========================================
// COUNTER ANIMATION
// ========================================

// Animate numbers in stat items
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {

// ========================================
// PARTICLE SYSTEM
// ========================================

// Create floating particles for atmosphere
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

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// ========================================
// MOUSE TRAIL EFFECT
// ========================================

let mouseTrailTimeout;
const createMouseTrail = (e) => {
    clearTimeout(mouseTrailTimeout);
    
    if (Math.random() > 0.85) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
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
};

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trail-fade {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }
`;
document.head.appendChild(trailStyle);

document.addEventListener('mousemove', createMouseTrail);

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
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

// Apply typing effect to hero subtitles
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
// FEATURE CARDS TILT EFFECT
// ========================================

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// GALLERY LIGHTBOX ENHANCEMENT
// ========================================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img || !img.src) return;
        
        // Create enhanced lightbox
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
            transition: transform 0.3s ease;
        `;
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'rotate(90deg) scale(1.2)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'rotate(0deg) scale(1)';
        });
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Close on click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => lightbox.remove(), 300);
            }
        });
        
        // Close on ESC
        const closeOnEsc = (e) => {
            if (e.key === 'Escape') {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => lightbox.remove(), 300);
                document.removeEventListener('keydown', closeOnEsc);
            }
        };
        document.addEventListener('keydown', closeOnEsc);
    });
});

// Add lightbox animations
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

document.querySelectorAll('.btn-primary, .btn-download, .platform-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-effect 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.about-text, .download-info, .video-container');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize reveal elements
document.querySelectorAll('.about-text, .download-info, .video-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Observe stat items for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            
            // Check if it's a number
            if (!isNaN(text) && text !== '∞' && text !== 'UE 5.4' && text !== '100%') {
                const target = parseInt(text);
                h3.textContent = '0';
                animateCounter(h3, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// Gallery Image Modal (Simple Implementation)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && img.src) {
            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
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
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border: 3px solid var(--primary-color);
                box-shadow: 0 0 50px rgba(212, 197, 160, 0.5);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close modal on ESC key
            const closeOnEsc = (e) => {
                if (e.key === 'Escape') {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                    document.removeEventListener('keydown', closeOnEsc);
                }
            };
            document.addEventListener('keydown', closeOnEsc);
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Random Glitch Effect on Title
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff3b3b,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ffff
            `;
            setTimeout(() => {
                glitchTitle.style.textShadow = '';
            }, 50);
        }
    }, 100);
}

// Cursor Trail Effect (Optional - Backrooms atmosphere)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) { // Only create trail occasionally for performance
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: rgba(212, 197, 160, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeOut 1s forwards;
        `;
        
        document.body.appendChild(trail);
        cursorTrail.push(trail);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// Download Button Click Handler
const downloadButtons = document.querySelectorAll('.btn-download, .platform-link');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create notification
        const notification = document.createElement('div');
        notification.textContent = 'Téléchargement bientôt disponible!';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: var(--text-dark);
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    });
});

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideStyle);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'glitchScreen 0.5s';
        setTimeout(() => {
            alert('🎮 Code Konami activé! Vous avez trouvé le secret des Backrooms!');
            document.body.style.animation = '';
        }, 500);
    }
});

const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitchScreen {
        0%, 100% { filter: none; }
        25% { filter: hue-rotate(90deg) saturate(3); }
        50% { filter: invert(1); }
        75% { filter: hue-rotate(270deg) saturate(3); }
    }
`;
document.head.appendChild(glitchStyle);

console.log('%c🚪 Bienvenue dans les Backrooms...', 'color: #d4c5a0; font-size: 20px; font-weight: bold;');
console.log('%cSi vous voyez ceci, vous êtes déjà trop profond...', 'color: #ff3b3b; font-size: 14px;');

// Made with Bob
