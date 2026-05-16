export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  iconName: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  result: string;
  description: string;
  city: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type CompanyInfo = {
  phone: string;
  email: string;
  address: string;
  instagram: string;
};

export type ServiceRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'read';
};

export type Analytics = {
  totalVisits: number;
  lastVisit: string;
};

export type SiteContent = {
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
};

export type AppData = {
  companyInfo: CompanyInfo;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  requests: ServiceRequest[];
  analytics: Analytics;
  content: SiteContent;
};

export const defaultData: AppData = {
  content: {
    heroTitle1: 'نسق كروب',
    heroTitle2: 'تسويق رقمي، حلول برمجية، وصناعة محتوى',
    heroSubtitle: 'هوية موحدة، استراتيجية واضحة، وتنفيذ رقمي يساعد شركتك على الظهور والنمو وتحويل المتابعين إلى عملاء.',
    aboutTitle: 'نرتب حضورك الرقمي بنفس قوة هويتك البصرية.',
    aboutText1: 'نسق كروب شركة عراقية مقرها كركوك، متخصصة في التسويق الرقمي، الحلول البرمجية وصناعة المحتوى. نعمل مع أصحاب المشاريع والشركات لبناء حضور واضح ومؤثر يرفع الثقة ويزيد الطلبات.',
    aboutText2: 'نبدأ من فهم الهدف، ثم نصمم استراتيجية عملية، وننفذها بتصميم وهوية ومحتوى وبرمجة قابلة للقياس.',
  },
  analytics: {
    totalVisits: 1240, // Mock initial data
    lastVisit: new Date().toISOString(),
  },
  companyInfo: {
    phone: '+964 770 123 4567',
    email: 'hello@nasaq.group',
    address: 'كركوك، العراق',
    instagram: '@nasaq.group',
  },
  services: [
    {
      id: '1',
      title: 'التسويق الرقمي',
      short: 'تسويق',
      description: 'حملات إعلانية ذكية على إنستغرام، فيسبوك، تيك توك وجوجل مع تحسين مستمر للوصول والمبيعات.',
      features: ['إعلانات مدفوعة', 'SEO', 'تحليل المنافسين', 'خطط نمو'],
      iconName: 'TrendingUp',
    },
    {
      id: '2',
      title: 'الحلول البرمجية',
      short: 'برمجة',
      description: 'نطوّر أنظمة متكاملة للشركات (B2B)، مواقع إلكترونية، تطبيقات موبايل، وأنظمة تخطيط الموارد (ERP) المخصصة.',
      features: ['مواقع', 'تطبيقات', 'متاجر', 'أنظمة إدارية'],
      iconName: 'Code2',
    },
    {
      id: '3',
      title: 'صناعة المحتوى',
      short: 'محتوى',
      description: 'تصوير، ريلز، فيديوهات، كتابة إعلانية وتصميم منشورات تعبر عن علامتك وتجذب جمهورك.',
      features: ['تصوير', 'ريلز', 'تصاميم', 'كتابة إبداعية'],
      iconName: 'Camera',
    },
    {
      id: '4',
      title: 'إدارة السوشيال ميديا',
      short: 'سوشيال',
      description: 'إدارة يومية للحسابات، جدولة المحتوى، الردود، وتحسين طريقة ظهور العلامة أمام الجمهور.',
      features: ['إدارة حسابات', 'جدولة', 'ردود', 'تقارير'],
      iconName: 'Globe',
    },
    {
      id: '5',
      title: 'الهوية البصرية',
      short: 'هوية',
      description: 'تصميم شعار، ألوان، خطوط، قوالب منشورات ومواد تسويقية تحافظ على شكل موحد لعلامتك.',
      features: ['شعار', 'دليل هوية', 'قوالب', 'مواد مطبوعة'],
      iconName: 'Palette',
    },
    {
      id: '6',
      title: 'تقارير وتحليل الأداء',
      short: 'تحليل',
      description: 'لوحات قياس وتقارير واضحة تساعدك على فهم النتائج واتخاذ قرارات تسويقية أدق.',
      features: ['Analytics', 'KPIs', 'توصيات', 'تحسين مستمر'],
      iconName: 'BarChart3',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'حملة نمو لمطعم محلي',
      category: 'تسويق',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&h=700&fit=crop',
      result: '+340% مبيعات',
      description: 'حملة محتوى وإعلانات على إنستغرام وتيك توك خلال موسم رمضان.',
      city: 'كركوك',
    },
    {
      id: '2',
      title: 'متجر إلكتروني للأثاث',
      category: 'برمجة',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=700&fit=crop',
      result: '+1200 طلب شهري',
      description: 'تجربة شراء كاملة مع لوحة تحكم، منتجات، طلبات، ودفع إلكتروني.',
      city: 'بغداد',
    },
    {
      id: '3',
      title: 'سلسلة فيديوهات تعليمية',
      category: 'محتوى',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&h=700&fit=crop',
      result: '+1.2M مشاهدة',
      description: 'إنتاج 30 حلقة قصيرة للنشر على يوتيوب وتيك توك وإنستغرام.',
      city: 'كركوك',
    },
    {
      id: '4',
      title: 'هوية بصرية لمصنع أغذية',
      category: 'هوية',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=700&fit=crop',
      result: 'إطلاق علامة متكاملة',
      description: 'شعار، ألوان، تغليف، ونظام بصري متكامل للمنتجات.',
      city: 'أربيل',
    },
  ],
  testimonials: [
    {
      id: '1',
      name: 'علي كريم',
      role: 'مالك مطعم في كركوك',
      quote: 'نسق كروب غيروا طريقة ظهورنا على السوشيال ميديا. المحتوى صار أقوى والحجوزات زادت بشكل واضح خلال أول شهرين.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&h=180&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'رنا عبدالله',
      role: 'مديرة تسويق',
      quote: 'اشتغلوا معنا على الموقع والحملات الإعلانية بخطة واضحة. أكثر شيء عجبني هو التقارير والمتابعة المستمرة للنتائج.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=180&h=180&fit=crop&crop=face',
    },
    {
      id: '3',
      name: 'محمد نوري',
      role: 'صاحب عيادة أسنان',
      quote: 'الفيديوهات والإعلانات كانت احترافية ومناسبة لجمهورنا. فريق سريع بالتواصل ويعرف ماذا يفعل من أول اجتماع.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&h=180&fit=crop&crop=face',
    },
  ],
  requests: [],
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * دالة للتحقق من سلامة الاتصال بـ Supabase
 */
export const checkSupabaseConnection = async (): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) return { success: false, error: "Supabase keys are missing in .env file" };
  try {
    const { error } = await supabase.from('site_settings').select('id').limit(1);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
};

