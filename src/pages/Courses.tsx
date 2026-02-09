import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight, CheckCircle, Clock, Users, BarChart3, Code,
  Monitor, GraduationCap, PenTool, Globe, Smartphone,
  Database, FileSpreadsheet, Cpu, Layers, Server, Terminal
} from "lucide-react";
import { useCourseContext } from "../context/CourseContext";

const categories = ["All", "Computer Basics", "Accounting", "Programming", "Design", "Office", "Advanced"];

const iconMap = {
  Monitor, BarChart3, GraduationCap, Code, Terminal,
  PenTool, Globe, FileSpreadsheet, Smartphone, Database, Layers
};

export function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { courses } = useCourseContext();
  
  const filtered = activeCategory === "All" ? courses : courses.filter(c => c.category === activeCategory);

  return (
    <div>
      {/* Page Banner */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">Our Courses</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Courses</span>
          </div>
        </div>
      </section>

      {/* Courses Filter & Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Explore Courses
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              Choose Your <span className="text-primary">Career Path</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 mb-8">
              We offer a comprehensive range of computer courses designed to meet industry demands and help you succeed in your career.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, i) => (
              <div key={i} className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${course.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                      {(() => {
                        const IconComponent = iconMap[course.icon as keyof typeof iconMap] || Monitor;
                        return <IconComponent className="h-7 w-7" />;
                      })()}
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs text-white font-medium mb-1">
                        {course.category}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight">{course.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="mb-4 text-sm text-gray-500 leading-relaxed">{course.desc}</p>

                  {/* Info */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students}</span>
                    <span className="flex items-center gap-1"><BarChart3 className="h-3.5 w-3.5" />{course.level}</span>
                  </div>

                  {/* Topics */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Key Topics:</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {course.topics.map((topic, j) => (
                        <span key={j} className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark"
                  >
                    Enquire Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="bg-gray-light py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              What You <span className="text-primary">Get</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GraduationCap, title: "Certification", desc: "Industry-recognized certificates after course completion." },
              { icon: Cpu, title: "Hands-On Labs", desc: "Modern computer labs with latest hardware and software." },
              { icon: Server, title: "Real Projects", desc: "Work on real-world projects during your training." },
              { icon: Globe, title: "Job Support", desc: "Dedicated placement assistance for all students." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            Not Sure Which Course to Choose?
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-xl mx-auto">
            Contact us for free career counseling. Our experts will help you choose the right course based on your interests and career goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary-dark hover:shadow-xl"
          >
            Get Free Counseling <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
