export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export type NavigationItem = {
  label: string;
  href: string;
};

export type ServiceCard = {
  title: string;
  text: string;
  imageKey: string;
};

export type ProcessStep = {
  title: string;
  text: string;
};

export type Testimonial = {
  name: string;
  role: string;
  title: string;
  quote: string;
  imageKey: string;
  points: string[];
};

export type Category = {
  title: string;
  imageKey: string;
};

export type BlogPost = {
  tag: string;
  title: string;
  author: string;
  imageKey: string;
};

export type ImageMap = Record<string, string>;

export type CompanyData = {
  brand: string;
  legalName: string;
  tagline: string;
  topBar: {
    phone: string;
    email: string;
    address: string;
  };
  contact: {
    address: string;
    phone: string;
    website: string;
    facebook: string;
    email: string;
  };
  navigation: NavigationItem[];
  hero: {
    eyebrow: string;
    rotatingWords: string[];
    titlePrefix: string;
    titleSuffix: string;
    description: string;
    points: string[];
  };
  about: {
    title: string;
    paragraphs: string[];
    technology: string;
  };
  missionVision: {
    vision: string;
    mission: string;
  };
  stats: Array<{ value: string; label: string }>;
  features: Array<{ title: string; text: string }>;
  services: string[];
  serviceCards: ServiceCard[];
  finishingServices: string[];
  whyChooseUs: string[];
  clients: string[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  categories: Category[];
  blogs: BlogPost[];
  partners: string[];
};
