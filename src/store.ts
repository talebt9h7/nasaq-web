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

export const fetchAppData = async (): Promise<AppData> => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('app_data').select('data').eq('id', 1).single();
      if (data && data.data) {
        return { ...defaultData, ...data.data };
      }
    } catch (e) {
      console.error("Supabase fetch error:", e);
    }
  }
  
  // Fallback to local storage if Supabase is not configured or fails
  const local = localStorage.getItem('nasaq_data');
  if (local) {
    return { ...defaultData, ...JSON.parse(local) };
  }
  return defaultData;
};

export const saveAppData = async (newData: AppData): Promise<void> => {
  if (supabase) {
    try {
      await supabase.from('app_data').upsert({ id: 1, data: newData });
    } catch (e) {
      console.error("Supabase save error:", e);
    }
  }
  
  // Always save locally as backup/optimistic fallback
  localStorage.setItem('nasaq_data', JSON.stringify(newData));
};