export const fetchAppData = async (): Promise<AppData> => {
  if (supabase) {
    try {
      // جلب البيانات من جميع الجداول في وقت واحد باستخدام Promise.all
      const [
        { data: settings },
        { data: services },
        { data: projects },
        { data: testimonials },
        { data: requests }
      ] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('services').select('*').order('id'),
        supabase.from('projects').select('*').order('id'),
        supabase.from('testimonials').select('*').order('id'),
        supabase.from('requests').select('*').order('id')
      ]);

      return {
        companyInfo: (settings as any)?.company_info || defaultData.companyInfo,
        content: (settings as any)?.content || defaultData.content,
        analytics: (settings as any)?.analytics || defaultData.analytics,
        // إذا كانت الجداول فارغة، نستخدم البيانات الافتراضية بدلاً من مصفوفة فارغة
        services: (services && services.length > 0) ? (services as Service[]) : defaultData.services,
        projects: (projects && projects.length > 0) ? (projects as Project[]) : defaultData.projects,
        testimonials: (testimonials && testimonials.length > 0) ? (testimonials as Testimonial[]) : defaultData.testimonials,
        requests: (requests as ServiceRequest[]) || []
      };
    } catch (e) {
      console.error("Supabase fetch error:", e);
    }
  }
  
  // Fallback to default data if Supabase is not configured or fails
  return defaultData;
};

export const saveAppData = async (newData: AppData): Promise<void> => {
  if (supabase) {
    try {
      // حفظ البيانات في الجداول المخصصة
      // ملاحظة: الـ upsert هنا سيعمل على تحديث الصفوف بناءً على الـ id
      await Promise.all([
        supabase.from('site_settings').upsert({ 
          id: 1, 
          company_info: newData.companyInfo, 
          content: newData.content, 
          analytics: newData.analytics 
        }),
        supabase.from('services').upsert(newData.services),
        supabase.from('projects').upsert(newData.projects),
        supabase.from('testimonials').upsert(newData.testimonials),
        supabase.from('requests').upsert(newData.requests)
      ]);
    } catch (e) {
      console.error("Supabase save error:", e);
    }
  }
};

export const submitNewRequest = async (request: ServiceRequest): Promise<void> => {
  if (supabase) {
    try {
      const { error } = await supabase.from('requests').insert([request]);
      if (error) throw error;
    } catch (e) {
      console.error("Error submitting request:", e);
      throw e;
    }
  }
};
