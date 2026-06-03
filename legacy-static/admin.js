// ══ MOTIONMIND ADMIN PANEL ══

// ═══ AUTH SYSTEM ═══
const AUTH_KEY = 'motionmind_auth';
const PASS_KEY = 'motionmind_admin_pass';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours

// Hash password (simple but effective for client-side)
function hashPassword(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'mm_' + Math.abs(hash).toString(36) + '_' + str.length;
}

function getStoredHash() {
  return localStorage.getItem(PASS_KEY) || hashPassword('motionmind2025');
}

function isLoggedIn() {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return false;
  try {
    const data = JSON.parse(session);
    if (Date.now() - data.timestamp > SESSION_DURATION) {
      localStorage.removeItem(AUTH_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function attemptLogin(e) {
  e.preventDefault();
  const input = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  if (!input) {
    errorEl.textContent = 'Password tidak boleh kosong';
    errorEl.classList.add('show');
    return;
  }

  if (hashPassword(input) === getStoredHash()) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ timestamp: Date.now() }));
    showAdmin();
    errorEl.classList.remove('show');
  } else {
    errorEl.textContent = 'Password salah. Coba lagi.';
    errorEl.classList.add('show');
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  location.reload();
}

function showAdmin() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('admin-layout').classList.remove('locked');
  initAdmin();
}

function changePassword() {
  const newPass = document.getElementById('st-new-password').value;
  const confirmPass = document.getElementById('st-confirm-password').value;

  if (newPass.length < 6) {
    showToast('Password minimal 6 karakter', 'error');
    return;
  }
  if (newPass !== confirmPass) {
    showToast('Password tidak cocok', 'error');
    return;
  }

  localStorage.setItem(PASS_KEY, hashPassword(newPass));
  document.getElementById('st-new-password').value = '';
  document.getElementById('st-confirm-password').value = '';
  showToast('Password berhasil diubah!');
}

// ═══ MOBILE SIDEBAR ═══
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('mobile-menu-btn');
  if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !btn.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// ═══ INITIALIZATION ═══
document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    showAdmin();
  }
});

