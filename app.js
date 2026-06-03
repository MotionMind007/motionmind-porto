// ══ MOTIONMIND PORTFOLIO — Dynamic Renderer ══

(function() {
  const data = DataManager.getAll();
  const profile = data.profile;
  const projects = data.projects;
  const services = data.services;

  // ═══ HERO ═══
  document.getElementById('hero-location').textContent = `${profile.location} · Remote Worldwide`;
  document.getElementById('hero-loc-text').textContent = `${profile.location} · WIB+1`;
  document.getElementById('hero-desc').textContent = profile.description;
  document.getElementById('orb-name').textContent = profile.name;
  document.getElementById('orb-foot').textContent = `motionmind.dev · Papua 🇮🇩`;
  document.getElementById('orb-avail').textContent = profile.available ? '● Available' : '● Busy';

  // Hero specialties
  const specsEl = document.getElementById('hero-specs');
  specsEl.innerHTML = profile.specialties.map(s => `<span class="spec-tag">${s}</span>`).join('');

  // Orb stats
  const statsEl = document.getElementById('orb-stats');
  const statsMap = [
    { key: 'projects', label: 'projects' },
    { key: 'automations', label: 'automations' },
    { key: 'years', label: 'years' },
    { key: 'committed', label: 'committed' }
  ];
  statsEl.innerHTML = statsMap.map(s =>
    `<div class="oc-stat"><div class="oc-num">${profile.stats[s.key]}</div><div class="oc-lbl">${s.label}</div></div>`
  ).join('');

  // ═══ MARQUEE ═══
  const mq1 = data.marquee1 || DEFAULT_DATA.marquee1;
  const mq2 = data.marquee2 || DEFAULT_DATA.marquee2;
  document.getElementById('mq1').innerHTML = [...mq1,...mq1,...mq1,...mq1].map(i => `<span class="mq-item">${i}<span class="mq-dot"></span></span>`).join('');
  document.getElementById('mq2').innerHTML = [...mq2,...mq2,...mq2,...mq2].map(i => `<span class="mq-item">${i}<span class="mq-dot"></span></span>`).join('');

  // ═══ SERVICES BENTO ═══
  const bentoEl = document.getElementById('bento-grid');
  const serviceIcons = {
    cyan: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    violet: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  };
  bentoEl.innerHTML = services.map(s => `
    <div class="bc sp${s.span}">
      <div class="bc-n">${s.number} ——</div>
      <div class="bc-ico">${serviceIcons[s.iconColor] || serviceIcons.cyan}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <div class="bc-tags">${s.tags.map(t => `<span class="bc-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  // ═══ PROJECTS ═══
  const workEl = document.getElementById('work-list');
  workEl.innerHTML = projects.map((p, i) => `
    <div class="wl-row">
      <div class="wl-idx">${String(i + 1).padStart(2, '0')}</div>
      <div class="wl-info"><h3>${p.title}</h3><p>// ${p.tech}</p></div>
      <span class="wl-badge ${p.badgeClass}">${p.badge}</span>
      <div class="wl-arr"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg></div>
    </div>
  `).join('');

  // ═══ TECH GRID ═══
  const techEl = document.getElementById('tech-grid');
  const techStack = data.techStack || DEFAULT_DATA.techStack;
  const techIcons = {
    'React': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></svg>',
    'Next.js': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M7 7l8.5 11V8"/><line x1="16" y1="7" x2="16" y2="15"/></svg>',
    'Node.js': '<svg viewBox="0 0 24 24"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 7v10"/><path d="M7.5 9.5L12 12l4.5-2.5"/></svg>',
    'Python': '<svg viewBox="0 0 24 24"><path d="M12 2C8 2 8 4 8 4v3h4v1H6s-4 0-4 4 3 4 3 4h2v-3s0-2 2-2h4s2 0 2-2V4s0-2-4-2z"/><path d="M12 22c4 0 4-2 4-2v-3h-4v-1h6s4 0 4-4-3-4-3-4h-2v3s0 2-2 2h-4s-2 0-2 2v4s0 2 4 2z"/><circle cx="10" cy="5" r="1"/><circle cx="14" cy="19" r="1"/></svg>',
    'LangChain': '<svg viewBox="0 0 24 24"><path d="M12 2l3 6h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z"/></svg>',
    'CrewAI': '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M9 17l-2-4M15 17l2-4"/></svg>',
    'Claude': '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12h8M8 8h5M8 16h6"/></svg>',
    'n8n': '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 12h3l3-6M12 12l3 6"/></svg>',
    'Postgres': '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>',
    'Supabase': '<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    'Docker': '<svg viewBox="0 0 24 24"><rect x="2" y="10" width="4" height="3" rx=".5"/><rect x="7" y="10" width="4" height="3" rx=".5"/><rect x="12" y="10" width="4" height="3" rx=".5"/><rect x="7" y="6" width="4" height="3" rx=".5"/><rect x="12" y="6" width="4" height="3" rx=".5"/><path d="M2 13c0 3 3 6 9 6s9-1.5 9-5"/></svg>',
    'Vercel': '<svg viewBox="0 0 24 24"><path d="M12 3L2 20h20z"/></svg>'
  };
  techEl.innerHTML = techStack.map(t => `
    <div class="t-item">
      ${techIcons[t] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>'}
      ${t}
    </div>
  `).join('');

  // ═══ CONTACT ═══
  const contactEl = document.getElementById('contact-cards');
  const contacts = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>` },
    { label: 'WhatsApp', value: profile.whatsapp, href: profile.whatsappLink, icon: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>` },
    { label: 'GitHub', value: profile.github, href: profile.githubLink, icon: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>` },
    { label: 'Instagram', value: profile.instagram, href: profile.instagramLink, icon: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>` }
  ];
  contactEl.innerHTML = contacts.map(c => `
    <a class="c-card" href="${c.href}" target="_blank" rel="noopener">
      <div class="c-card-ico">${c.icon}</div>
      <div><div class="c-card-label">${c.label}</div><div class="c-card-val">${c.value}</div></div>
      <span class="c-card-arr">→</span>
    </a>
  `).join('');

  // Location
  document.getElementById('loc-city').textContent = `📍 ${profile.location}`;
  document.getElementById('loc-detail').textContent = 'Indonesia · Remote Available Worldwide';
  document.getElementById('loc-timezone').textContent = `${profile.timezone} · Response within 24h`;

  // ═══ CANVAS HERO ═══
  const C = document.getElementById('hc'), cx = C.getContext('2d');
  let W, H;
  const resize = () => { W = C.width = C.offsetWidth; H = C.height = C.offsetHeight; };
  resize(); window.addEventListener('resize', resize);

  const pts = Array.from({length:100}, () => ({
    x: Math.random()*1400, y: Math.random()*600,
    vx: (Math.random()-.5)*.45, vy: (Math.random()-.5)*.45,
    r: Math.random()*1.4+.25,
    hue: Math.random()>.55 ? '37,99,235' : '124,58,237',
    a: Math.random()*.45+.1
  }));

  const lines = Array.from({length:12}, () => ({
    y: Math.random()*600, x: Math.random()*400,
    len: Math.random()*60+30, speed: Math.random()*.8+.3,
    a: Math.random()*.35+.1
  }));

  let t = 0;
  function frame() {
    cx.clearRect(0,0,W,H); t += .006;
    [[.038,.32,'37,99,235',.05],[.026,.58,'124,58,237',.04],[.05,.72,'34,211,238',.03]].forEach(([freq,yR,col,alpha]) => {
      cx.beginPath();
      for(let x=0;x<=W;x+=2){ const y=H*yR+Math.sin(x*freq+t)*22+Math.sin(x*freq*.5+t*.7)*14; x===0?cx.moveTo(x,y):cx.lineTo(x,y); }
      cx.strokeStyle=`rgba(${col},${alpha})`;cx.lineWidth=1.2;cx.stroke();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.hypot(dx,dy);
      if(d<100){cx.beginPath();cx.strokeStyle=`rgba(37,99,235,${(1-d/100)*.07})`;cx.lineWidth=.35;cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.stroke()}
    }
    pts.forEach(p => {
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fillStyle=`rgba(${p.hue},${p.a})`;cx.fill();
    });
    lines.forEach(l => {
      l.x-=l.speed;if(l.x+l.len<0)l.x=W*.6;
      cx.beginPath();cx.moveTo(l.x,l.y);cx.lineTo(l.x+l.len,l.y);cx.strokeStyle=`rgba(37,99,235,${l.a})`;cx.lineWidth=.5;cx.stroke();
    });
    requestAnimationFrame(frame);
  }
  frame();

  // ═══ CURSOR ═══
  const outer=document.getElementById('cur-outer'),ring=document.getElementById('cur-ring'),dot=document.getElementById('cur-dot'),lbl=document.getElementById('cur-label');
  let mx=200,my=200,rx=200,ry=200;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;const el=document.elementFromPoint(mx,my);const txt=el?.closest('[data-cursor]')?.dataset.cursor||'';lbl.textContent=txt;lbl.style.opacity=txt?'1':'0'});
  (function loop(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;outer.style.left=mx+'px';outer.style.top=my+'px';dot.style.left='0px';dot.style.top='0px';ring.style.left=(rx-mx)+'px';ring.style.top=(ry-my)+'px';requestAnimationFrame(loop)})();

  // ═══ SCROLL REVEAL ═══
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in') }), {threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // ═══ NAV ACTIVE STATE ═══
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();
