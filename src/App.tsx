import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  LayoutGrid, 
  Plus, 
  ArrowUpRight, 
  Globe, 
  Share2, 
  MessageSquare, 
  Zap, 
  Shield, 
  Cpu, 
  Layers,
  Search,
  Menu,
  X
} from 'lucide-react'

// --- Custom Components ---

const BentoCard = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number 
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      className={`bento-card group accent-glow ${className}`}
      style={{ 
        // @ts-ignore
        '--x': `${mousePos.x}px`, 
        // @ts-ignore
        '--y': `${mousePos.y}px` 
      } as any}
    >
      {children}
    </motion.div>
  )
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider uppercase bg-accent/10 text-accent rounded-full border border-accent/20 mb-4">
    {children}
  </span>
)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

  return (
    <div className="min-h-screen selection:bg-accent selection:text-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass-effect border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <LayoutGrid className="text-background w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">AXON</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Features', 'Pricing', 'Docs'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-text-main/60 hover:text-accent transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Search className="w-5 h-5 text-text-main/60" />
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
            Sign In
          </button>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          style={{ opacity, scale }}
          className="text-center mb-20"
        >
          <Badge>DASHBOARD</Badge>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            GRID
          </h1>
          <p className="text-xl md:text-2xl text-text-main/60 max-w-2xl mx-auto font-medium">
            Everything in its place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="group relative bg-accent text-background px-8 py-4 rounded-full font-bold text-lg overflow-hidden flex items-center gap-2">
              <span className="relative z-10">ADD +</span>
              <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4">
          {/* Main Feature */}
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-accent/20 to-transparent" delay={0.1}>
            <div>
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-background w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Hyper-fast Performance</h3>
              <p className="text-text-main/60 text-lg">Optimized for speed and scale. Experience near-zero latency with our global edge network.</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-text-main/40">+2.4k users</span>
            </div>
          </BentoCard>

          {/* Stats Card */}
          <BentoCard className="md:col-span-1" delay={0.2}>
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-text-main/40 uppercase tracking-wider">Uptime</p>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-4xl font-bold">99.9%</p>
            <div className="mt-4 flex items-end gap-1 h-12">
              {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: 0.3 + (i * 0.05), duration: 0.5 }}
                  className="flex-1 bg-accent/20 rounded-t-sm"
                />
              ))}
            </div>
          </BentoCard>

          {/* Security Card */}
          <BentoCard className="md:col-span-1" delay={0.3}>
            <Shield className="text-accent w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure by Default</h3>
            <p className="text-sm text-text-main/60">Enterprise-grade encryption for all your data at rest and in transit.</p>
          </BentoCard>

          {/* Integration Card */}
          <BentoCard className="md:col-span-2" delay={0.4}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/5" />
              <Layers className="text-accent w-6 h-6" />
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Connect Everywhere</h3>
            <div className="grid grid-cols-4 gap-4">
              {[Globe, Share2, MessageSquare, Cpu].map((Icon, i) => (
                <div key={i} className="aspect-square rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all cursor-pointer group">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
              ))}
            </div>
          </BentoCard>

          {/* System Card */}
          <BentoCard className="md:col-span-1 md:row-span-1" delay={0.5}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-main/40">Version</span>
                <span className="text-sm font-mono text-accent">v1.6.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-main/40">Region</span>
                <span className="text-sm font-mono text-white">us-east-1</span>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-accent" 
                  />
                </div>
                <p className="text-[10px] text-text-main/30 mt-2 uppercase tracking-widest">CPU Usage: 65%</p>
              </div>
            </div>
          </BentoCard>

          {/* Footer Card */}
          <BentoCard className="md:col-span-1 bg-accent group cursor-pointer" delay={0.6}>
            <div className="h-full flex flex-col justify-between text-background">
              <ArrowUpRight className="w-8 h-8 self-end transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div>
                <h3 className="text-xl font-bold">Start Building</h3>
                <p className="text-sm font-medium opacity-70">Join the revolution today.</p>
              </div>
            </div>
          </BentoCard>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
              <LayoutGrid className="text-white w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight opacity-60">AXON // 2026</span>
          </div>
          
          <div className="flex gap-8">
            {['Twitter', 'GitHub', 'Discord'].map((social) => (
              <a key={social} href="#" className="text-sm font-medium text-text-main/40 hover:text-accent transition-colors">
                {social}
              </a>
            ))}
          </div>

          <p className="text-sm text-text-main/20 font-mono">
            SYSTEM v1.6.0 — READY
          </p>
        </div>
      </footer>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>
    </div>
  )
}

export default App
