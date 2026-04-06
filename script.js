// ===== APPLY CONFIG =====
function applyConfig() {
  const C = CONFIG;
  const G = C.groom;
  const B = C.bride;
  const W = C.ngayCuoi;

  // Tên khách mời (ưu tiên URL param ?to=)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || C.tenKhachMoi || 'Bạn';

  // Envelope
  const envNames = document.getElementById('env-names');
  if (envNames) envNames.innerHTML = `${G.tenHienThi} <span>&</span> ${B.tenHienThi}`;
  const envGuest = document.getElementById('env-guest-name');
  if (envGuest) envGuest.textContent = guestName;
  const envGroomName = document.getElementById('env-groom-name');
  if (envGroomName) envGroomName.textContent = G.tenHienThi;
  const envBrideName = document.getElementById('env-bride-name');
  if (envBrideName) envBrideName.textContent = B.tenHienThi;
  const envDate = document.getElementById('env-date');
  if (envDate) envDate.textContent = W.hienThi;

  // Title
  document.title = `${G.tenNgan} & ${B.tenNgan} - Thiệp Cưới`;

  // Hero
  const heroGroom = document.getElementById('hero-groom');
  if (heroGroom) heroGroom.textContent = G.tenHienThi;
  const heroBride = document.getElementById('hero-bride');
  if (heroBride) heroBride.textContent = B.tenHienThi;
  const heroDate = document.getElementById('hero-date');
  if (heroDate) heroDate.innerHTML = `${W.hienThi} &bull; ${W.diaDiem}`;

  // Invitation
  const $ = (id) => document.getElementById(id);
  $('inv-cha-trai').textContent = C.nhaTrai.cha;
  $('inv-me-trai').textContent = C.nhaTrai.me;
  $('inv-loi-trai').textContent = C.nhaTrai.loiGioiThieu;
  $('inv-ten-re').textContent = G.hoTen;
  $('inv-cha-gai').textContent = C.nhaGai.cha;
  $('inv-me-gai').textContent = C.nhaGai.me;
  $('inv-loi-gai').textContent = C.nhaGai.loiGioiThieu;
  $('inv-ten-dau').textContent = B.hoTen;

  // Couple
  $('cp-ten-re').textContent = G.hoTen;
  $('cp-role-re').textContent = G.vaiTro;
  $('cp-mota-re').textContent = G.moTa;
  $('cp-ten-dau').textContent = B.hoTen;
  $('cp-role-dau').textContent = B.vaiTro;
  $('cp-mota-dau').textContent = B.moTa;

  // Timeline (story)
  const tlWrap = $('timeline-wrap');
  if (tlWrap) {
    const line = tlWrap.querySelector('.tl-line');
    let html = line ? line.outerHTML : '';
    C.cauChuyen.forEach((item, i) => {
      const side = i % 2 === 0 ? 'left' : 'right';
      const revealDir = i % 2 === 0 ? 'reveal-left' : 'reveal-right';
      html += `
        <div class="tl-item ${side} ${revealDir}">
          <div class="tl-dot"></div>
          <div class="tl-card">
            <img src="${item.anh}" alt="" loading="lazy" decoding="async">
            <div class="tl-body">
              <span class="tl-date">${item.ngay}</span>
              <h3>${item.tieuDe}</h3>
              <p>${item.moTa}</p>
            </div>
          </div>
        </div>`;
    });
    tlWrap.innerHTML = html;
  }

  // Events
  const evGrid = $('events-grid');
  if (evGrid) {
    const icons = ['&#128141;', '&#128149;', '&#128144;', '&#127881;'];
    function fmtDate(ngay, thangNam) {
      const mm = (thangNam.match(/\d{2}/)||[''])[0];
      const yyyy = (thangNam.match(/\d{4}/)||['2026'])[0];
      return `<span class="ev-day">${ngay}</span><span class="ev-sep">.</span><span class="ev-month-num">${mm}</span><span class="ev-sep">.</span><span class="ev-year">${yyyy}</span>`;
    }
    function renderTiecBlock(ev) {
      const t = ev.tiec;
      if (t && typeof t === 'object') {
        const gio = t.gio && String(t.gio).trim();
        const dd = t.diaDiem && String(t.diaDiem).trim();
        const dc = t.diaChi && String(t.diaChi).trim();
        const map = t.banDo && String(t.banDo).trim();
        if (!gio && !dd && !dc && !map) return '';
        const mapLabel = dd || dc || 'Chỉ đường tiệc';
        return `
        <div class="ev-tiec">
          <div class="ev-tiec-label">Tiệc Mừng</div>
          ${t.ngay ? `<div class="ev-date ev-date--tiec">${fmtDate(t.ngay, t.thangNam || ev.thangNam)}</div>` : ''}
          ${gio ? `<p class="ev-row">&#128336; ${esc(gio)}</p>` : ''}
          ${map ? `<a class="ev-row ev-row--link" href="${map}" target="_blank" rel="noopener noreferrer">&#128205; ${esc(mapLabel)}</a>` : ''}
        </div>`;
      }
      const legacyGio = ev.gioTiec && String(ev.gioTiec).trim();
      if (!legacyGio) return '';
      return `
        <div class="ev-tiec">
          <div class="ev-tiec-label">Tiệc Mừng</div>
          <p class="ev-row">&#128336; ${esc(legacyGio)}</p>
        </div>`;
    }
    evGrid.innerHTML = C.suKien.map((ev, i) => `
      <div class="ev-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
        <div class="ev-icon">${icons[i] || icons[0]}</div>
        <h3>${ev.ten}</h3>
        <div class="ev-date">${fmtDate(ev.ngay, ev.thangNam)}</div>
        <div class="ev-info">
          <p class="ev-row">&#128336; ${ev.gio}</p>
          <a class="ev-row ev-row--link" href="${ev.banDo}" target="_blank" rel="noopener noreferrer">&#128205; ${ev.diaDiem}</a>
          <p class="ev-row ev-row--addr">${ev.diaChi}</p>
        </div>
        ${renderTiecBlock(ev)}
      </div>`).join('');
  }

  // Gift popup
  const giftPopupGrid = $('gift-popup-grid');
  if (giftPopupGrid) {
    const people = [
      { ...G, img: 'assets/images/couple/groom.jpg', qr: 'assets/qr/qr-groom.png' },
      { ...B, img: 'assets/images/couple/bride.jpg', qr: 'assets/qr/qr-bride.png' },
    ];
    giftPopupGrid.innerHTML = people.map(p => `
      <div class="gift-card">
        <img class="gift-avatar" src="${p.img}" alt="">
        <h3>${p.hoTen}</h3>
        <p class="gift-bank">${p.nganHang}</p>
        <p class="gift-num">${p.soTaiKhoan}</p>
        <img class="gift-qr" src="${p.qr}" alt="QR ${p.vaiTro}">
        <button class="copy-btn" onclick="copyBank('${p.soTaiKhoanCopy}',this)">Sao chép STK</button>
      </div>`).join('');
  }

  // RSVP event select
  const rsvpSelect = $('rsvp-event-select');
  if (rsvpSelect) {
    let opts = '<option value="both">Cả hai lễ</option>';
    C.suKien.forEach(ev => { opts += `<option>${ev.ten}</option>`; });
    rsvpSelect.innerHTML = opts;
  }

  // Wishes
  const wishList = $('wish-list');
  if (wishList) {
    const colors = ['#B22D3F', '#C9A84C', '#5D7A3B', '#4A6FA5', '#9B59B6'];
    wishList.innerHTML = C.loiChucMau.map((w, i) => `
      <div class="w-item">
        <div class="w-av" style="background:${colors[i % colors.length]}">${w.ten[0]}</div>
        <div class="w-body"><b>${w.ten}</b><p>${w.noidung}</p><small>${w.thoiGian}</small></div>
      </div>`).join('');
  }

  // Footer (chỉ còn avatar + thank you)
}

// ===== OPEN INVITATION =====
/** Tiếng mở phong bì: fanfare + hợp âm chúc mừng (Web Audio) — schedule sau ctx.resume() */
let envelopeAudioCtx = null;

/** Gọi từ pointerdown trên phong bì: mở khóa AudioContext trước khi click (Safari/iOS) */
function envelopeAudioUnlock() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!envelopeAudioCtx) envelopeAudioCtx = new AC();
    if (envelopeAudioCtx.state === 'suspended') envelopeAudioCtx.resume();
  } catch (e) {
    /* ignore */
  }
}

function playEnvelopeOpenSound() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!envelopeAudioCtx) envelopeAudioCtx = new AC();
    const ctx = envelopeAudioCtx;

    const scheduleChime = () => {
      const now = ctx.currentTime + 0.025;
      const master = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(5200, now);
      lp.Q.setValueAtTime(0.65, now);
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(0.48, now + 0.07);
      master.gain.linearRampToValueAtTime(0.0001, now + 1.35);
      master.connect(lp);
      lp.connect(ctx.destination);

      /** Nốt đơn: tam giác + hoà âm bậc 2 (sine) — nghe rõ, ấm, kiểu chuông mừng */
      function note(freq, delay, dur, vel) {
        const t0 = now + delay;
        const o1 = ctx.createOscillator();
        o1.type = 'triangle';
        o1.frequency.setValueAtTime(freq, t0);
        const o2 = ctx.createOscillator();
        o2.type = 'sine';
        o2.frequency.setValueAtTime(freq * 2, t0);
        const g1 = ctx.createGain();
        const g2 = ctx.createGain();
        const att = 0.048;
        g1.gain.setValueAtTime(0.0001, t0);
        g1.gain.linearRampToValueAtTime(vel, t0 + att);
        g1.gain.linearRampToValueAtTime(0.0001, t0 + dur);
        g2.gain.setValueAtTime(0.0001, t0);
        g2.gain.linearRampToValueAtTime(vel * 0.42, t0 + att);
        g2.gain.linearRampToValueAtTime(0.0001, t0 + dur);
        o1.connect(g1);
        o2.connect(g2);
        g1.connect(master);
        g2.connect(master);
        o1.start(t0);
        o2.start(t0);
        o1.stop(t0 + dur + 0.05);
        o2.stop(t0 + dur + 0.05);
      }

      /** Hợp âm C major — “chúc mừng” kết */
      function chord(freqs, delay, dur, vel) {
        const t0 = now + delay;
        freqs.forEach((freq) => {
          const o = ctx.createOscillator();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, t0);
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.linearRampToValueAtTime(vel, t0 + 0.065);
          g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
          o.connect(g);
          g.connect(master);
          o.start(t0);
          o.stop(t0 + dur + 0.06);
        });
      }

      /* Fanfare đám cưới: C5–E5–G5–C6 rồi hợp âm C (đồng điệu trưởng) */
      note(523.25, 0, 0.18, 0.24);
      note(659.25, 0.15, 0.18, 0.24);
      note(783.99, 0.3, 0.18, 0.24);
      note(1046.5, 0.45, 0.26, 0.26);
      chord([261.63, 329.63, 392.0], 0.78, 0.52, 0.16);
    };

    const wake = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();
    Promise.resolve(wake).then(scheduleChime).catch(() => {});
  } catch (e) {
    /* ignore */
  }
}

function openInvitation() {
  playEnvelopeOpenSound();

  const envelope = document.getElementById('envelope-screen');
  const main = document.getElementById('main');
  const musicBtn = document.getElementById('music-btn');
  const navDots = document.getElementById('nav-dots');

  // Bước 1 (0s): Nội dung thu nhỏ vào giữa + mờ
  envelope.classList.add('content-hide');

  // Bước 2 (0.8s): Rải cánh hoa
  setTimeout(() => burstHearts(), 800);

  // Bước 3 (1.4s): Hiện main dưới envelope
  setTimeout(() => {
    main.classList.remove('hide');
    musicBtn.classList.remove('hide');
    musicBtn.classList.add('music-btn--intro');
    const endIntro = () => musicBtn.classList.remove('music-btn--intro');
    musicBtn.addEventListener('animationend', endIntro, { once: true });
    setTimeout(endIntro, 1200);
    navDots.classList.remove('hide');
  }, 1400);

  // Bước 4 (1.8s): Fade out envelope; ~2s sau mới bật auto-scroll
  setTimeout(() => {
    envelope.classList.add('out');
    envelope.style.display = 'none';
    document.body.style.overflow = 'auto';
    burstMusicNotes();
    tryPlayMusic();
    initReveal();
    setTimeout(() => initAutoScroll(), 2000);
  }, 1800);

  // Bước 5: Init còn lại
  setTimeout(() => startCountdown(), 2200);
  setTimeout(() => initParallax(), 2300);
  setTimeout(() => initNavDots(), 2400);
  setTimeout(() => initPetals(), 2500);
  setTimeout(() => initFloatingHearts(), 2600);
  setTimeout(() => initBackToTop(), 2700);
  setTimeout(() => initFloatWishes(), 2800);
}

function burstHearts() {
  const petals = ['🌸', '🌸', '🌸', '♥', '🌸', '🌸'];
  const colors = ['#FFB7C5', '#F2C4CE', '#E8B4BF', '#D9A0AD', '#F0BDC8', '#EAC4CC'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('span');
    el.className = 'env-burst';
    el.textContent = petals[i % petals.length];
    el.style.color = colors[i % colors.length];
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.top = (Math.random() * 30 - 10) + 'vh';
    const tx = (Math.random() - 0.5) * 200;
    const ty = 250 + Math.random() * 350;
    el.style.setProperty('--tx', tx + 'px');
    el.style.setProperty('--ty', ty + 'px');
    el.style.setProperty('--rot', (Math.random() * 540 - 270) + 'deg');
    el.style.fontSize = (18 + Math.random() * 14) + 'px';
    el.style.animationDelay = (Math.random() * 0.6) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

/** Nốt nhạc bay lên khi mở thiệp (đồng bộ lúc nhạc nền bật) */
function burstMusicNotes() {
  const symbols = ['♪', '♫', '♬', '♩', '🎵', '🎶'];
  const colors = ['#C76B82', '#C4956E', '#D98DA0', '#A67C52', '#E0B89A'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('span');
    el.className = 'music-burst';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = symbols[i % symbols.length];
    el.style.color = colors[i % colors.length];
    el.style.left = (6 + Math.random() * 88) + 'vw';
    el.style.bottom = (-8 + Math.random() * 18) + 'vh';
    el.style.setProperty('--dx', (Math.random() - 0.5) * 140 + 'px');
    el.style.setProperty('--rot', (Math.random() * 100 - 50) + 'deg');
    el.style.fontSize = (18 + Math.random() * 14) + 'px';
    el.style.animationDelay = (Math.random() * 0.45) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

// ===== MUSIC =====
let playing = false;

function tryPlayMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio.src && !audio.querySelector('source')) return;
  audio.play().then(() => {
    playing = true;
    document.getElementById('music-btn').classList.add('playing');
  }).catch(() => {});
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  if (playing) { audio.pause(); btn.classList.remove('playing'); }
  else { audio.play().catch(() => {}); btn.classList.add('playing'); }
  playing = !playing;
}

// ===== COUNTDOWN =====
function startCountdown() {
  const W = CONFIG.ngayCuoi;
  const target = new Date(`${W.nam}-${String(W.thang).padStart(2,'0')}-${String(W.ngay).padStart(2,'0')}T${W.gio}:00${W.timezone}`).getTime();

  function update() {
    const diff = Math.max(0, target - Date.now());
    setNum('c-d', Math.floor(diff / 864e5));
    setNum('c-h', Math.floor(diff % 864e5 / 36e5));
    setNum('c-m', Math.floor(diff % 36e5 / 6e4));
    setNum('c-s', Math.floor(diff % 6e4 / 1e3));
  }

  function setNum(id, val) {
    const el = document.getElementById(id);
    const str = String(val).padStart(id === 'c-d' ? 3 : 2, '0');
    if (el.textContent !== str) {
      el.style.transform = 'scale(.85)';
      el.style.opacity = '.4';
      setTimeout(() => { el.textContent = str; el.style.transform = ''; el.style.opacity = ''; }, 120);
    }
  }

  update();
  setInterval(update, 1000);
}

// ===== CHERRY BLOSSOM PETALS =====
function initPetals() {
  const canvas = document.getElementById('petals');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const petals = [];

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = [
    { fill: 'rgba(255,183,197,A)', stroke: 'rgba(255,140,160,0.3)' },
    { fill: 'rgba(255,200,210,A)', stroke: 'rgba(255,160,175,0.2)' },
    { fill: 'rgba(248,170,185,A)', stroke: 'rgba(240,130,150,0.3)' },
    { fill: 'rgba(255,220,225,A)', stroke: 'rgba(255,180,190,0.2)' },
    { fill: 'rgba(232,217,158,A)', stroke: 'rgba(201,168,76,0.2)' },
  ];

  function drawPetal(x, y, size, rot, opa, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = opa;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * .8, -size * .6, size * .6, size * .2, 0, size);
    ctx.bezierCurveTo(-size * .6, size * .2, -size * .8, -size * .6, 0, -size);
    ctx.closePath();
    ctx.fillStyle = color.fill.replace('A', opa);
    ctx.fill();
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = .5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -size * .7);
    ctx.lineTo(0, size * .6);
    ctx.lineWidth = .3;
    ctx.stroke();
    ctx.restore();
  }

  class Petal {
    constructor(rand) { this.reset(rand); this.color = COLORS[Math.floor(Math.random() * COLORS.length)]; }
    reset(rand) {
      this.x = Math.random() * canvas.width;
      this.y = rand ? Math.random() * canvas.height : -Math.random() * 60 - 10;
      this.size = Math.random() * 8 + 4;
      this.vy = Math.random() * .8 + .3;
      this.vx = Math.random() * .4 - .2;
      this.rot = Math.random() * Math.PI * 2;
      this.rs = (Math.random() - .5) * .02;
      this.opa = Math.random() * .4 + .2;
      this.ws = Math.random() * .015 + .005;
      this.wa = Math.random() * 1.5 + .5;
      this.ph = Math.random() * Math.PI * 2;
    }
    update() {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.y * this.ws + this.ph) * this.wa;
      this.rot += this.rs;
      this.rs += Math.sin(this.y * .01) * .0003;
      if (this.y > canvas.height + 30) this.reset(false);
    }
    draw() { drawPetal(this.x, this.y, this.size, this.rot, this.opa, this.color); }
  }

  for (let i = 0; i < 25; i++) petals.push(new Petal(true));
  (function loop() {
    // Tạm dừng canvas khi scroll qua hero
    if (window.scrollY > canvas.parentElement.offsetHeight + 100) {
      requestAnimationFrame(loop);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
}

// ===== PARALLAX =====
function initParallax() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (autoScrollRunning) return;
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = document.getElementById('hero').offsetHeight;
        if (scrollY < heroH) bg.style.transform = `translateY(${scrollY * .3}px) scale(1.05)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== SCROLL REVEAL (with stagger) =====
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -80px 0px' });

  // Auto-stagger siblings
  const groups = {};
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => {
    const parent = el.parentElement;
    const key = parent ? parent.id || parent.className : '';
    if (!groups[key]) groups[key] = [];
    groups[key].push(el);
  });
  Object.values(groups).forEach(els => {
    els.forEach((el, i) => {
      if (els.length > 1 && i > 0) {
        el.style.transitionDelay = (i * 0.1) + 's';
      }
      observer.observe(el);
    });
  });

  // Gallery items — observer riêng, trigger khi từng ảnh vào viewport
  let galDelay = 0;
  const galObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const img = el.querySelector('img');
        if (img) img.style.animationDelay = galDelay + 's';
        el.classList.add('gal-visible');
        galDelay += 0.12;
        setTimeout(() => { galDelay = Math.max(0, galDelay - 0.12); }, 600);
        galObs.unobserve(el);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.gal-item').forEach(el => galObs.observe(el));

  const tlLine = document.querySelector('.tl-line');
  if (tlLine) {
    const tlObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate'); tlObs.unobserve(e.target); } });
    }, { threshold: .1 });
    tlObs.observe(tlLine);
  }
}

