import { createContext, useContext, useState, ReactNode } from 'react';

export type Course = {
  icon: string;
  title: string;
  category: string;
  duration: string;
  students: string;
  level: string;
  desc: string;
  topics: string[];
  color: string;
};

type CourseContextType = {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (index: number, course: Course) => void;
  deleteCourse: (index: number) => void;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

type CourseProviderProps = {
  children: ReactNode;
};

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      icon: "Monitor", title: "CCC (Course on Computer Concepts)", category: "Computer Basics",
      duration: "3 Months", students: "1500+", level: "Beginner",
      desc: "Learn fundamental computer concepts including operating systems, internet, email, and basic office applications. NIELIT certified course.",
      topics: ["Computer Fundamentals", "Operating System", "MS Office Basics", "Internet & Email", "Cyber Security Basics", "Digital Financial Tools"],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: "BarChart3", title: "Tally Prime with GST", category: "Accounting",
      duration: "4 Months", students: "2000+", level: "Beginner to Intermediate",
      desc: "Master Tally Prime for complete accounting, inventory management, GST filing, and financial reporting for businesses.",
      topics: ["Tally Prime Basics", "Accounting Vouchers", "Inventory Management", "GST Configuration & Filing", "TDS & TCS", "Payroll & MIS Reports"],
      color: "from-green-500 to-green-700"
    },
    {
      icon: "GraduationCap", title: "DCA (Diploma in Computer Application)", category: "Computer Basics",
      duration: "6 Months", students: "800+", level: "Beginner",
      desc: "Comprehensive diploma covering computer fundamentals, office automation, internet, programming basics, and practical applications.",
      topics: ["Computer Fundamentals", "MS Office (Word, Excel, PowerPoint)", "Internet & Web", "HTML Basics", "Tally Basics", "Programming Introduction"],
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: "GraduationCap", title: "PGDCA (Post Graduate Diploma)", category: "Advanced",
      duration: "12 Months", students: "500+", level: "Advanced",
      desc: "Advanced diploma covering programming, database management, web technologies, and project development for career growth.",
      topics: ["C / C++ Programming", "Java Programming", "DBMS & SQL", "Web Development", "Python Basics", "Project Work"],
      color: "from-indigo-500 to-indigo-700"
    },
    {
      icon: "Code", title: "Web Development", category: "Programming",
      duration: "6 Months", students: "600+", level: "Beginner to Advanced",
      desc: "Full-stack web development covering HTML, CSS, JavaScript, React, Node.js, and database integration for modern websites.",
      topics: ["HTML5 & CSS3", "JavaScript & jQuery", "React.js", "Node.js & Express", "MongoDB / MySQL", "Responsive Design & Projects"],
      color: "from-cyan-500 to-cyan-700"
    },
    {
      icon: "Terminal", title: "Python Programming", category: "Programming",
      duration: "4 Months", students: "400+", level: "Beginner to Intermediate",
      desc: "Learn Python programming from basics to advanced concepts including data structures, OOP, and practical applications.",
      topics: ["Python Basics & Syntax", "Data Types & Control Flow", "Functions & Modules", "OOP Concepts", "File Handling", "Libraries & Frameworks Intro"],
      color: "from-yellow-500 to-yellow-700"
    },
    {
      icon: "PenTool", title: "Graphic Design", category: "Design",
      duration: "4 Months", students: "700+", level: "Beginner to Intermediate",
      desc: "Master professional graphic design using Adobe Photoshop, Illustrator, CorelDRAW for print and digital media.",
      topics: ["Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Logo & Branding Design", "Social Media Graphics", "Print Design & Layout"],
      color: "from-pink-500 to-pink-700"
    },
    {
      icon: "Globe", title: "Digital Marketing", category: "Advanced",
      duration: "3 Months", students: "300+", level: "Beginner to Intermediate",
      desc: "Complete digital marketing course covering SEO, SEM, social media marketing, email marketing, and analytics.",
      topics: ["SEO (On-page & Off-page)", "Google Ads (SEM)", "Social Media Marketing", "Content Marketing", "Email Marketing", "Analytics & Reporting"],
      color: "from-teal-500 to-teal-700"
    },
    {
      icon: "FileSpreadsheet", title: "Advanced Excel & MIS", category: "Office",
      duration: "2 Months", students: "900+", level: "Intermediate",
      desc: "Advanced Excel skills including formulas, pivot tables, macros, VBA, dashboards, and MIS reporting for professionals.",
      topics: ["Advanced Formulas", "Pivot Tables & Charts", "Data Validation", "Macros & VBA", "Dashboard Creation", "MIS Reports"],
      color: "from-emerald-500 to-emerald-700"
    },
    {
      icon: "Smartphone", title: "MS Office Complete", category: "Office",
      duration: "3 Months", students: "1200+", level: "Beginner",
      desc: "Complete Microsoft Office suite training including Word, Excel, PowerPoint, Access, and Outlook for professional use.",
      topics: ["MS Word", "MS Excel", "MS PowerPoint", "MS Access", "MS Outlook", "Google Workspace"],
      color: "from-orange-500 to-orange-700"
    },
    {
      icon: "Database", title: "Data Entry & Typing", category: "Computer Basics",
      duration: "2 Months", students: "1000+", level: "Beginner",
      desc: "Professional data entry skills with English and Hindi typing, speed building, and accuracy improvement techniques.",
      topics: ["English Typing", "Hindi Typing (Kruti Dev)", "Speed Building", "Data Entry Practice", "Form Filling", "Accuracy Training"],
      color: "from-rose-500 to-rose-700"
    },
    {
      icon: "Layers", title: "AutoCAD", category: "Design",
      duration: "3 Months", students: "200+", level: "Beginner to Intermediate",
      desc: "Learn 2D and 3D drafting using AutoCAD for engineering, architecture, and design professionals.",
      topics: ["AutoCAD Interface", "2D Drawing Tools", "Dimensions & Annotations", "3D Modeling Basics", "Layouts & Plotting", "Project Work"],
      color: "from-amber-500 to-amber-700"
    },
  ]);

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const updateCourse = (index: number, course: Course) => {
    setCourses(prev => {
      const newCourses = [...prev];
      newCourses[index] = course;
      return newCourses;
    });
  };

  const deleteCourse = (index: number) => {
    setCourses(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};