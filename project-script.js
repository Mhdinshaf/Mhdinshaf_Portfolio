// ===== PROJECT DATA =====
const projects = [
    {
        number:  "PROJECT 01 / 04",
        tech:    "ANGULAR · SPRING BOOT",
        title:   "VIBEIT<span class='neon-dot'>.</span>LK PLATFORM",
        tags:    ["E-COMMERCE", "FULL-STACK", "3D UI"],
        desc:    "A premium e-commerce platform for tech gadgets. Focuses on full-stack excellence and high-performance user interfaces.",
        year:    "2026",
        type:    "OWNER",
        status:  "Live",
        github:  "https://github.com/Mhdinshaf/vibeit.online",
        live:    "#"
    },
    {
        number:  "PROJECT 02 / 04",
        tech:    "SPRING BOOT · WEBSOCKET · JAVA",
        title:   "EECP REAL<span class='neon-dot'>-</span>TIME CHAT",
        tags:    ["ENTERPRISE", "WEBSOCKET", "JAVA"],
        desc:    "Enterprise real-time communication system featuring secure chat rooms and instant data synchronization.",
        year:    "2026",
        type:    "LEAD",
        status:  "Stable",
        github:  "https://github.com/Mhdinshaf/eecp-platform",
        live:    "#"
    },
    {
        number:  "PROJECT 03 / 04",
        tech:    "REACT · SPRING BOOT · JIRA",
        title:   "DMT STAFF <span class='neon-dot'>T</span>RACKER",
        tags:    ["GOVERNMENT", "REACT", "JIRA"],
        desc:    "Government project developed as a Solution Provider to track staff productivity and optimize workflows.",
        year:    "2026",
        type:    "Full Stack(Solution Provider)",
        status:  "Deployed",
        github:  "https://github.com/sithija-jayasinghe/DMT",
        live:    "#"
    },
    {
        number:  "PROJECT 04 / 04",
        tech:    "JAVA · MYSQL · DESKTOP",
        title:   "WAREHOUSE <span class='neon-dot'>S</span>YSTEM",
        tags:    ["DESKTOP APP", "JAVA", "MYSQL"],
        desc:    "Advanced inventory and warehouse management system designed for large scale logistical operations.",
        year:    "2026",
        type:    "LEAD",
        status:  "Stable",
        github:  "https://github.com/Mhdinshaf/Advanced-Inventory-Warehouse-Management-frontend",
        live:    "#"
    }
];

let current = 0;
let isAnimating = false;

const card     = document.getElementById('project-display');
const pTech    = document.getElementById('p-tech');
const pNumber  = document.getElementById('p-number');
const pTitle   = document.getElementById('p-title');
const pTags    = document.getElementById('p-tags');
const pDesc    = document.getElementById('p-desc');
const pYear    = document.getElementById('p-year');
const pType    = document.getElementById('p-type');
const pStatus  = document.getElementById('p-status');
const pGithub  = document.getElementById('p-github');
const pLive    = document.getElementById('p-live');
const dotsWrap = document.getElementById('dots-container');

function buildDots() {
    dotsWrap.innerHTML = '';
    projects.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Go to project ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
    });
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

function renderProject(p) {
    pTech.textContent   = p.tech;
    pNumber.textContent = p.number;
    pTitle.innerHTML    = p.title;
    pDesc.textContent   = p.desc;
    pYear.textContent   = p.year;
    pType.textContent   = p.type;
    pStatus.textContent = p.status;
    pGithub.href        = p.github;
    pLive.href          = p.live;

    pTags.innerHTML = '';
    p.tags.forEach(tag => {
        const s = document.createElement('span');
        s.className = 'tag';
        s.textContent = tag;
        pTags.appendChild(s);
    });

    pLive.style.display = (p.live === '#') ? 'none' : 'inline-flex';
}

function animateSlide(direction, callback) {
    const outClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
    const inClass  = direction > 0 ? 'slide-in-left'  : 'slide-in-right';

    card.classList.add(outClass);
    setTimeout(() => {
        card.classList.remove(outClass);
        callback();
        card.classList.add(inClass);
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove(inClass)));
    }, 300);
}

function moveSlider(direction) {
    if (isAnimating) return;
    isAnimating = true;
    animateSlide(direction, () => {
        current = (current + direction + projects.length) % projects.length;
        renderProject(projects[current]);
        updateDots();
    });
    setTimeout(() => { isAnimating = false; }, 600);
}

function goTo(index) {
    if (isAnimating || index === current) return;
    const direction = index > current ? 1 : -1;
    isAnimating = true;
    animateSlide(direction, () => {
        current = index;
        renderProject(projects[current]);
        updateDots();
    });
    setTimeout(() => { isAnimating = false; }, 600);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  moveSlider(-1);
    if (e.key === 'ArrowRight') moveSlider(1);
});

let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveSlider(diff > 0 ? 1 : -1);
}, { passive: true });

// Live Clock
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const el = document.getElementById('live-clock');
    if (el) el.textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

buildDots();
renderProject(projects[0]);