// ===== FLOATING HEARTS =====
function initFloatingHearts() {
  function spawn() {
    // Giới hạn tối đa 3 trên DOM
    const existing = document.querySelectorAll('.floating-heart');
    if (existing.length >= 3) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '&#10084;';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, 6000);
  }
  setInterval(spawn, 5000);
}

// ===== NAV DOTS =====
function initNavDots() {
  const dots = document.querySelectorAll('.dot');
  const sections = Array.from(dots).map(d => document.querySelector(d.getAttribute('href')));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = sections.indexOf(e.target);
        dots.forEach((d, j) => d.classList.toggle('active', j === idx));
      }
    });
  }, { threshold: .3 });
  sections.forEach(s => { if (s) observer.observe(s); });
}

// ===== LIGHTBOX =====
let wasScrollingBeforeLightbox = false;

function openLightbox(el) {
  const lb = document.getElementById('lightbox');
  const img = el.querySelector('img');
  if (!img) return;
  wasScrollingBeforeLightbox = autoScrollRunning;
  if (autoScrollRunning) pauseAutoScroll();
  document.getElementById('lb-img').src = img.src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
  const audio = document.getElementById('bg-music');
  if (playing && audio) audio.volume = 0.3;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = 'auto';
  const audio = document.getElementById('bg-music');
  if (playing && audio) audio.volume = 1;
  if (wasScrollingBeforeLightbox) {
    setTimeout(() => startAutoScroll(), 300);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('active')) closeLightbox();
    const gp = document.getElementById('gift-popup');
    if (gp && gp.classList.contains('active')) closeGiftPopup();
    const wp = document.getElementById('wish-popup');
    if (wp && wp.classList.contains('active')) closeWishPopup();
  }
});