function initAdmin() {
  renderDashboard();
  loadProfile();
  renderProjects();
  renderServices();
  loadSettings();

  // Tab navigation
  document.querySelectorAll('.sidebar-link[data-tab]').forEach(link => {
    link.addEventListener('click', () => {
      switchTab(link.dataset.tab);
      // Close sidebar on mobile
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}

// ═══ TAB SWITCHING ═══
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');
  const sidebarLink = document.querySelector(`[data-tab="${tabName}"]`);
  if (sidebarLink) sidebarLink.classList.add('active');
}

// ═══ TOAST ═══
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.className = `toast show toast-${type}`;
  toast.innerHTML = `${type === 'success' ? '✓' : '✕'} ${message}`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ═══ MODAL ═══
function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// ═══ HTML ESCAPE (for safe rendering in admin) ═══
function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

// ═══ DASHBOARD ═══
function renderDashboard() {
  const data = DataManager.getAll();
  const statsEl = document.getElementById('dashboard-stats');
  const stats = [
    { label: 'Projects', value: data.projects.length, color: 'blue' },
    { label: 'Services', value: data.services.length, color: 'purple' },
    { label: 'Tech Stack', value: (data.techStack || DEFAULT_DATA.techStack).length, color: 'cyan' },
    { label: 'Status', value: data.profile.available ? 'Active' : 'Busy', color: 'green' }
  ];
  statsEl.innerHTML = stats.map(s => `
    <div style="background:var(--b1);border:1px solid var(--border);border-radius:12px;padding:18px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">${esc(s.label)}</div>
      <div style="font-size:1.5rem;font-weight:900">${esc(String(s.value))}</div>
    </div>
  `).join('');
}

// ═══ PROFILE ═══
function loadProfile() {
  const p = DataManager.getProfile();
  document.getElementById('pf-name').value = p.name || '';
  document.getElementById('pf-location').value = p.location || '';
  document.getElementById('pf-description').value = p.description || '';
  document.getElementById('pf-timezone').value = p.timezone || '';
  document.getElementById('pf-specialties').value = (p.specialties || []).join(', ');
  document.getElementById('pf-email').value = p.email || '';
  document.getElementById('pf-whatsapp').value = p.whatsapp || '';
  document.getElementById('pf-whatsappLink').value = p.whatsappLink || '';
  document.getElementById('pf-github').value = p.github || '';
  document.getElementById('pf-githubLink').value = p.githubLink || '';
  document.getElementById('pf-instagram').value = p.instagram || '';
  document.getElementById('pf-instagramLink').value = p.instagramLink || '';
  document.getElementById('pf-stat-projects').value = p.stats?.projects || '';
  document.getElementById('pf-stat-automations').value = p.stats?.automations || '';
  document.getElementById('pf-stat-years').value = p.stats?.years || '';
  document.getElementById('pf-stat-committed').value = p.stats?.committed || '';

  const toggle = document.getElementById('pf-available');
  if (p.available) toggle.classList.add('on');
  else toggle.classList.remove('on');
}

function saveProfile(e) {
  e.preventDefault();
  const profile = {
    name: document.getElementById('pf-name').value.trim(),
    location: document.getElementById('pf-location').value.trim(),
    description: document.getElementById('pf-description').value.trim(),
    timezone: document.getElementById('pf-timezone').value.trim(),
    specialties: document.getElementById('pf-specialties').value.split(',').map(s => s.trim()).filter(Boolean),
    available: document.getElementById('pf-available').classList.contains('on'),
    email: document.getElementById('pf-email').value.trim(),
    whatsapp: document.getElementById('pf-whatsapp').value.trim(),
    whatsappLink: document.getElementById('pf-whatsappLink').value.trim(),
    github: document.getElementById('pf-github').value.trim(),
    githubLink: document.getElementById('pf-githubLink').value.trim(),
    instagram: document.getElementById('pf-instagram').value.trim(),
    instagramLink: document.getElementById('pf-instagramLink').value.trim(),
    stats: {
      projects: document.getElementById('pf-stat-projects').value.trim(),
      automations: document.getElementById('pf-stat-automations').value.trim(),
      years: document.getElementById('pf-stat-years').value.trim(),
      committed: document.getElementById('pf-stat-committed').value.trim()
    }
  };
  DataManager.saveProfile(profile);
  showToast('Profile saved!');
  renderDashboard();
}

// ═══ PROJECTS ═══
function renderProjects() {
  const projects = DataManager.getProjects();
  const tbody = document.getElementById('projects-tbody');
  if (projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:30px">No projects yet</td></tr>`;
    return;
  }
  tbody.innerHTML = projects.map((p, i) => `
    <tr>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--muted)">${String(i+1).padStart(2,'0')}</td>
      <td style="font-weight:600">${esc(p.title)}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted)">${esc(p.tech)}</td>
      <td><span class="badge badge-${(p.badgeClass||'').replace('b-','')}">${esc(p.badge)}</span></td>
      <td class="actions">
        <button class="btn btn-ghost" onclick="editProject(${p.id})" style="padding:5px 10px;font-size:.7rem">Edit</button>
        <button class="btn btn-danger" onclick="deleteProject(${p.id})" style="padding:5px 10px;font-size:.7rem">Del</button>
      </td>
    </tr>
  `).join('');
}

function openProjectModal(project = null) {
  const isEdit = project !== null;
  openModal(`
    <h3>${isEdit ? 'Edit' : 'Add'} Project</h3>
    <div class="form-row full">
      <div class="form-group"><label>Title</label><input type="text" id="modal-proj-title" value="${isEdit ? esc(project.title) : ''}"></div>
    </div>
    <div class="form-row full">
      <div class="form-group"><label>Technologies</label><input type="text" id="modal-proj-tech" value="${isEdit ? esc(project.tech) : ''}" placeholder="next.js · supabase · websockets"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Badge Text</label><input type="text" id="modal-proj-badge" value="${isEdit ? esc(project.badge) : ''}" placeholder="Web App"></div>
      <div class="form-group">
        <label>Badge Style</label>
        <select id="modal-proj-badgeClass">
          <option value="b-web" ${isEdit && project.badgeClass === 'b-web' ? 'selected' : ''}>Web (Blue)</option>
          <option value="b-ai" ${isEdit && project.badgeClass === 'b-ai' ? 'selected' : ''}>AI (Purple)</option>
          <option value="b-auto" ${isEdit && project.badgeClass === 'b-auto' ? 'selected' : ''}>Automation (Cyan)</option>
        </select>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveProjectFromModal(${isEdit ? project.id : 'null'})">${isEdit ? 'Update' : 'Add'}</button>
    </div>
  `);
}

function saveProjectFromModal(existingId) {
  const title = document.getElementById('modal-proj-title').value.trim();
  const tech = document.getElementById('modal-proj-tech').value.trim();
  const badge = document.getElementById('modal-proj-badge').value.trim();
  const badgeClass = document.getElementById('modal-proj-badgeClass').value;

  if (!title) { showToast('Title required', 'error'); return; }

  if (existingId) {
    const data = DataManager.getAll();
    const idx = data.projects.findIndex(p => p.id === existingId);
    if (idx !== -1) {
      data.projects[idx] = { ...data.projects[idx], title, tech, badge, badgeClass };
      DataManager.saveAll(data);
    }
  } else {
    DataManager.addProject({ title, tech, badge, badgeClass });
  }

  closeModal();
  renderProjects();
  renderDashboard();
  showToast(existingId ? 'Project updated!' : 'Project added!');
}

function editProject(id) {
  const project = DataManager.getProjects().find(p => p.id === id);
  if (project) openProjectModal(project);
}

function deleteProject(id) {
  if (confirm('Delete this project?')) {
    DataManager.deleteProject(id);
    renderProjects();
    renderDashboard();
    showToast('Project deleted');
  }
}

// ═══ SERVICES ═══
function renderServices() {
  const services = DataManager.getServices();
  const tbody = document.getElementById('services-tbody');
  if (services.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:30px">No services yet</td></tr>`;
    return;
  }
  tbody.innerHTML = services.map((s, i) => `
    <tr>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--muted)">${esc(s.number) || String(i+1).padStart(2,'0')}</td>
      <td style="font-weight:600">${esc(s.title)}</td>
      <td style="font-size:.75rem;color:var(--muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(s.description)}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--violet)">${(s.tags||[]).slice(0,3).map(t=>esc(t)).join(', ')}</td>
      <td class="actions">
        <button class="btn btn-ghost" onclick="editService(${s.id})" style="padding:5px 10px;font-size:.7rem">Edit</button>
        <button class="btn btn-danger" onclick="deleteService(${s.id})" style="padding:5px 10px;font-size:.7rem">Del</button>
      </td>
    </tr>
  `).join('');
}

function openServiceModal(service = null) {
  const isEdit = service !== null;
  openModal(`
    <h3>${isEdit ? 'Edit' : 'Add'} Service</h3>
    <div class="form-row">
      <div class="form-group"><label>Number</label><input type="text" id="modal-svc-number" value="${isEdit ? esc(service.number) : ''}" placeholder="01"></div>
      <div class="form-group"><label>Title</label><input type="text" id="modal-svc-title" value="${isEdit ? esc(service.title) : ''}"></div>
    </div>
    <div class="form-row full">
      <div class="form-group"><label>Description</label><textarea id="modal-svc-description">${isEdit ? esc(service.description) : ''}</textarea></div>
    </div>
    <div class="form-row full">
      <div class="form-group"><label>Tags (comma separated)</label><input type="text" id="modal-svc-tags" value="${isEdit ? (service.tags||[]).join(', ') : ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Grid Span</label>
        <select id="modal-svc-span">
          <option value="7" ${isEdit && service.span === 7 ? 'selected' : ''}>Large (7)</option>
          <option value="5" ${isEdit && service.span === 5 ? 'selected' : ''}>Small (5)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Icon Color</label>
        <select id="modal-svc-color">
          <option value="cyan" ${isEdit && service.iconColor === 'cyan' ? 'selected' : ''}>Cyan</option>
          <option value="violet" ${isEdit && service.iconColor === 'violet' ? 'selected' : ''}>Violet</option>
        </select>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveServiceFromModal(${isEdit ? service.id : 'null'})">${isEdit ? 'Update' : 'Add'}</button>
    </div>
  `);
}

function saveServiceFromModal(existingId) {
  const number = document.getElementById('modal-svc-number').value.trim();
  const title = document.getElementById('modal-svc-title').value.trim();
  const description = document.getElementById('modal-svc-description').value.trim();
  const tags = document.getElementById('modal-svc-tags').value.split(',').map(t => t.trim()).filter(Boolean);
  const span = parseInt(document.getElementById('modal-svc-span').value);
  const iconColor = document.getElementById('modal-svc-color').value;

  if (!title) { showToast('Title required', 'error'); return; }

  if (existingId) {
    const data = DataManager.getAll();
    const idx = data.services.findIndex(s => s.id === existingId);
    if (idx !== -1) {
      data.services[idx] = { ...data.services[idx], number, title, description, tags, span, iconColor };
      DataManager.saveAll(data);
    }
  } else {
    DataManager.addService({ number, title, description, tags, span, iconColor });
  }

  closeModal();
  renderServices();
  renderDashboard();
  showToast(existingId ? 'Service updated!' : 'Service added!');
}

function editService(id) {
  const service = DataManager.getServices().find(s => s.id === id);
  if (service) openServiceModal(service);
}

function deleteService(id) {
  if (confirm('Delete this service?')) {
    DataManager.deleteService(id);
    renderServices();
    renderDashboard();
    showToast('Service deleted');
  }
}

// ═══ SETTINGS ═══
function loadSettings() {
  const data = DataManager.getAll();
  document.getElementById('st-marquee1').value = (data.marquee1 || DEFAULT_DATA.marquee1).join(', ');
  document.getElementById('st-marquee2').value = (data.marquee2 || DEFAULT_DATA.marquee2).join(', ');
  document.getElementById('st-techstack').value = (data.techStack || DEFAULT_DATA.techStack).join(', ');
}

function saveSettings() {
  const data = DataManager.getAll();
  data.marquee1 = document.getElementById('st-marquee1').value.split(',').map(s => s.trim()).filter(Boolean);
  data.marquee2 = document.getElementById('st-marquee2').value.split(',').map(s => s.trim()).filter(Boolean);
  DataManager.saveAll(data);
  showToast('Marquee saved!');
}

function saveTechStack() {
  const data = DataManager.getAll();
  data.techStack = document.getElementById('st-techstack').value.split(',').map(s => s.trim()).filter(Boolean);
  DataManager.saveAll(data);
  showToast('Tech stack saved!');
}

// ═══ IMPORT/EXPORT ═══
function exportData() {
  const data = DataManager.getAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `motionmind-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Data exported!');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.profile && data.projects && data.services) {
        DataManager.saveAll(data);
        showToast('Data imported!');
        setTimeout(() => location.reload(), 500);
      } else {
        showToast('Invalid format', 'error');
      }
    } catch {
      showToast('Invalid JSON file', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ═══ RESET ═══
function confirmReset() {
  if (confirm('Reset ALL data to defaults? Cannot be undone.')) {
    DataManager.reset();
    showToast('Data reset!');
    setTimeout(() => location.reload(), 500);
  }
}
