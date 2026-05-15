import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft, ArrowUpRight, BarChart3, Camera, CheckCircle, Code2, Globe, Mail, MapPin, Menu, Palette, Phone, Play, Send, Star, TrendingUp, X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppData, fetchAppData, saveAppData, defaultData, ServiceRequest } from './store';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
const brandLogo = '/brand/nasaq-logo.svg';

const navItems = [
  { label: 'الرئيسية', id: 'home' },
  { label: 'من نحن', id: 'about' },
  { label: 'الخدمات', id: 'services' },
  { label: 'الأعمال', id: 'work' },
  { label: 'التواصل', id: 'contact' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function BrandLogo({ size = 'md', withText = true }: { size?: LogoSize; withText?: boolean }) {
  const sizes: Record<LogoSize, string> = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-28 w-28 md:h-36 md:w-36',
  };

  return (
    <div className="flex items-center gap-3">
      <img src={brandLogo} alt="شعار نسق كروب" className={`${sizes[size]} brand-mark-shadow object-contain`} />
      {withText && (
        <div className="leading-none">
          <div className="text-lg font-black tracking-tight text-white">NASAQ GROUP</div>
          <div className="mt-1 text-[10px] font-bold tracking-[0.25em] text-[#fff200]">KIRKUK</div>
        </div>
      )}
    </div>
  );
}

function SectionKicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black tracking-[0.18em] ${dark ? 'bg-[#123EAD]/10 text-[#123EAD]' : 'bg-white/10 text-[#fff200]'}`}>
      <span className={`h-2 w-2 rounded-full ${dark ? 'bg-[#123EAD]' : 'bg-[#fff200]'}`} />
      {children}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const iconMap: Record<string, ReactNode> = {
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Code2: <Code2 className="h-6 w-6" />,
  Camera: <Camera className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />
};

export default function MainSite() {
  const [data, setData] = useState<AppData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState('الكل');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  useEffect(() => {
    fetchAppData().then((fetchedData) => {
      setData(fetchedData);
      setIsLoaded(true);

      if (!sessionStorage.getItem('nasaq_visited')) {
        const updatedData = {
          ...fetchedData,
          analytics: {
            ...fetchedData.analytics,
            totalVisits: (fetchedData.analytics?.totalVisits || 0) + 1,
            lastVisit: new Date().toISOString()
          }
        };
        saveAppData(updatedData);
        setData(updatedData);
        sessionStorage.setItem('nasaq_visited', 'true');
      }
    });
  }, []);

  // Update categories dynamically from projects
  const uniqueCategories = Array.from(new Set(data.projects.map(p => p.category)));
  const filters = ['الكل', ...uniqueCategories];
  const filteredProjects = activeProject === 'الكل' ? data.projects : data.projects.filter(p => p.category === activeProject);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (data.testimonials.length === 0) return;
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % data.testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [data.testimonials.length]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const openRequest = (service = '') => {
    setSelectedService(service);
    setFormData((current) => ({ ...current, service }));
    setSent(false);
    setRequestOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service || selectedService,
      message: formData.message,
      date: new Date().toLocaleDateString('ar-IQ'),
      status: 'new'
    };

    const newData = {
      ...data,
      requests: [...data.requests, newRequest]
    };
    
    setData(newData);
    await saveAppData(newData);

    setRequestOpen(true);
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      setRequestOpen(false);
      setSelectedService('');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }, 2600);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#123EAD] text-white selection:bg-[#fff200] selection:text-[#123EAD]" dir="rtl">
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#123EAD]/90 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl' : 'bg-transparent py-5'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button onClick={() => scrollTo('home')} aria-label="العودة للرئيسية">
            <BrandLogo size="sm" />
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="rounded-full px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => openRequest()} className="hidden rounded-full bg-[#fff200] px-5 py-3 text-sm font-black text-[#123EAD] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(255,242,0,0.25)] sm:inline-flex">
              اطلب خدمة
            </button>
            <button onClick={() => setMenuOpen(true)} className="rounded-full border border-white/20 p-3 lg:hidden" aria-label="فتح القائمة">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }} className="fixed bottom-0 left-0 top-0 z-[91] w-[86%] max-w-sm bg-[#123EAD] p-7 shadow-2xl">
              <div className="mb-10 flex items-center justify-between">
                <BrandLogo size="sm" />
                <button onClick={() => setMenuOpen(false)} className="rounded-full bg-white/10 p-3" aria-label="إغلاق القائمة">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="rounded-2xl px-4 py-4 text-right text-xl font-black transition hover:bg-white/10">
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-10 border-t border-white/15 pt-7 text-sm text-white/70">
                <a href={`tel:${data.companyInfo.phone}`} className="mb-4 flex items-center gap-3 hover:text-[#fff200]">
                  <Phone className="h-5 w-5" /> <span dir="ltr">{data.companyInfo.phone}</span>
                </a>
                <a href={`https://www.instagram.com/${data.companyInfo.instagram.replace('@', '')}/`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#fff200]">
                  <InstagramIcon /> <span dir="ltr">{data.companyInfo.instagram}</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <section id="home" className="brand-grid relative flex min-h-screen items-center overflow-hidden bg-[#123EAD] px-5 pt-28">
        <div className="absolute inset-0 brand-noise opacity-40" />
        <motion.img
          src={brandLogo}
          alt=""
          initial={{ opacity: 0, scale: 0.75, rotate: -6 }}
          animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none absolute -left-16 bottom-4 h-[360px] w-[360px] object-contain md:-left-24 md:h-[560px] md:w-[560px]"
        />
        <div className="absolute right-8 top-32 h-40 w-40 rounded-full bg-[#fff200]/25 blur-3xl md:h-72 md:w-72" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 pb-20 md:grid-cols-[0.9fr_1.1fr] md:pb-28">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="mb-8">
              <BrandLogo size="xl" withText={false} />
            </motion.div>
            <motion.p variants={fadeUp} className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-[#fff200]">
              العراق - كركوك
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
              {data.content?.heroTitle1 || 'نسق كروب'}
              <span className="mt-4 block text-3xl leading-tight text-[#fff200] md:text-5xl">
                {data.content?.heroTitle2 || 'تسويق رقمي، حلول برمجية، وصناعة محتوى'}
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-8 text-white/78 md:text-xl">
              {data.content?.heroSubtitle || 'هوية موحدة، استراتيجية واضحة، وتنفيذ رقمي يساعد شركتك على الظهور والنمو وتحويل المتابعين إلى عملاء.'}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => scrollTo('services')} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#fff200] px-8 py-4 font-black text-[#123EAD] transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(255,242,0,0.32)]">
                استكشف الخدمات
                <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
              </button>
              <button onClick={() => scrollTo('work')} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-8 py-4 font-bold text-white transition hover:bg-white/10">
                <Play className="h-5 w-5 text-[#fff200]" />
                شاهد أعمالنا
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} className="relative hidden md:block">
            <div className="absolute inset-8 rounded-[48px] bg-[#fff200] blur-3xl opacity-25" />
            <div className="relative overflow-hidden rounded-[48px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <img src={brandLogo} alt="شعار نسق كروب" className="h-full w-full rounded-[34px] object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-white py-24 text-[#123EAD] md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-120px' }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid gap-16 md:grid-cols-[1.05fr_0.95fr] md:items-end">
            <div>
              <motion.div variants={fadeUp}>
                <SectionKicker dark>من نحن</SectionKicker>
              </motion.div>
              <motion.h2 variants={fadeUp} className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                {data.content?.aboutTitle || 'نرتب حضورك الرقمي بنفس قوة هويتك البصرية.'}
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="text-lg leading-9 text-[#123EAD]/75">
              <p>
                {data.content?.aboutText1 || 'نسق كروب شركة عراقية مقرها كركوك، متخصصة في التسويق الرقمي، الحلول البرمجية وصناعة المحتوى. نعمل مع أصحاب المشاريع والشركات لبناء حضور واضح ومؤثر يرفع الثقة ويزيد الطلبات.'}
              </p>
              <p className="mt-6">
                {data.content?.aboutText2 || 'نبدأ من فهم الهدف، ثم نصمم استراتيجية عملية، وننفذها بتصميم وهوية ومحتوى وبرمجة قابلة للقياس.'}
              </p>
            </motion.div>
          </motion.div>

          <div className="mt-20 grid gap-8 border-y border-[#123EAD]/15 py-12 md:grid-cols-4">
            {[
              ['185+', 'حملة ناجحة'],
              ['63+', 'عميل نشط'],
              ['285M', 'مشاهدة للمحتوى'],
              ['97%', 'رضا العملاء'],
            ].map(([value, label]) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center md:text-right">
                <div className="text-5xl font-black md:text-6xl" dir="ltr">{value}</div>
                <div className="mt-3 text-sm font-bold text-[#123EAD]/55">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#fff200] py-24 text-[#123EAD] md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionKicker dark>خدماتنا</SectionKicker>
              <h2 className="text-5xl font-black tracking-tight md:text-7xl">كل ما تحتاجه للنمو الرقمي.</h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-[#123EAD]/75">
              حلول متكاملة تناسب الشركات والأفراد مصممة كمنظومة واحدة: استراتيجية، محتوى، إعلان، وبرمجة.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.services.map((service, index) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 22 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.04 }} 
                className="group flex flex-col justify-between overflow-hidden rounded-[32px] border border-[#123EAD]/10 bg-white/50 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-[#123EAD]/5"
              >
                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#123EAD] text-[#fff200] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    {iconMap[service.iconName] || <Globe className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-4 text-2xl font-black">{service.title}</h3>
                  <p className="mb-8 leading-7 text-[#123EAD]/75">{service.description}</p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span key={feature} className="rounded-full bg-[#123EAD]/5 px-3 py-1.5 text-xs font-bold text-[#123EAD]/80 transition-colors group-hover:bg-[#123EAD]/10">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => openRequest(service.title)} className="inline-flex w-full items-center justify-between rounded-full bg-transparent px-6 py-4 font-black text-[#123EAD] ring-2 ring-[#123EAD]/10 transition-all hover:bg-[#123EAD] hover:text-[#fff200] hover:ring-[#123EAD]">
                  طلب الخدمة
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#123EAD] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionKicker>أعمالنا</SectionKicker>
              <h2 className="text-5xl font-black tracking-tight md:text-7xl">نتائج واضحة، لا وعود فقط.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button key={filter} onClick={() => setActiveProject(filter)} className={`rounded-full px-5 py-3 text-sm font-black transition ${activeProject === filter ? 'bg-[#fff200] text-[#123EAD]' : 'border border-white/18 text-white/75 hover:bg-white/10 hover:text-white'}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article key={project.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} className="group overflow-hidden rounded-[32px] bg-white text-[#123EAD] shadow-2xl shadow-black/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123EAD]/90 via-transparent to-transparent" />
                    <div className="absolute right-5 top-5 rounded-full bg-[#fff200] px-4 py-2 text-xs font-black text-[#123EAD]" dir="ltr">{project.result}</div>
                    <div className="absolute bottom-5 right-5 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur">{project.city}</div>
                  </div>
                  <div className="p-7">
                    <div className="mb-3 text-xs font-black tracking-[0.2em] text-[#123EAD]/45">{project.category}</div>
                    <h3 className="text-2xl font-black">{project.title}</h3>
                    <p className="mt-4 leading-7 text-[#123EAD]/70 line-clamp-2">{project.description}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {data.testimonials.length > 0 && (
        <section className="bg-[#123EAD] pb-24 md:pb-32">
          <div className="mx-auto max-w-5xl px-5 text-center md:px-8 border-t border-white/10 pt-24 md:pt-32">
            <SectionKicker>آراء العملاء</SectionKicker>
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIndex} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.4 }}>
                <div className="mb-7 flex justify-center gap-1 text-[#fff200]">
                  {[...Array(5)].map((_, index) => <Star key={index} className="h-6 w-6 fill-current" />)}
                </div>
                <p className="mx-auto max-w-4xl text-3xl font-black leading-relaxed md:text-5xl">
                  "{data.testimonials[testimonialIndex]?.quote}"
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <img src={data.testimonials[testimonialIndex]?.avatar} alt={data.testimonials[testimonialIndex]?.name} className="h-16 w-16 rounded-full object-cover ring-4 ring-[#fff200]" />
                  <div className="text-right">
                    <div className="font-black">{data.testimonials[testimonialIndex]?.name}</div>
                    <div className="text-sm text-white/65">{data.testimonials[testimonialIndex]?.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex justify-center gap-2">
              {data.testimonials.map((testimonial, index) => (
                <button key={testimonial.id} onClick={() => setTestimonialIndex(index)} aria-label={`عرض رأي ${testimonial.name}`} className={`h-2 rounded-full transition-all ${index === testimonialIndex ? 'w-10 bg-[#fff200]' : 'w-2 bg-white/35 hover:bg-white'}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="bg-[#fff200] py-24 text-[#123EAD] md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <SectionKicker dark>تواصل معنا</SectionKicker>
            <h2 className="text-5xl font-black leading-tight md:text-7xl">جاهز تبدأ مشروعك الرقمي؟</h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#123EAD]/75">
              املأ النموذج وسيتواصل فريق نسق كروب معك خلال 24 ساعة لوضع خطة تناسب هدفك وميزانيتك.
            </p>
            <div className="mt-12 space-y-4 text-base font-bold">
              <a href={`tel:${data.companyInfo.phone}`} className="flex items-center gap-3 hover:opacity-75"><Phone className="h-5 w-5" /> <span dir="ltr">{data.companyInfo.phone}</span></a>
              <a href={`mailto:${data.companyInfo.email}`} className="flex items-center gap-3 hover:opacity-75"><Mail className="h-5 w-5" /> {data.companyInfo.email}</a>
              <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /> {data.companyInfo.address}</div>
              <a href={`https://www.instagram.com/${data.companyInfo.instagram.replace('@', '')}/`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-75"><InstagramIcon /> <span dir="ltr">{data.companyInfo.instagram}</span></a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[36px] bg-[#123EAD] p-6 text-white shadow-[0_30px_90px_rgba(18,62,173,0.24)] md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <img src={brandLogo} alt="" className="h-14 w-14" />
              <div>
                <h3 className="text-2xl font-black">طلب خدمة</h3>
                <p className="text-sm text-white/60">أخبرنا بما تحتاجه وسنقترح أفضل حل.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-white/70">
                الاسم
                <input name="name" value={formData.name} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#fff200]" placeholder="اسمك الكامل" />
              </label>
              <label className="block text-sm font-bold text-white/70">
                رقم الهاتف
                <input name="phone" value={formData.phone} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#fff200]" placeholder="07xx xxx xxxx" />
              </label>
            </div>
            <label className="mt-5 block text-sm font-bold text-white/70">
              البريد الإلكتروني
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#fff200]" placeholder="your@email.com" />
            </label>
            <label className="mt-5 block text-sm font-bold text-white/70">
              الخدمة المطلوبة
              <select name="service" value={formData.service} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none transition focus:border-[#fff200]">
                <option value="" className="bg-[#123EAD]">اختر خدمة</option>
                {data.services.map((service) => <option key={service.id} value={service.title} className="bg-[#123EAD]">{service.title}</option>)}
              </select>
            </label>
            <label className="mt-5 block text-sm font-bold text-white/70">
              تفاصيل المشروع
              <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="mt-2 w-full resize-none rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#fff200]" placeholder="اكتب هدفك، نوع نشاطك، والخدمة التي تحتاجها..." />
            </label>
            <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#fff200] px-8 py-5 text-lg font-black text-[#123EAD] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(255,242,0,0.22)]">
              <Send className="h-5 w-5" /> إرسال الطلب
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#123EAD] py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <BrandLogo size="md" />
          <div className="text-sm leading-7 text-white/65">
            نسق كروب، {data.companyInfo.address}<br />
            تسويق رقمي، حلول برمجية، وصناعة محتوى
          </div>
          <div className="text-sm font-bold text-white/75">
            <a href="/#admin" className="hover:text-white mr-4 text-white/20 text-xs">Admin</a>
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {requestOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRequestOpen(false)} className="absolute inset-0 bg-[#123EAD]/75 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} className="relative w-full max-w-lg overflow-hidden rounded-[34px] bg-white text-[#123EAD] shadow-2xl">
              {sent ? (
                <div className="p-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff200]">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-black">تم استلام طلبك</h3>
                  <p className="mt-4 leading-7 text-[#123EAD]/70">سيتواصل معك فريق نسق كروب قريباً لمناقشة التفاصيل.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-7 md:p-9">
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img src={brandLogo} alt="" className="h-14 w-14" />
                      <div>
                        <h3 className="text-2xl font-black">طلب خدمة</h3>
                        <p className="text-sm text-[#123EAD]/60">{selectedService || 'اختر الخدمة المناسبة'}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setRequestOpen(false)} className="rounded-full bg-[#123EAD]/10 p-3" aria-label="إغلاق">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-2xl border border-[#123EAD]/15 px-5 py-4 outline-none focus:border-[#123EAD]" placeholder="الاسم الكامل" />
                    <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-2xl border border-[#123EAD]/15 px-5 py-4 outline-none focus:border-[#123EAD]" placeholder="رقم الهاتف" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-2xl border border-[#123EAD]/15 px-5 py-4 outline-none focus:border-[#123EAD]" placeholder="البريد الإلكتروني" />
                    {!selectedService && (
                      <select name="service" value={formData.service} onChange={handleChange} className="w-full rounded-2xl border border-[#123EAD]/15 px-5 py-4 outline-none focus:border-[#123EAD]">
                        <option value="">اختر الخدمة</option>
                        {data.services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                      </select>
                    )}
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full resize-none rounded-3xl border border-[#123EAD]/15 px-5 py-4 outline-none focus:border-[#123EAD]" placeholder="تفاصيل المشروع" />
                  </div>
                  <button type="submit" className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#123EAD] px-7 py-4 font-black text-white transition hover:bg-[#0f3494]">
                    <Send className="h-5 w-5" /> إرسال الطلب
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