// ===== RSVP =====
function submitRSVP(e) {
  e.preventDefault();
  const btn = document.getElementById('rsvp-btn');
  const ok = document.getElementById('rsvp-ok');
  btn.textContent = 'Đang gửi...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Đã Gửi!';
    btn.style.background = '#27ae60';
    ok.classList.remove('hide');
    e.target.reset();
    setTimeout(() => { btn.textContent = 'Xác Nhận Tham Dự'; btn.style.background = ''; btn.disabled = false; }, 3000);
  }, 1000);
}


function esc(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

// ===== GIFT POPUP =====
function openGiftPopup() {
  const popup = document.getElementById('gift-popup');
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeGiftPopup(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('gift-popup-close')) return;
  const popup = document.getElementById('gift-popup');
  popup.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ===== COPY BANK =====
function copyBank(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = 'Đã sao chép!';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = original; btn.classList.remove('ok'); }, 2000);
  });
}

// ===== ENVELOPE FALLING PETALS =====
function initEnvParticles() {
  const canvas = document.getElementById('env-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const petals = [];
  const PETAL_COUNT = 20;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const PETAL_COLORS = [
    { fill: 'rgba(230,130,160,A)', stroke: 'rgba(210,100,130,0.4)' },
    { fill: 'rgba(240,150,175,A)', stroke: 'rgba(220,120,150,0.3)' },
    { fill: 'rgba(235,140,170,A)', stroke: 'rgba(215,110,140,0.35)' },
    { fill: 'rgba(245,170,190,A)', stroke: 'rgba(225,140,165,0.3)' },
    { fill: 'rgba(250,180,200,A)', stroke: 'rgba(230,150,175,0.25)' },
  ];

  function drawPetal(x, y, size, rot, opa, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = opa;
    // Cánh hoa đơn - hình giọt nước mềm
    ctx.beginPath();
    ctx.moveTo(0, -size * .9);
    ctx.bezierCurveTo(size * .6, -size * .7, size * .8, size * .1, size * .15, size * .7);
    ctx.bezierCurveTo(size * .05, size * .9, -size * .05, size * .9, -size * .15, size * .7);
    ctx.bezierCurveTo(-size * .8, size * .1, -size * .6, -size * .7, 0, -size * .9);
    ctx.closePath();
    ctx.fillStyle = color.fill.replace('A', String(opa));
    ctx.fill();
    // Gân cánh hoa nhẹ
    ctx.beginPath();
    ctx.moveTo(0, -size * .6);
    ctx.quadraticCurveTo(size * .05, 0, 0, size * .5);
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = .4;
    ctx.stroke();
    ctx.restore();
  }

  class Petal {
    constructor() { this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]; this.reset(true); }
    reset(init) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : -Math.random() * 40 - 10;
      this.size = Math.random() * 10 + 6;
      this.vy = Math.random() * .5 + .2;
      this.vx = Math.random() * .3 - .15;
      this.rot = Math.random() * Math.PI * 2;
      this.rs = (Math.random() - .5) * .01;
      this.opa = Math.random() * .4 + .3;
      this.wobble = Math.random() * .01 + .004;
      this.wobbleAmp = Math.random() * 1 + .3;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.y * this.wobble + this.phase) * this.wobbleAmp;
      this.rot += this.rs;
      if (this.y > canvas.height + 20) this.reset(false);
    }
    draw() { drawPetal(this.x, this.y, this.size, this.rot, this.opa, this.color); }
  }

  for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());

  let animId;
  (function loop() {
    const env = document.getElementById('envelope-screen');
    if (!env || env.style.display === 'none') { cancelAnimationFrame(animId); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  })();
}

