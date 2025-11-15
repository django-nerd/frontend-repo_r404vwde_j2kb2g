import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Search, Settings, Heart, Filter, DollarSign, MapPin, Gauge, Sparkles, PhoneCall, Send, Star, Shield, Menu } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-black/5 shadow">{children}</span>
  )
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow">
      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white"><Icon size={18} /></div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-semibold text-slate-800">{value}</div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[72vh] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 items-center gap-10 py-16">
        <div className="max-w-xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge><Sparkles size={14} /> Clean & Modern</Badge>
            <Badge><Shield size={14} /> Trusted Sellers</Badge>
            <Badge><Star size={14} /> Smart Matching</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Find your next ride with style
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            A vibrant auto marketplace with real-time search, dealer profiles, and delightful animations. Buy, sell, and fall in love with cars.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#browse" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold shadow hover:scale-[1.01] active:scale-[0.99] transition">
              <Search size={18} /> Browse cars
            </a>
            <a href="#sell" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 ring-1 ring-black/10 px-5 py-3 font-semibold shadow hover:scale-[1.01] active:scale-[0.99] transition">
              <Car size={18} /> Sell a car
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <Stat label="Verified Dealers" value="1.2k" icon={Shield} />
            <Stat label="Listed Cars" value="24k" icon={Car} />
            <Stat label="Avg. Rating" value="4.8" icon={Star} />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
          <SearchPanel />
        </motion.div>
      </div>
    </section>
  )
}

