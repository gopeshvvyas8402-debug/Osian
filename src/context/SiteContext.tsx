import { createContext, useContext, useState, ReactNode } from 'react';

export interface Stat {
  icon: string;
  label: string;
  value: number;
  suffix: string;
}

export interface Course {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  course: string;
  text: string;
  rating: number;
}

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  initial: string;
}

export interface Value {
  icon: string;
  title: string;
  desc: string;
}

export interface GalleryImage {
  id: number;
  category: string;
  title: string;
  desc: string;
  gradient: string;
  icon: string;
  imageUrl?: string; // New field for actual image URLs
}

export interface SiteContent {
  // Hero Section
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };

  // Stats Section
  stats: Stat[];

  // About Section
  about: {
    badge: string;
    title: string;
    description: string[];
    features: string[];
  };

  // Courses Section
  courses: Course[];

  // Features Section
  features: Feature[];

  // Testimonials Section
  testimonials: Testimonial[];

  // CTA Section
  cta: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };

  // About Page
  aboutPage: {
    mission: string;
    vision: string;
    description: string[];
    highlights: string[];
  };

  // Milestones
  milestones: Milestone[];

  // Team
  team: TeamMember[];

  // Values
  values: Value[];

  // Header & Contact Info
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    timings: string;
  };

  // Gallery
  gallery: GalleryImage[];

  // Header & Footer
  siteInfo: {
    logo: string;
    siteName: string;
    tagline: string;
    copyright: string;
  };

  // Social Media
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    badge: "#1 Computer Training Institute in Vadodara",
    title: "Build Your IT Career With Confidence",
    subtitle: "Learn industry-ready computer skills from expert trainers. Join Osian Enterprise for practical, job-oriented training in Tally, Web Development, DCA, PGDCA and more.",
    cta1: "Explore Courses",
    cta2: "Contact Us"
  },
  stats: [
    { icon: "Users", label: "Happy Students", value: 5000, suffix: "+" },
    { icon: "BookOpen", label: "Courses Available", value: 25, suffix: "+" },
    { icon: "Award", label: "Years Experience", value: 10, suffix: "+" },
    { icon: "Briefcase", label: "Placed Students", value: 3000, suffix: "+" }
  ],
  about: {
    badge: "About Us",
    title: "Welcome to Osian Enterprise",
    description: [
      "Osian Enterprise is a premier IT & Computer training institute dedicated to empowering students with cutting-edge technology skills. Established with a vision to bridge the gap between education and industry requirements, we provide comprehensive computer training programs.",
      "Our expert faculty, modern infrastructure, and practical-oriented approach make us the preferred choice for students seeking quality computer education in Vadodara."
    ],
    features: [
      "Industry-Oriented Curriculum",
      "Experienced & Certified Trainers",
      "100% Placement Assistance",
      "Flexible Batch Timings"
    ]
  },
  courses: [
    { icon: "BarChart3", title: "Tally Prime with GST", desc: "Master accounting with Tally Prime, GST filing, inventory management, and financial reporting.", color: "from-blue-500 to-blue-700" },
    { icon: "Code", title: "Web Development", desc: "Learn HTML, CSS, JavaScript, React, and modern web technologies to build responsive websites.", color: "from-green-500 to-green-700" },
    { icon: "Monitor", title: "Computer Basics (CCC)", desc: "Course on Computer Concepts covering fundamental computing skills and internet usage.", color: "from-purple-500 to-purple-700" },
    { icon: "GraduationCap", title: "DCA / PGDCA", desc: "Diploma and Post Graduate Diploma in Computer Application with comprehensive curriculum.", color: "from-orange-500 to-orange-700" },
    { icon: "PenTool", title: "Graphic Design", desc: "Master Photoshop, Illustrator, CorelDRAW and create stunning visual designs professionally.", color: "from-pink-500 to-pink-700" },
    { icon: "Globe", title: "Digital Marketing", desc: "SEO, Social Media Marketing, Google Ads, Email Marketing and complete digital strategy.", color: "from-cyan-500 to-cyan-700" }
  ],
  features: [
    { icon: "Target", title: "Practical Training", desc: "Hands-on projects and real-world exercises for practical experience." },
    { icon: "Shield", title: "Certified Courses", desc: "Industry-recognized certifications to boost your career prospects." },
    { icon: "Clock", title: "Flexible Timings", desc: "Morning, afternoon, and evening batches to suit your schedule." },
    { icon: "Zap", title: "Expert Faculty", desc: "Experienced trainers with industry knowledge and teaching excellence." },
    { icon: "Lightbulb", title: "Modern Labs", desc: "State-of-the-art computer labs with latest hardware and software." },
    { icon: "TrendingUp", title: "Placement Support", desc: "Dedicated placement cell to help you land your dream job." }
  ],
  testimonials: [
    { name: "Priya Patel", course: "Web Development", text: "The web development course at Osian Enterprise was amazing! I got placed immediately after completing the course. The practical training was excellent.", rating: 5 },
    { name: "Rahul Sharma", course: "Tally with GST", text: "Best Tally training in Rajkot! The faculty explained every concept clearly and the hands-on practice helped me a lot in my job.", rating: 5 },
    { name: "Anjali Mehta", course: "Graphic Design", text: "I learned Photoshop and CorelDRAW here and now I'm working as a freelance designer. Thank you Osian Enterprise!", rating: 5 },
    { name: "Vivek Joshi", course: "PGDCA", text: "The PGDCA course covered everything from basics to advanced topics. Great institute with supportive teachers.", rating: 4 }
  ],
  cta: {
    title: "Ready to Start Your IT Career?",
    subtitle: "Join Osian Enterprise today and take the first step towards a successful career in IT. Admissions are now open!",
    cta1: "Enroll Now",
    cta2: "Call Us Now"
  },
  aboutPage: {
    mission: "Empowering students with practical IT skills for successful careers.",
    vision: "To be the most trusted IT training institute in Gujarat.",
    description: [
      "Founded in 2024, Osian Enterprise has been a pioneer in providing quality computer education in Vadodara, Gujarat. We started with a simple goal — to make IT education accessible, practical, and job-oriented for students from all backgrounds.",
      "Over the past decade, we have trained more than 5000 students across 25+ courses, ranging from basic computer literacy to advanced programming and web development. Our alumni are now working in leading IT companies across India.",
      "What sets us apart is our commitment to practical training. We believe that theoretical knowledge alone is not enough — students need hands-on experience with real-world projects to truly excel in the IT industry."
    ],
    highlights: [
      "Practical Training",
      "Expert Faculty",
      "Modern Labs",
      "Placement Support",
      "Flexible Timing",
      "Affordable Fees"
    ]
  },
  milestones: [
    { year: "2014", title: "Founded", desc: "Osian Enterprise was established with a vision to provide quality computer education." },
    { year: "2016", title: "500+ Students", desc: "Crossed the milestone of 500 successfully trained students." },
    { year: "2018", title: "New Courses Added", desc: "Expanded curriculum with Web Development, Digital Marketing, and Graphic Design." },
    { year: "2020", title: "Online Classes", desc: "Launched online training programs during the pandemic to ensure uninterrupted learning." },
    { year: "2022", title: "3000+ Placed", desc: "Achieved the milestone of placing over 3000 students in top companies." },
    { year: "2024", title: "10 Years Strong", desc: "Celebrating a decade of excellence in IT education with 25+ courses." }
  ],
  team: [
    { name: "Mr. Rajesh Osian", role: "Founder & Director", specialization: "Business Management & IT Strategy", initial: "RO" },
    { name: "Mrs. Neha Sharma", role: "Academic Head", specialization: "Computer Science & Pedagogy", initial: "NS" },
    { name: "Mr. Amit Patel", role: "Senior Trainer", specialization: "Tally Prime & Accounting", initial: "AP" },
    { name: "Ms. Pooja Desai", role: "Web Development Trainer", specialization: "Full Stack Web Development", initial: "PD" },
    { name: "Mr. Karan Mehta", role: "Design Trainer", specialization: "Graphic Design & UI/UX", initial: "KM" },
    { name: "Mr. Suresh Joshi", role: "Placement Officer", specialization: "Career Counseling & Placement", initial: "SJ" }
  ],
  values: [
    { icon: "Target", title: "Excellence", desc: "We strive for excellence in every course we offer and every student we teach." },
    { icon: "Heart", title: "Student-First", desc: "Students are at the center of everything we do. Their success is our success." },
    { icon: "Shield", title: "Integrity", desc: "We maintain the highest standards of honesty and transparency in our practices." },
    { icon: "Zap", title: "Innovation", desc: "We continuously update our curriculum to match industry trends and technologies." },
    { icon: "ThumbsUp", title: "Quality", desc: "We deliver quality training through experienced faculty and modern infrastructure." },
    { icon: "TrendingUp", title: "Growth", desc: "We focus on holistic growth of students - technical skills, soft skills, and personality." }
  ],
  contactInfo: {
    phone: "+91 9409758100",
    email: "info@osian.tech",
    address: "Vadodara, Gujarat",
    timings: "Mon-Sat: 8:00 AM - 8:00 PM"
  },
  gallery: [
    { id: 1, category: "Classroom", title: "Modern Classroom", desc: "Our spacious and well-equipped classrooms for interactive learning.", gradient: "from-blue-400 to-blue-600", icon: "Monitor", imageUrl: "" },
    { id: 2, category: "Lab", title: "Computer Lab", desc: "State-of-the-art computer lab with latest hardware.", gradient: "from-green-400 to-green-600", icon: "Monitor", imageUrl: "" },
    { id: 3, category: "Events", title: "Annual Day Celebration", desc: "Students performing at our annual day function.", gradient: "from-purple-400 to-purple-600", icon: "PartyPopper", imageUrl: "" },
    { id: 4, category: "Achievements", title: "Award Ceremony", desc: "Students receiving certificates and awards.", gradient: "from-yellow-400 to-yellow-600", icon: "Award", imageUrl: "" },
    { id: 5, category: "Students", title: "Web Development Batch", desc: "Our web development batch of 2024.", gradient: "from-cyan-400 to-cyan-600", icon: "Users", imageUrl: "" },
    { id: 6, category: "Classroom", title: "Interactive Session", desc: "Faculty conducting an interactive training session.", gradient: "from-pink-400 to-pink-600", icon: "GraduationCap", imageUrl: "" },
    { id: 7, category: "Lab", title: "Design Lab", desc: "Graphic design lab with high-performance workstations.", gradient: "from-orange-400 to-orange-600", icon: "Monitor", imageUrl: "" },
    { id: 8, category: "Events", title: "Workshop on Python", desc: "Special workshop on Python programming.", gradient: "from-teal-400 to-teal-600", icon: "PartyPopper", imageUrl: "" },
    { id: 9, category: "Students", title: "Tally Batch 2024", desc: "Our Tally Prime with GST batch students.", gradient: "from-indigo-400 to-indigo-600", icon: "Users", imageUrl: "" },
    { id: 10, category: "Achievements", title: "Placement Drive", desc: "Students getting placed through our placement cell.", gradient: "from-rose-400 to-rose-600", icon: "Award", imageUrl: "" },
    { id: 11, category: "Events", title: "Guest Lecture", desc: "Industry expert delivering a guest lecture to students.", gradient: "from-emerald-400 to-emerald-600", icon: "PartyPopper", imageUrl: "" },
    { id: 12, category: "Classroom", title: "Seminar Hall", desc: "Our seminar hall for guest lectures and events.", gradient: "from-violet-400 to-violet-600", icon: "GraduationCap", imageUrl: "" },
    { id: 13, category: "Lab", title: "Networking Lab", desc: "Dedicated lab for networking and hardware training.", gradient: "from-sky-400 to-sky-600", icon: "Monitor", imageUrl: "" },
    { id: 14, category: "Students", title: "DCA Batch 2024", desc: "Our DCA batch completing their course successfully.", gradient: "from-amber-400 to-amber-600", icon: "Users", imageUrl: "" },
    { id: 15, category: "Achievements", title: "Best Institute Award", desc: "Recognized as the best computer training institute.", gradient: "from-lime-500 to-lime-700", icon: "Award", imageUrl: "" }
  ],
  siteInfo: {
    logo: "/logo.jpg",
    siteName: "Osian Enterprise",
    tagline: "IT & Computer Academy",
    copyright: "© 2024 Osian Enterprise. All Rights Reserved."
  },
  socialLinks: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
  }
};

interface SiteContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  resetContent: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => {
      const updated = { ...prev, ...newContent };
      localStorage.setItem('siteContent', JSON.stringify(updated));
      return updated;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.setItem('siteContent', JSON.stringify(defaultContent));
  };

  return (
    <SiteContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
}