// ===== ENVELOPE SEQUENCE =====
function startEnvSequence() {
  const stepTitle = document.querySelector('.env-step-title');
  const stepCouple = document.querySelector('.env-step-couple');
  const stepInvite = document.querySelector('.env-step-invite');
  const hint = document.querySelector('.env-tap-hint');

  // Bước 1 (0.3s): Wedding Invitation title
  setTimeout(() => { if (stepTitle) stepTitle.classList.add('show'); }, 300);

  // Bước 2 (1.2s): Ảnh + Tên cô dâu chú rể
  setTimeout(() => { if (stepCouple) stepCouple.classList.add('show'); }, 1200);

  // Bước 3 (2.2s): Ngày cưới + Trân Trọng Kính Mời
  setTimeout(() => { if (stepInvite) stepInvite.classList.add('show'); }, 2200);

  // Bước 4 (3.5s): Hint chạm mở thiệp
  setTimeout(() => { if (hint) hint.classList.add('show'); }, 3500);
}

// ===== FLOATING WISHES + BOTTOM BAR =====
const FW_COLORS = ['#E74C3C', '#E67E22', '#2ECC71', '#3498DB', '#9B59B6', '#E91E63', '#00BCD4'];
const FW_EMOJIS = ['❤️', '💕', '✨', '🎉', '💗', '🥰', '💐'];
const FW_MAX = 4;