function SearchPanel() {
  const [filters, setFilters] = useState({ q: '', min: '', max: '' })
  const [loading, setLoading] = useState(false)
  const [cars, setCars] = useState([])

  const fetchCars = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.q) params.append('make', filters.q)
      if (filters.min) params.append('min_price', filters.min)
      if (filters.max) params.append('max_price', filters.max)
      const res = await fetch(`${API_BASE}/api/cars?${params.toString()}`)
      const data = await res.json()
      setCars(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCars() }, [])

  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 shadow-xl p-6 w-full max-w-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0 p-2 rounded-lg bg-slate-900 text-white"><Filter size={18} /></div>
        <div>
          <div className="text-xs text-slate-500">Quick search</div>
          <div className="text-lg font-semibold text-slate-800">Find your perfect match</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="col-span-1 sm:col-span-3 flex gap-2 items-center rounded-xl ring-1 ring-black/10 px-3 py-2 bg-white">
          <Search className="text-slate-400" size={16} />
          <input value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} placeholder="Make (e.g. Tesla)" className="w-full outline-none text-sm py-2" />
        </div>
        <div className="flex items-center gap-2 rounded-xl ring-1 ring-black/10 px-3 py-2 bg-white">
          <DollarSign className="text-slate-400" size={16} />
          <input value={filters.min} onChange={(e) => setFilters({ ...filters, min: e.target.value })} placeholder="Min" className="w-full outline-none text-sm py-2" />
        </div>
        <div className="flex items-center gap-2 rounded-xl ring-1 ring-black/10 px-3 py-2 bg-white">
          <DollarSign className="text-slate-400" size={16} />
          <input value={filters.max} onChange={(e) => setFilters({ ...filters, max: e.target.value })} placeholder="Max" className="w-full outline-none text-sm py-2" />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button onClick={fetchCars} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow hover:scale-[1.01] active:scale-[0.99] transition">
          <Search size={16} /> Search
        </button>
        <a href="/test" className="text-xs text-slate-500 hover:text-slate-700">Check backend</a>
      </div>

      <div className="mt-6 grid gap-3 max-h-72 overflow-auto pr-1">
        <AnimatePresence initial={false}>
          {loading ? (
            <div className="text-center text-slate-500 text-sm py-6">Loading cars…</div>
          ) : cars.length === 0 ? (
            <div className="text-center text-slate-500 text-sm py-6">No cars found. Try seeding in backend or change filters.</div>
          ) : (
            cars.map((c) => <CarCard key={c.id} car={c} />)
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CarCard({ car }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="group p-3 rounded-xl ring-1 ring-black/5 bg-white hover:bg-white/90 backdrop-blur shadow hover:shadow-md transition">
      <div className="flex gap-3">
        <div className="w-28 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
          {car.photos && car.photos[0] ? (
            <img src={`${car.photos[0]}?auto=format&fit=crop&w=320&q=60`} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-slate-400"><Car size={24} /></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-slate-900 truncate">{car.year} {car.make} {car.model}</h3>
            <div className="text-slate-900 font-bold">${Intl.NumberFormat().format(car.price)}</div>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            {car.mileage != null && (<span className="inline-flex items-center gap-1"><Gauge size={14}/> {Intl.NumberFormat().format(car.mileage)} mi</span>)}
            {car.location && (<span className="inline-flex items-center gap-1"><MapPin size={14}/> {car.location}</span>)}
            {car.fuel_type && (<span className="inline-flex items-center gap-1"><FuelIcon /> {car.fuel_type}</span>)}
          </div>
          {car.features?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((f, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 ring-1 ring-black/5">{f}</span>
              ))}
            </div>
          )}
        </div>
        <button className="shrink-0 p-2 rounded-lg ring-1 ring-black/10 text-slate-600 hover:text-red-500 hover:ring-red-200 transition"><Heart size={16} /></button>
      </div>
    </motion.div>
  )
}

function FuelIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
      <path d="M16 3v5a1 1 0 001 1h1v7a3 3 0 11-6 0V9a1 1 0 011-1h2a1 1 0 001-1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 12h4M7 16h4M7 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Features() {
  const items = [
    { icon: <Shield className="text-indigo-600" />, title: 'Verified Dealers', desc: 'All sellers pass multi-step verification and reviews.' },
    { icon: <Sparkles className="text-violet-600" />, title: 'AI Smart Search', desc: 'Get instant matches with rich filters and ranking.' },
    { icon: <PhoneCall className="text-blue-600" />, title: '1-click Contact', desc: 'Message dealers with templated inquiries.' },
  ]
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50" id="browse">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-white ring-1 ring-black/5 shadow">
              <div className="w-10 h-10 rounded-lg bg-white grid place-items-center mb-3">{it.icon}</div>
              <div className="text-lg font-semibold text-slate-800">{it.title}</div>
              <p className="text-sm text-slate-600 mt-1">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const [lead, setLead] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, car_id: 'general' })
      })
      if (res.ok) setSent(true)
    } catch (e) { console.error(e) }
  }

  return (
    <section className="py-20 bg-slate-900 text-white" id="sell">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Sell faster with smart tools</h2>
          <p className="mt-4 text-white/70">Create listings in seconds, broadcast to buyers, and manage leads in one place.</p>
          <ul className="mt-6 space-y-2 text-white/80 text-sm">
            <li className="flex gap-2 items-start"><Star className="mt-0.5" size={16}/> Priority placement and highlights</li>
            <li className="flex gap-2 items-start"><Settings className="mt-0.5" size={16}/> Dealer dashboard and analytics</li>
            <li className="flex gap-2 items-start"><Shield className="mt-0.5" size={16}/> Fraud protection and escrow options</li>
          </ul>
        </div>
        <div>
          {sent ? (
            <div className="p-6 rounded-2xl bg-white/10 ring-1 ring-white/20">
              <div className="text-lg font-semibold">Thanks! We’ll be in touch.</div>
              <p className="text-white/70 text-sm">Our team received your request.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 rounded-2xl bg-white/10 ring-1 ring-white/20 space-y-3">
              <div className="flex gap-2 items-center rounded-xl bg-white/90 text-slate-900 px-3 py-2"><input required value={lead.name} onChange={(e)=>setLead({ ...lead, name: e.target.value })} placeholder="Your name" className="bg-transparent outline-none w-full py-1"/></div>
              <div className="flex gap-2 items-center rounded-xl bg-white/90 text-slate-900 px-3 py-2"><input required type="email" value={lead.email} onChange={(e)=>setLead({ ...lead, email: e.target.value })} placeholder="Email" className="bg-transparent outline-none w-full py-1"/></div>
              <div className="flex gap-2 items-center rounded-xl bg-white/90 text-slate-900 px-3 py-2"><input value={lead.phone} onChange={(e)=>setLead({ ...lead, phone: e.target.value })} placeholder="Phone (optional)" className="bg-transparent outline-none w-full py-1"/></div>
              <div className="flex gap-2 items-center rounded-xl bg-white/90 text-slate-900 px-3 py-2"><input value={lead.message} onChange={(e)=>setLead({ ...lead, message: e.target.value })} placeholder="Message" className="bg-transparent outline-none w-full py-1"/></div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-4 py-2 font-semibold shadow hover:scale-[1.01] active:scale-[0.99] transition"><Send size={16}/> Send</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="py-10 bg-white border-t border-slate-200">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-slate-600 text-sm">© {new Date().getFullYear()} Auto Trader — Crafted with care.</div>
        <div className="flex items-center gap-3 text-slate-500">
          <a href="#browse" className="hover:text-slate-700 text-sm">Browse</a>
          <a href="#sell" className="hover:text-slate-700 text-sm">Sell</a>
          <a href="/test" className="hover:text-slate-700 text-sm">System Check</a>
        </div>
      </div>
    </footer>
  )
}

function Navbar(){
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-3 mt-3 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="inline-flex items-center gap-2 font-black text-slate-900">
            <div className="w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white"><Car size={18}/></div>
            Auto Trader
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#browse" className="hover:text-slate-900">Browse</a>
            <a href="#sell" className="hover:text-slate-900">Sell</a>
            <a href="/test" className="hover:text-slate-900">System</a>
          </nav>
          <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-lg ring-1 ring-black/10"><Menu size={18}/></button>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200 px-4 py-3 flex flex-col gap-2 text-sm">
            <a onClick={()=>setOpen(false)} href="#browse">Browse</a>
            <a onClick={()=>setOpen(false)} href="#sell">Sell</a>
            <a onClick={()=>setOpen(false)} href="/test">System</a>
          </div>
        )}
      </div>
    </header>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}
