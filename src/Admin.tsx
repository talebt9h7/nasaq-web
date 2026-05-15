import { useState, useEffect } from 'react';
import { 
  Inbox, Settings, LayoutDashboard, Briefcase, FileText, 
  Trash2, LogOut, Check, Plus, Edit2, X, Save, Users, MousePointer, Activity
} from 'lucide-react';
import { AppData, fetchAppData, saveAppData, defaultData, ServiceRequest, Project, Service } from './store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<AppData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'requests' | 'projects' | 'services' | 'testimonials' | 'content' | 'settings'>('dashboard');

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppData().then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const save = async (newData: AppData) => {
    setData(newData);
    await saveAppData(newData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nasaq2026') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-[#123EAD]">لوحة تحكم نسق كروب</h1>
            <p className="text-gray-500 mt-2 text-sm">أدخل كلمة المرور للدخول</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور (nasaq2026)"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#123EAD] text-left"
              dir="ltr"
            />
            <button className="w-full py-4 bg-[#123EAD] text-white font-bold rounded-2xl hover:bg-blue-800 transition">
              تسجيل الدخول
            </button>
            <a href="/" className="block text-center text-sm text-gray-500 hover:text-[#123EAD] mt-4">
              العودة للموقع
            </a>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#123EAD] text-xl font-black">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-[#123EAD] text-white flex flex-col fixed inset-y-0 right-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-black text-[#fff200]">NASAQ Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'dashboard' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> الإحصائيات
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'requests' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Inbox className="w-5 h-5" /> الطلبات 
            {data.requests.filter(r => r.status === 'new').length > 0 && (
              <span className="mr-auto bg-[#fff200] text-[#123EAD] text-xs px-2 py-0.5 rounded-full">
                {data.requests.filter(r => r.status === 'new').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'projects' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Briefcase className="w-5 h-5" /> الأعمال
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'services' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <FileText className="w-5 h-5" /> الخدمات
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'testimonials' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Users className="w-5 h-5" /> آراء العملاء
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'content' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Edit2 className="w-5 h-5" /> النصوص والمحتوى
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'settings' ? 'bg-white/15 text-[#fff200]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Settings className="w-5 h-5" /> الإعدادات
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => window.location.href = '/'} className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition">
            <LogOut className="w-4 h-4" /> خروج للموقع
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-64 p-10 pb-20">
        {activeTab === 'dashboard' && <DashboardTab data={data} />}
        {activeTab === 'requests' && <RequestsTab data={data} save={save} />}
        {activeTab === 'settings' && <SettingsTab data={data} save={save} />}
        {activeTab === 'projects' && <ProjectsTab data={data} save={save} />}
        {activeTab === 'services' && <ServicesTab data={data} save={save} />}
        {activeTab === 'testimonials' && <TestimonialsTab data={data} save={save} />}
        {activeTab === 'content' && <ContentTab data={data} save={save} />}
      </main>
    </div>
  );
}

// -----------------------------------------------------
// DASHBOARD TAB
// -----------------------------------------------------
function DashboardTab({ data }: { data: AppData }) {
  // Mock chart data based on totalVisits
  const chartData = [
    { name: 'السبت', visits: Math.round(data.analytics.totalVisits * 0.05) },
    { name: 'الأحد', visits: Math.round(data.analytics.totalVisits * 0.15) },
    { name: 'الإثنين', visits: Math.round(data.analytics.totalVisits * 0.12) },
    { name: 'الثلاثاء', visits: Math.round(data.analytics.totalVisits * 0.18) },
    { name: 'الأربعاء', visits: Math.round(data.analytics.totalVisits * 0.14) },
    { name: 'الخميس', visits: Math.round(data.analytics.totalVisits * 0.21) },
    { name: 'الجمعة', visits: Math.round(data.analytics.totalVisits * 0.15) },
  ];

  const pieData = [
    { name: 'بحث جوجل', value: 400 },
    { name: 'إنستغرام', value: 300 },
    { name: 'زيارة مباشرة', value: 200 },
    { name: 'أخرى', value: 100 },
  ];
  const COLORS = ['#123EAD', '#fff200', '#00C49F', '#FF8042'];

  const conversionRate = data.analytics.totalVisits > 0 
    ? ((data.requests.length / data.analytics.totalVisits) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#123EAD]">لوحة الإحصائيات</h2>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          آخر تحديث: {new Date(data.analytics.lastVisit).toLocaleTimeString('ar-IQ')}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-[#123EAD]" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-500 mb-1">إجمالي الزوار</div>
            <div className="text-2xl font-black">{data.analytics.totalVisits.toLocaleString('en-US')}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Inbox className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-500 mb-1">طلبات الخدمة</div>
            <div className="text-2xl font-black">{data.requests.length}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-500 mb-1">معدل التحويل (الطلبات/الزوار)</div>
            <div className="text-2xl font-black">{conversionRate}%</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-500 mb-1">مشاريع في المعرض</div>
            <div className="text-2xl font-black">{data.projects.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-black mb-6">الزيارات خلال الأسبوع</h3>
          <div className="h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#123EAD" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#123EAD" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#123EAD', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="visits" name="عدد الزيارات" stroke="#123EAD" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-black mb-6">مصادر الزيارات</h3>
          <div className="h-[250px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-xs font-bold text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Requests Preview */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-black mb-6 flex items-center justify-between">
          أحدث الطلبات
        </h3>
        {data.requests.length === 0 ? (
          <div className="text-center py-8 text-gray-400 font-bold">لا توجد طلبات بعد</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {data.requests.slice().reverse().slice(0, 5).map(req => (
              <div key={req.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-bold">{req.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{req.service}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">{req.date}</div>
                  {req.status === 'new' ? (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">جديد</span>
                  ) : (
                    <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs font-bold">مقروء</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// REQUESTS TAB
// -----------------------------------------------------
function RequestsTab({ data, save }: { data: AppData, save: (d: AppData) => void }) {
  const markAsRead = (id: string) => {
    save({
      ...data,
      requests: data.requests.map(r => r.id === id ? { ...r, status: 'read' } : r)
    });
  };

  const deleteRequest = (id: string) => {
    if(window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      save({ ...data, requests: data.requests.filter(r => r.id !== id) });
    }
  };

  if (data.requests.length === 0) {
    return <div className="text-center py-20 text-gray-400 font-bold text-xl">لا توجد طلبات خدمة حالياً</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-8 text-[#123EAD]">طلبات الخدمة المستلمة</h2>
      <div className="space-y-4">
        {[...data.requests].reverse().map(req => (
          <div key={req.id} className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-colors ${req.status === 'new' ? 'border-[#123EAD]' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{req.name}</h3>
                <div className="text-sm text-gray-500 mt-1 flex gap-4">
                  <span>{req.phone}</span>
                  <span>{req.email}</span>
                  <span>{req.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {req.status === 'new' && (
                  <button onClick={() => markAsRead(req.id)} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 flex items-center gap-1">
                    <Check className="w-4 h-4" /> تحديد كمقروء
                  </button>
                )}
                <button onClick={() => deleteRequest(req.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="inline-block px-3 py-1 bg-yellow-50 text-yellow-800 text-xs font-bold rounded-lg mb-3">
              الخدمة: {req.service}
            </div>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
              {req.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// SETTINGS TAB
// -----------------------------------------------------
function SettingsTab({ data, save }: { data: AppData, save: (d: AppData) => void }) {
  const [info, setInfo] = useState(data.companyInfo);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save({ ...data, companyInfo: info });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-8 text-[#123EAD]">إعدادات الموقع</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
            <input type="text" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
            <input type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">العنوان</label>
            <input type="text" value={info.address} onChange={e => setInfo({...info, address: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">إنستغرام</label>
            <input type="text" value={info.instagram} onChange={e => setInfo({...info, instagram: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" dir="ltr" />
          </div>
        </div>
        <button type="submit" className="mt-8 px-8 py-4 bg-[#123EAD] text-white font-bold rounded-xl hover:bg-blue-800 transition flex items-center gap-2">
          <Save className="w-5 h-5" /> حفظ التغييرات
        </button>
        {saved && <span className="text-green-600 font-bold mr-4">تم الحفظ بنجاح!</span>}
      </form>
    </div>
  );
}

// -----------------------------------------------------
// PROJECTS TAB
// -----------------------------------------------------
function ProjectsTab({ data, save }: { data: AppData, save: (d: AppData) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  const handleEdit = (p: Project) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleNew = () => {
    setForm({ title: '', category: 'تسويق', image: '', result: '', description: '', city: '' });
    setEditingId('new');
  };

  const handleDelete = (id: string) => {
    if(window.confirm('حذف هذا العمل؟')) {
      save({ ...data, projects: data.projects.filter(p => p.id !== id) });
    }
  };

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingId === 'new') {
      const newProj = { ...form, id: Date.now().toString() } as Project;
      save({ ...data, projects: [...data.projects, newProj] });
    } else {
      save({ ...data, projects: data.projects.map(p => p.id === editingId ? form as Project : p) });
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">{editingId === 'new' ? 'إضافة عمل جديد' : 'تعديل العمل'}</h2>
          <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={saveForm} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <label className="block text-sm font-bold">عنوان العمل
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
            <label className="block text-sm font-bold">القسم (مثل: تسويق، برمجة)
              <input required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
          </div>
          <label className="block text-sm font-bold">رابط الصورة (URL)
            <input required value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" dir="ltr" />
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className="block text-sm font-bold">النتيجة (مثل: +340% مبيعات)
              <input required value={form.result} onChange={e => setForm({...form, result: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
            <label className="block text-sm font-bold">المدينة
              <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
          </div>
          <label className="block text-sm font-bold">الوصف
            <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl h-24" />
          </label>
          <button className="px-8 py-3 bg-[#123EAD] text-white font-bold rounded-xl">حفظ العمل</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#123EAD]">إدارة الأعمال والمشاريع</h2>
        <button onClick={handleNew} className="px-5 py-3 bg-[#fff200] text-[#123EAD] font-black rounded-xl flex items-center gap-2 hover:shadow-md transition">
          <Plus className="w-5 h-5" /> إضافة عمل جديد
        </button>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        {data.projects.map(p => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <img src={p.image} className="w-full h-40 object-cover" />
            <div className="p-5 flex-1">
              <span className="text-xs font-bold text-gray-400">{p.category}</span>
              <h3 className="font-bold text-lg leading-tight mt-1">{p.title}</h3>
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-2 bg-gray-50">
              <button onClick={() => handleEdit(p)} className="flex-1 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg hover:bg-gray-100">تعديل</button>
              <button onClick={() => handleDelete(p.id)} className="px-3 py-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// TESTIMONIALS TAB
// -----------------------------------------------------
function TestimonialsTab({ data, save }: { data: AppData, save: (d: AppData) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<AppData['testimonials'][0]>>({});

  const handleEdit = (t: AppData['testimonials'][0]) => {
    setForm(t);
    setEditingId(t.id);
  };

  const handleNew = () => {
    setForm({ name: '', role: '', quote: '', avatar: '' });
    setEditingId('new');
  };

  const handleDelete = (id: string) => {
    if(window.confirm('حذف هذا الرأي؟')) {
      save({ ...data, testimonials: data.testimonials.filter(t => t.id !== id) });
    }
  };

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingId === 'new') {
      const newTestimonial = { ...form, id: Date.now().toString() } as AppData['testimonials'][0];
      save({ ...data, testimonials: [...data.testimonials, newTestimonial] });
    } else {
      save({ ...data, testimonials: data.testimonials.map(t => t.id === editingId ? form as AppData['testimonials'][0] : t) });
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">{editingId === 'new' ? 'إضافة رأي جديد' : 'تعديل الرأي'}</h2>
          <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={saveForm} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <label className="block text-sm font-bold">اسم العميل
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
            <label className="block text-sm font-bold">المسمى الوظيفي / الشركة
              <input required value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
          </div>
          <label className="block text-sm font-bold">رابط الصورة (URL)
            <input required value={form.avatar} onChange={e => setForm({...form, avatar: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" dir="ltr" placeholder="https://..." />
          </label>
          <label className="block text-sm font-bold">نص الرأي
            <textarea required value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl h-24" />
          </label>
          <button className="px-8 py-3 bg-[#123EAD] text-white font-bold rounded-xl">حفظ الرأي</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#123EAD]">إدارة آراء العملاء</h2>
        <button onClick={handleNew} className="px-5 py-3 bg-[#fff200] text-[#123EAD] font-black rounded-xl flex items-center gap-2 hover:shadow-md transition">
          <Plus className="w-5 h-5" /> إضافة رأي جديد
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.testimonials.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <img src={t.avatar} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
            <div className="flex-1">
              <h3 className="font-black text-lg text-[#123EAD]">{t.name}</h3>
              <p className="text-xs text-gray-500 font-bold mb-2">{t.role}</p>
              <p className="text-sm text-gray-700 italic">"{t.quote}"</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(t)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(t.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// CONTENT TAB
// -----------------------------------------------------
function ContentTab({ data, save }: { data: AppData, save: (d: AppData) => void }) {
  const [form, setForm] = useState(data.content);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save({ ...data, content: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-8 text-[#123EAD]">تعديل نصوص الموقع</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-4xl space-y-10">
        
        {/* Hero Section */}
        <div>
          <h3 className="text-xl font-black mb-4 border-b pb-2">القسم الأول (الهيرو)</h3>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <label className="block text-sm font-bold text-gray-700">العنوان الرئيسي الأول (بالأبيض)
                <input type="text" value={form.heroTitle1} onChange={e => setForm({...form, heroTitle1: e.target.value})} className="mt-2 w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" />
              </label>
              <label className="block text-sm font-bold text-gray-700">العنوان الرئيسي الثاني (بالأصفر)
                <input type="text" value={form.heroTitle2} onChange={e => setForm({...form, heroTitle2: e.target.value})} className="mt-2 w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" />
              </label>
            </div>
            <label className="block text-sm font-bold text-gray-700">النص الوصفي تحت العنوان
              <textarea value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} className="mt-2 w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD] h-20" />
            </label>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-xl font-black mb-4 border-b pb-2">قسم من نحن</h3>
          <div className="space-y-5">
            <label className="block text-sm font-bold text-gray-700">العنوان الرئيسي للقسم
              <input type="text" value={form.aboutTitle} onChange={e => setForm({...form, aboutTitle: e.target.value})} className="mt-2 w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD]" />
            </label>
            <label className="block text-sm font-bold text-gray-700">الفقرة الأولى
              <textarea value={form.aboutText1} onChange={e => setForm({...form, aboutText1: e.target.value})} className="mt-2 w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD] h-24" />
            </label>
            <label className="block text-sm font-bold text-gray-700">الفقرة الثانية
              <textarea value={form.aboutText2} onChange={e => setForm({...form, aboutText2: e.target.value})} className="mt-2 w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#123EAD] h-24" />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="px-8 py-4 bg-[#123EAD] text-white font-bold rounded-xl hover:bg-blue-800 transition flex items-center gap-2">
            <Save className="w-5 h-5" /> حفظ التغييرات
          </button>
          {saved && <span className="text-green-600 font-bold">تم حفظ النصوص بنجاح!</span>}
        </div>
      </form>
    </div>
  );
}

// -----------------------------------------------------
// SERVICES TAB
// -----------------------------------------------------
function ServicesTab({ data, save }: { data: AppData, save: (d: AppData) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  const handleEdit = (s: Service) => {
    setForm(s);
    setEditingId(s.id);
  };

  const handleNew = () => {
    setForm({ title: '', short: '', description: '', features: [], iconName: 'TrendingUp' });
    setEditingId('new');
  };

  const handleDelete = (id: string) => {
    if(window.confirm('حذف هذه الخدمة؟')) {
      save({ ...data, services: data.services.filter(s => s.id !== id) });
    }
  };

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      ...form,
      features: typeof form.features === 'string' ? (form.features as string).split(',').map(f => f.trim()) : form.features
    } as Service;

    if(editingId === 'new') {
      save({ ...data, services: [...data.services, { ...serviceData, id: Date.now().toString() }] });
    } else {
      save({ ...data, services: data.services.map(s => s.id === editingId ? serviceData : s) });
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">{editingId === 'new' ? 'إضافة خدمة جديدة' : 'تعديل الخدمة'}</h2>
          <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={saveForm} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <label className="block text-sm font-bold">اسم الخدمة
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
            <label className="block text-sm font-bold">الاسم المختصر
              <input required value={form.short} onChange={e => setForm({...form, short: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </label>
          </div>
          <label className="block text-sm font-bold">الوصف التفصيلي
            <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl h-24" />
          </label>
          <label className="block text-sm font-bold text-gray-700">المميزات (افصل بينها بفاصلة ,)
            <input required value={Array.isArray(form.features) ? form.features.join(', ') : form.features} onChange={e => setForm({...form, features: e.target.value as any})} className="mt-2 w-full px-4 py-3 bg-gray-50 border rounded-xl" placeholder="مواقع, تطبيقات, أنظمة..." />
          </label>
          <button className="px-8 py-3 bg-[#123EAD] text-white font-bold rounded-xl">حفظ الخدمة</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#123EAD]">إدارة الخدمات</h2>
        <button onClick={handleNew} className="px-5 py-3 bg-[#fff200] text-[#123EAD] font-black rounded-xl flex items-center gap-2 hover:shadow-md transition">
          <Plus className="w-5 h-5" /> إضافة خدمة جديدة
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.services.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-black text-xl text-[#123EAD]">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{s.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(s)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