function addFloatWish(name, msg) {
  const list = document.getElementById('fw-list');
  if (!list) return;

  // Xóa cũ nếu đủ 4
  while (list.children.length >= FW_MAX) {
    list.firstElementChild.remove();
  }

  const el = document.createElement('div');
  el.className = 'fw-item fw-entering';
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  const emoji = FW_EMOJIS[Math.floor(Math.random() * FW_EMOJIS.length)];
  el.innerHTML = `<div class="fw-bubble"><span class="fw-name" style="color:${color}">${esc(name)}:</span><span class="fw-emoji">${emoji}</span><span class="fw-msg">${esc(msg)}</span></div>`;
  list.appendChild(el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { el.classList.remove('fw-entering'); });
  });
}

// ===== WISH STORAGE =====
function getSavedWishes() {
  try {
    return JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  } catch { return []; }
}

function saveWish(name, msg) {
  const wishes = getSavedWishes();
  wishes.push({ ten: name, noidung: msg, thoiGian: new Date().toISOString() });
  localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
}

function openWishPopup() {
  const popup = document.getElementById('wish-popup');
  const panel = popup.querySelector('.wish-popup-content');
  popup.classList.add('active');
  requestAnimationFrame(() => {
    if (panel) panel.scrollTop = 0;
    const name = document.getElementById('wp-name');
    if (name) name.focus();
  });
}
function closeWishPopup(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('wish-popup-close')) return;
  document.getElementById('wish-popup').classList.remove('active');
}
function submitWishPopup(e) {
  e.preventDefault();
  const name = document.getElementById('wp-name').value.trim();
  const msg = document.getElementById('wp-msg').value.trim();
  if (!name || !msg) return;
  addFloatWish(name, msg);
  saveWish(name, msg);
  document.getElementById('wp-name').value = '';
  document.getElementById('wp-msg').value = '';
  document.getElementById('wish-popup').classList.remove('active');
}

