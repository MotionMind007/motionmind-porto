import { useState, useEffect } from 'react'
import { DataManager } from '../data'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save, Trash2, Plus, LogOut, Download, Upload, RotateCcw } from 'lucide-react'

// ══ AUTH ══
const PASS_KEY = 'motionmind_admin_pass'
const AUTH_KEY = 'motionmind_auth'
const SESSION_DURATION = 2 * 60 * 60 * 1000

function hashPass(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h = h & h }
  return 'mm_' + Math.abs(h).toString(36) + '_' + str.length
}

function isLoggedIn() {
  try {
    const s = JSON.parse(localStorage.getItem(AUTH_KEY))
    return s && Date.now() - s.timestamp < SESSION_DURATION
  } catch { return false }
}

// ══ MAIN ADMIN COMPONENT ══
export default function Admin() {
  const [authed, setAuthed] = useState(isLoggedIn())
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('profile')
  const [data, setData] = useState(DataManager.getAll())
  const [toast, setToast] = useState('')

  const show = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }
  const save = (newData) => { DataManager.saveAll(newData); setData(newData); show('Saved!') }

  const login = (e) => {
    e.preventDefault()
    const stored = localStorage.getItem(PASS_KEY) || hashPass('motionmind2025')
    if (hashPass(pass) === stored) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ timestamp: Date.now() }))
      setAuthed(true); setError('')
    } else { setError('Password salah'); setPass('') }
  }

  const logout = () => { localStorage.removeItem(AUTH_KEY); setAuthed(false) }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-100 px-4">
        <form onSubmit={login} className="glass-strong rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple mx-auto mb-4 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-blue/30">MM</div>
          <h2 className="font-heading font-bold text-xl mb-2">Admin Panel</h2>
          <p className="font-mono text-xs text-slate-500 mb-6">Masukkan password untuk akses</p>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" autoFocus
            className="w-full bg-dark-50 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white focus:border-brand-blue/50 focus:outline-none mb-3" />
          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple text-white font-heading font-bold text-sm hover:shadow-lg hover:shadow-brand-blue/30 transition-all">
            Login
          </button>
          {error && <p className="font-mono text-xs text-red-400 mt-3">{error}</p>}
          <p className="font-mono text-[10px] text-slate-600 mt-4">Default: motionmind2025</p>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      {toast && <div className="fixed top-4 right-4 z-[9999] glass-strong rounded-lg px-4 py-2.5 font-mono text-xs text-emerald-400 flex items-center gap-2">✓ {toast}</div>}

      {/* Header */}
      <div className="sticky top-0 z-50 glass-strong border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-mono text-xs text-slate-400 hover:text-brand-blue transition-colors flex items-center gap-1"><ArrowLeft size={14} /> Portfolio</Link>
          <span className="font-heading font-bold text-sm">Admin Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `mm-backup-${Date.now()}.json`; a.click() }} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors" title="Export"><Download size={16} /></button>
          <button onClick={logout} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors" title="Logout"><LogOut size={16} /></button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar tabs */}
        <div className="w-48 border-r border-white/5 p-3 hidden md:block min-h-[calc(100vh-52px)]">
          {['profile', 'projects', 'services', 'settings'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs capitalize transition-all ${tab === t ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{t}</button>
          ))}
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex border-b border-white/5 overflow-x-auto w-full fixed top-[52px] z-40 bg-dark-100 px-3 py-2 gap-1">
          {['profile', 'projects', 'services', 'settings'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-lg font-mono text-[10px] capitalize whitespace-nowrap ${tab === t ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-400'}`}>{t}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 max-w-3xl md:mt-0 mt-10">
          {tab === 'profile' && <ProfileTab data={data} save={save} />}
          {tab === 'projects' && <ProjectsTab data={data} save={save} />}
          {tab === 'services' && <ServicesTab data={data} save={save} />}
          {tab === 'settings' && <SettingsTab data={data} save={save} show={show} />}
        </div>
      </div>
    </div>
  )
}

// ══ PROFILE TAB ══
function ProfileTab({ data, save }) {
  const [p, setP] = useState(data.profile)
  const update = (k, v) => setP({ ...p, [k]: v })
  const submit = (e) => { e.preventDefault(); save({ ...data, profile: p }) }

  return (
    <form onSubmit={submit} className="space-y-6">
      <h2 className="font-heading font-bold text-lg">Profile</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" value={p.name} onChange={v => update('name', v)} />
        <Field label="Location" value={p.location} onChange={v => update('location', v)} />
      </div>
      <Field label="Description" value={p.description} onChange={v => update('description', v)} textarea />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" value={p.email} onChange={v => update('email', v)} />
        <Field label="WhatsApp" value={p.whatsapp} onChange={v => update('whatsapp', v)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="GitHub" value={p.github} onChange={v => update('github', v)} />
        <Field label="Instagram" value={p.instagram} onChange={v => update('instagram', v)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="WhatsApp Link" value={p.whatsappLink} onChange={v => update('whatsappLink', v)} />
        <Field label="GitHub Link" value={p.githubLink} onChange={v => update('githubLink', v)} />
      </div>
      <Field label="Instagram Link" value={p.instagramLink} onChange={v => update('instagramLink', v)} />
      <Btn type="submit"><Save size={14} /> Save Profile</Btn>
    </form>
  )
}

// ══ PROJECTS TAB ══
function ProjectsTab({ data, save }) {
  const [list, setList] = useState(data.projects)
  const add = () => setList([...list, { id: Date.now(), title: '', tech: '', badge: 'Web App', color: 'blue' }])
  const remove = (id) => setList(list.filter(p => p.id !== id))
  const update = (id, k, v) => setList(list.map(p => p.id === id ? { ...p, [k]: v } : p))
  const submit = () => save({ ...data, projects: list })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg">Projects</h2>
        <button onClick={add} className="flex items-center gap-1 font-mono text-xs text-brand-blue hover:text-white transition-colors"><Plus size={14} /> Add</button>
      </div>
      {list.map((p) => (
        <div key={p.id} className="glass rounded-xl p-4 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={p.title} onChange={v => update(p.id, 'title', v)} small />
            <Field label="Tech" value={p.tech} onChange={v => update(p.id, 'tech', v)} small />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Badge" value={p.badge} onChange={v => update(p.id, 'badge', v)} small />
            <Select label="Color" value={p.color} onChange={v => update(p.id, 'color', v)} options={['blue','purple','cyan','green']} />
            <div className="flex items-end"><button onClick={() => remove(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"><Trash2 size={14} /></button></div>
          </div>
        </div>
      ))}
      <Btn onClick={submit}><Save size={14} /> Save Projects</Btn>
    </div>
  )
}

// ══ SERVICES TAB ══
function ServicesTab({ data, save }) {
  const [list, setList] = useState(data.services)
  const add = () => setList([...list, { id: Date.now(), title: '', description: '', tags: [], color: 'blue', icon: 'Layout' }])
  const remove = (id) => setList(list.filter(s => s.id !== id))
  const update = (id, k, v) => setList(list.map(s => s.id === id ? { ...s, [k]: v } : s))
  const submit = () => save({ ...data, services: list })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg">Services</h2>
        <button onClick={add} className="flex items-center gap-1 font-mono text-xs text-brand-blue hover:text-white transition-colors"><Plus size={14} /> Add</button>
      </div>
      {list.map((s) => (
        <div key={s.id} className="glass rounded-xl p-4 space-y-3">
          <Field label="Title" value={s.title} onChange={v => update(s.id, 'title', v)} small />
          <Field label="Description" value={s.description} onChange={v => update(s.id, 'description', v)} small textarea />
          <Field label="Tags (comma)" value={(s.tags || []).join(', ')} onChange={v => update(s.id, 'tags', v.split(',').map(t => t.trim()).filter(Boolean))} small />
          <div className="grid grid-cols-3 gap-3">
            <Select label="Color" value={s.color} onChange={v => update(s.id, 'color', v)} options={['blue','purple','cyan','green']} />
            <Select label="Icon" value={s.icon} onChange={v => update(s.id, 'icon', v)} options={['Layout','Layers','Workflow','Bot']} />
            <div className="flex items-end"><button onClick={() => remove(s.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"><Trash2 size={14} /></button></div>
          </div>
        </div>
      ))}
      <Btn onClick={submit}><Save size={14} /> Save Services</Btn>
    </div>
  )
}

// ══ SETTINGS TAB ══
function SettingsTab({ data, save, show }) {
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [techStack, setTechStack] = useState((data.techStack || []).join(', '))
  const [marquee, setMarquee] = useState((data.marqueeItems || []).join(', '))

  const changePass = () => {
    if (newPass.length < 6) { show('Min 6 karakter'); return }
    if (newPass !== confirmPass) { show('Tidak cocok'); return }
    localStorage.setItem(PASS_KEY, hashPass(newPass))
    setNewPass(''); setConfirmPass(''); show('Password diubah!')
  }

  const saveMisc = () => {
    save({ ...data, techStack: techStack.split(',').map(s => s.trim()).filter(Boolean), marqueeItems: marquee.split(',').map(s => s.trim()).filter(Boolean) })
  }

  const reset = () => {
    if (confirm('Reset semua data ke default?')) { DataManager.reset(); window.location.reload() }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg">Change Password</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="New Password" value={newPass} onChange={setNewPass} type="password" />
          <Field label="Confirm" value={confirmPass} onChange={setConfirmPass} type="password" />
        </div>
        <Btn onClick={changePass}><Save size={14} /> Update Password</Btn>
      </div>
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg">Content</h2>
        <Field label="Tech Stack (comma)" value={techStack} onChange={setTechStack} />
        <Field label="Marquee Items (comma)" value={marquee} onChange={setMarquee} />
        <Btn onClick={saveMisc}><Save size={14} /> Save</Btn>
      </div>
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg text-red-400">Danger Zone</h2>
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs hover:bg-red-500/20 transition-colors"><RotateCcw size={14} /> Reset All Data</button>
      </div>
    </div>
  )
}

// ══ FORM HELPERS ══
function Field({ label, value, onChange, textarea, type = 'text', small }) {
  const cls = `w-full bg-dark-50 border border-white/10 rounded-lg px-3 py-2 ${small ? 'text-xs' : 'text-sm'} font-mono text-white focus:border-brand-blue/50 focus:outline-none transition-colors`
  return (
    <div>
      <label className="block font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      {textarea
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} className={`${cls} min-h-[70px] resize-y`} />
        : <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <select value={value || ''} onChange={e => onChange(e.target.value)} className="w-full bg-dark-50 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-brand-blue/50 focus:outline-none cursor-pointer">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Btn({ children, ...props }) {
  return <button {...props} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple text-white font-heading font-bold text-xs hover:shadow-lg hover:shadow-brand-blue/30 transition-all hover:-translate-y-0.5 cursor-pointer">{children}</button>
}