let throwHeartsLock = false;
function throwHearts() {
  if (throwHeartsLock) return;
  throwHeartsLock = true;
  setTimeout(() => { throwHeartsLock = false; }, 320);

  const container = document.getElementById('throw-hearts');
  if (!container) return;
  const hearts = ['❤', '💕', '💗', '💖', '♥'];
  for (let i = 0; i < 6; i++) {
    const el = document.createElement('span');
    el.className = 'th-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.setProperty('--th-x', (Math.random() * 100 - 50) + 'px');
    el.style.setProperty('--th-y', (Math.random() * 70 - 35) + 'px');
    el.style.fontSize = (20 + Math.random() * 16) + 'px';
    el.style.animationDelay = (Math.random() * 0.3) + 's';
    el.style.animationDuration = (1.5 + Math.random() * 1) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
  // Không dừng auto-scroll
}

function initFloatWishes() {
  // Hiện bottom bar + input bar
  const bar = document.getElementById('bottom-bar');
  if (bar) bar.classList.remove('hide');
  const inputBar = document.getElementById('fw-input-bar');
  if (inputBar) inputBar.classList.remove('hide');

  // Gộp lời chúc mẫu + lời chúc đã lưu
  const allWishes = [
    ...CONFIG.loiChucMau,
    ...getSavedWishes()
  ];
  if (!allWishes.length) return;

  let idx = 0;
  function showNext() {
    if (idx >= allWishes.length) idx = 0;
    addFloatWish(allWishes[idx].ten, allWishes[idx].noidung);
    idx++;
  }
  // Hiện lời chúc đều đặn mỗi 2s
  setTimeout(() => {
    showNext();
    setInterval(showNext, 2000);
  }, 1500);
}

// ===== AUTO SCROLL =====
let autoScrollRunning = false;
let autoScrollId = null;
/** px mỗi frame (~60fps). Thấp = cuộn chậm, dễ xem ảnh / đọc chữ */
const AUTO_SPEED = 1;

function startAutoScroll() {
  if (autoScrollId) { cancelAnimationFrame(autoScrollId); autoScrollId = null; }
  const btn = document.getElementById('scroll-btn');
  autoScrollRunning = true;
  if (btn) btn.classList.add('scrolling');

  function tick() {
    if (!autoScrollRunning) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0 || window.scrollY >= maxScroll - 2) {
      pauseAutoScroll();
      return;
    }
    window.scrollBy(0, AUTO_SPEED);
    autoScrollId = requestAnimationFrame(tick);
  }
  autoScrollId = requestAnimationFrame(tick);
}

function pauseAutoScroll() {
  autoScrollRunning = false;
  if (autoScrollId) { cancelAnimationFrame(autoScrollId); autoScrollId = null; }
  const btn = document.getElementById('scroll-btn');
  if (btn) btn.classList.remove('scrolling');
}

function replayScroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const topBtn = document.querySelector('.bb-top');
  if (topBtn) topBtn.classList.remove('visible');
  setTimeout(() => startAutoScroll(), 1000);
}

function initBackToTop() {
  const topBtn = document.querySelector('.bb-top');
  if (!topBtn) return;
  window.addEventListener('scroll', function() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 100) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });
}

function toggleAutoScroll() {
  if (autoScrollRunning) {
    pauseAutoScroll();
  } else {
    startAutoScroll();
  }
}

function initAutoScroll() {
  const btn = document.getElementById('scroll-btn');
  if (btn) btn.classList.remove('hide');

  startAutoScroll();

  // Chờ 3s rồi mới lắng nghe user input — tránh bắt click mở thiệp
  setTimeout(() => {
    window.addEventListener('click', function(e) {
      if (e.target.closest('.bottom-bar,.scroll-toggle,.fw-input-bar,#lightbox,.lb-close,.gift-popup,.wish-popup,.gal-item,.fw-list,.fw-item,.fw-bubble,#music-btn')) return;
      if (!e.isTrusted) return;
      if (autoScrollRunning) {
        pauseAutoScroll();
      } else {
        startAutoScroll();
      }
    });

    window.addEventListener('wheel', function() {
      if (autoScrollRunning) pauseAutoScroll();
    }, { passive: true });
  }, 3000);
}

// ===== VIDEO FALLBACK + viewport autoplay (muted, không trùng nhạc nền) =====
function initVideoFallback() {
  const video = document.getElementById('wedding-video');
  const container = document.getElementById('video-container');
  const fallback = document.getElementById('video-fallback');
  if (!video || !container || !fallback) return;
  video.addEventListener('error', function() {
    container.classList.add('hide');
    fallback.classList.remove('hide');
  }, true);
  // Check source error
  const source = video.querySelector('source');
  if (source) {
    source.addEventListener('error', function() {
      container.classList.add('hide');
      fallback.classList.remove('hide');
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(container);
  }
}

// ===== INIT =====
document.body.style.overflow = 'hidden';
applyConfig();
initEnvParticles();
startEnvSequence();
initVideoFallback();
